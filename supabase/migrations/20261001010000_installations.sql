-- VAWAU Instalaciones: ejecutar en el proyecto NUEVO de Supabase.
-- Proyecto esperado: reyppdellnhuwpkxaabu
-- No conecta todavía el formulario ni modifica VAWAU CORE.
-- Reejecutable sin borrar datos ni reiniciar consecutivos.
begin;

create table if not exists public.installation_requests (
  id uuid primary key default gen_random_uuid(),
  sequence_number bigint generated always as identity unique,
  reference text generated always as (
    'EI-' || lpad(sequence_number::text, greatest(6, length(sequence_number::text)), '0')
  ) stored unique,
  request_token uuid not null unique,
  payload_hash text not null check (payload_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  received_at timestamptz,
  submission_state text not null default 'uploading'
    check (submission_state in ('uploading', 'received', 'failed')),
  status text not null default 'Nueva' check (status in (
    'Nueva', 'Pendiente validación', 'Validada', 'Pendiente coordinación',
    'Programada', 'En proceso', 'Instalada', 'No instalada', 'Reprogramación', 'Cerrada'
  )),
  source text not null default 'web' check (source in ('web', 'qr')),
  full_name text not null check (length(trim(full_name)) between 1 and 250),
  identification text not null check (length(trim(identification)) between 1 and 250),
  phone text not null check (length(phone) between 8 and 25),
  alternate_phone text,
  other_phone text,
  email text not null check (length(email) between 3 and 250),
  province text not null check (province in ('San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón')),
  canton text not null check (length(trim(canton)) between 1 and 250),
  district text not null check (length(trim(district)) between 1 and 250),
  address text not null check (length(trim(address)) between 1 and 2000),
  address_reference text,
  maps_url text,
  brand text not null check (brand in ('Electrolux', 'Frigidaire')),
  equipment_type text not null check (equipment_type in ('Refrigerador', 'Cocina', 'Horno', 'Plantilla', 'Lavavajillas', 'Lavadora', 'Secadora', 'Otro')),
  other_equipment text,
  model text not null check (length(trim(model)) between 1 and 250),
  serial text not null check (length(trim(serial)) between 1 and 250),
  store text not null check (length(trim(store)) between 1 and 250),
  purchase_date date not null,
  invoice_number text,
  onsite boolean not null,
  prepared text not null check (prepared in ('Sí', 'No', 'No estoy seguro')),
  observations text check (length(observations) <= 2000),
  terms_accepted boolean not null check (terms_accepted),
  data_accepted boolean not null check (data_accepted),
  terms_version text not null check (length(trim(terms_version)) > 0),
  consented_at timestamptz not null default now(),
  assigned_technician text,
  assigned_csa text,
  scheduled_at timestamptz,
  installed_at timestamptz,
  internal_observations text,
  core_reference text,
  constraint installation_other_equipment_required check (
    equipment_type <> 'Otro' or coalesce(length(trim(other_equipment)), 0) > 0
  ),
  constraint installation_received_timestamp check (
    (submission_state = 'received') = (received_at is not null)
  )
);

create table if not exists public.installation_attachments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.installation_requests(id) on delete restrict,
  field text not null check (field in ('labelPhoto', 'invoice', 'equipmentPhoto', 'sitePhotos')),
  slot smallint not null default 1 check (slot between 1 and 3),
  bucket_id text not null default 'installation-documents' check (bucket_id = 'installation-documents'),
  object_path text not null unique,
  original_name text not null check (length(original_name) between 1 and 250),
  mime_type text not null check (mime_type in ('image/jpeg', 'image/png', 'image/webp', 'application/pdf')),
  size_bytes integer not null check (size_bytes between 1 and 5242880),
  sha256 text not null check (sha256 ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),
  unique (request_id, field, slot),
  check (field = 'sitePhotos' or slot = 1),
  check (mime_type <> 'application/pdf' or field = 'invoice'),
  check (object_path like request_id::text || '/%')
);

create index if not exists installation_requests_status_created_idx
  on public.installation_requests(status, created_at desc);
create index if not exists installation_requests_submission_idx
  on public.installation_requests(submission_state, created_at);

-- Sin permisos de lectura/escritura para visitantes o usuarios autenticados.
-- El backend autorizado en Vercel tendrá acceso mediante su clave secreta.
alter table public.installation_requests enable row level security;
alter table public.installation_attachments enable row level security;
revoke all on public.installation_requests, public.installation_attachments from public, anon, authenticated;
revoke all on sequence public.installation_requests_sequence_number_seq from public, anon, authenticated;
grant select, insert, update on public.installation_requests, public.installation_attachments to service_role;
grant usage, select on sequence public.installation_requests_sequence_number_seq to service_role;

-- Facturas y fotografías privadas. No se crean políticas públicas de Storage.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('installation-documents', 'installation-documents', false, 5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

comment on table public.installation_requests is
  'VAWAU: solicitudes privadas. Confirmar recepción solo después de validar y guardar los adjuntos obligatorios. Los consecutivos pueden tener saltos por envíos incompletos; nunca reiniciarlos.';
comment on table public.installation_attachments is
  'VAWAU: metadatos de adjuntos privados. Comprobar existencia y contenido en Storage antes de marcar la solicitud recibida.';

commit;

-- Verificación: debe devolver dos tablas con RLS activo y un bucket privado.
select tablename, rowsecurity as rls_activo
from pg_tables
where schemaname = 'public'
  and tablename in ('installation_requests', 'installation_attachments');

select id, public as acceso_publico, file_size_limit
from storage.buckets where id = 'installation-documents';
