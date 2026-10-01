-- Ejecutar DESPUÉS de 01-preparar-supabase-instalaciones.sql en Vawau Instalaciones.
-- Reejecutable. No elimina solicitudes ni reinicia consecutivos.
begin;
create table if not exists public.installation_upload_limits (
  key_hash text primary key,
  window_start timestamptz not null,
  attempts integer not null
);
alter table public.installation_upload_limits enable row level security;
revoke all on public.installation_upload_limits from public, anon, authenticated;

create or replace function public.installation_upload_quota(p_key text)
returns boolean language plpgsql security definer set search_path = '' as $$
declare v_count integer;
begin
  if p_key !~ '^[a-f0-9]{64}$' then raise exception 'invalid_limit_key'; end if;
  insert into public.installation_upload_limits as limits (key_hash, window_start, attempts)
  values (p_key, now(), 1)
  on conflict (key_hash) do update set
    attempts = case when limits.window_start < now() - interval '1 hour' then 1 else limits.attempts + 1 end,
    window_start = case when limits.window_start < now() - interval '1 hour' then now() else limits.window_start end
  returning attempts into v_count;
  delete from public.installation_upload_limits where window_start < now() - interval '2 days';
  return v_count <= 10;
end;
$$;

create or replace function public.receive_installation(p_token uuid, p_hash text, p_fields jsonb, p_terms text, p_files jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_request public.installation_requests; v_file jsonb;
begin
  -- Serializa reintentos concurrentes del mismo envío, incluso antes de insertar.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_token::text, 0));
  select * into v_request from public.installation_requests where request_token = p_token;
  if found then
    if v_request.payload_hash <> p_hash then raise exception 'installation_payload_conflict'; end if;
    if v_request.submission_state <> 'received' then raise exception 'installation_not_received'; end if;
    return jsonb_build_object('reference', v_request.reference, 'createdAt', v_request.received_at);
  end if;
  if jsonb_typeof(p_files) <> 'array' or jsonb_array_length(p_files) not between 2 and 6
    or not exists (select 1 from jsonb_array_elements(p_files) f where f->>'field' = 'labelPhoto')
    or not exists (select 1 from jsonb_array_elements(p_files) f where f->>'field' = 'invoice')
    or (select sum((f->>'size')::integer) from jsonb_array_elements(p_files) f) > 20971520 then
    raise exception 'invalid_attachment_manifest';
  end if;
  insert into public.installation_requests (
    id, request_token, payload_hash, source, full_name, identification, phone, alternate_phone, other_phone,
    email, province, canton, district, address, address_reference, maps_url, brand, equipment_type, other_equipment,
    model, serial, store, purchase_date, invoice_number, onsite, prepared, observations,
    terms_accepted, data_accepted, terms_version, submission_state, received_at
  ) values (
    p_token, p_token, p_hash, p_fields->>'source', p_fields->>'fullName', p_fields->>'identification',
    p_fields->>'phone', p_fields->>'alternatePhone', p_fields->>'otherPhone', p_fields->>'email',
    p_fields->>'province', p_fields->>'canton', p_fields->>'district', p_fields->>'address',
    p_fields->>'addressReference', p_fields->>'mapsUrl', p_fields->>'brand', p_fields->>'equipmentType',
    p_fields->>'otherEquipment', p_fields->>'model', p_fields->>'serial', p_fields->>'store',
    (p_fields->>'purchaseDate')::date, p_fields->>'invoiceNumber', (p_fields->>'onsite' = 'Sí'),
    p_fields->>'prepared', p_fields->>'observations', true, true, p_terms, 'received', now()
  ) returning * into v_request;
  for v_file in select value from jsonb_array_elements(p_files) loop
    if not exists (select 1 from storage.objects where bucket_id = 'installation-documents' and name = v_file->>'path') then
      raise exception 'installation_missing_object';
    end if;
    insert into public.installation_attachments (request_id, field, slot, object_path, original_name, mime_type, size_bytes, sha256)
    values (p_token, v_file->>'field', (v_file->>'slot')::smallint, v_file->>'path', v_file->>'name', v_file->>'type', (v_file->>'size')::integer, v_file->>'sha256');
  end loop;
  return jsonb_build_object('reference', v_request.reference, 'createdAt', v_request.received_at);
end;
$$;
revoke all on function public.installation_upload_quota(text) from public, anon, authenticated;
revoke all on function public.receive_installation(uuid, text, jsonb, text, jsonb) from public, anon, authenticated;
grant execute on function public.installation_upload_quota(text) to service_role;
grant execute on function public.receive_installation(uuid, text, jsonb, text, jsonb) to service_role;
commit;
select routine_name from information_schema.routines
where routine_schema = 'public' and routine_name in ('installation_upload_quota', 'receive_installation');
