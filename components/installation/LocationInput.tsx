"use client";

import { useEffect, useRef, useState } from "react";

export default function LocationInput() {
  const [url, setUrl] = useState("");
  const [locating, setLocating] = useState(false);
  const [message, setMessage] = useState("");
  const [captured, setCaptured] = useState(false);
  const requestId = useRef(0);
  useEffect(() => () => { requestId.current++; }, []);

  function locate() {
    if (locating) return;
    if (!window.isSecureContext || !navigator.geolocation) {
      setMessage("Este navegador no permite obtener la ubicación. Podés pegar el enlace de Google Maps manualmente.");
      return;
    }
    const id = ++requestId.current;
    setLocating(true);
    setMessage("Esperando tu permiso para obtener la ubicación…");
    navigator.geolocation.getCurrentPosition(position => {
      if (id !== requestId.current) return;
      const { latitude, longitude, accuracy } = position.coords;
      setUrl(`https://www.google.com/maps/search/?api=1&query=${latitude.toFixed(6)},${longitude.toFixed(6)}`);
      setCaptured(true);
      setLocating(false);
      setMessage(`Ubicación cargada. Precisión aproximada: ${Math.round(accuracy)} metros. Revisá el punto en el mapa antes de enviar.`);
    }, error => {
      if (id !== requestId.current) return;
      setLocating(false);
      setMessage(error.code === 1
        ? "No se autorizó el acceso. Podés habilitar la ubicación en tu navegador o pegar un enlace de Google Maps."
        : error.code === 3
          ? "La ubicación tardó demasiado. Volvé a intentarlo o pegá el enlace de Google Maps."
          : "No pudimos obtener la ubicación. Revisá que la ubicación del dispositivo esté activada o pegá el enlace de Google Maps.");
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
  }

  return <div className="installation-location wide">
    <label className="installation-field"><span>Ubicación de Google Maps (opcional)</span>
      <input name="mapsUrl" type="url" maxLength={250} value={url} placeholder="https://maps.app.goo.gl/…" aria-describedby="location-help location-status" onChange={event => {
        requestId.current++; setLocating(false); setCaptured(false); setMessage(""); setUrl(event.target.value);
      }} />
      <small id="location-help">Pegá el enlace o usá el botón si estás en el lugar donde instalaremos el equipo. La dirección exacta debe completarse por separado.</small>
    </label>
    <button type="button" className="installation-button installation-secondary installation-location-button" disabled={locating} onClick={locate}>
      {locating ? "Obteniendo ubicación…" : "Estoy en el lugar de instalación: usar mi ubicación"}
    </button>
    <p id="location-status" role="status" className="installation-location-status">{message}</p>
    {captured && <a href={url} target="_blank" rel="noopener noreferrer" className="installation-location-map">Revisar ubicación en Google Maps ↗</a>}
  </div>;
}
