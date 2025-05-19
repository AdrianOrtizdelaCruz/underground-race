'use client';

import { useState, useEffect } from 'react';
import AddressSearch from './AddressSearch';
import MapComponent from './map-component';
import type { Place } from '@/services/geo';

export interface LocationExtended extends Place {
  time: string;
  description: string;
  link: string;
}

interface MapWithSearchProps {
  initialLocations: LocationExtended[];
  onAddLocation: (newLoc: LocationExtended) => void;
  onRemoveLocation: (index: number) => void;
}

export default function MapWithSearch({
  initialLocations,
  onAddLocation,
  onRemoveLocation,
}: MapWithSearchProps) {
  // Solo guardamos aquí las ubicaciones que añada el usuario
  const [customLocations, setCustomLocations] = useState<LocationExtended[]>([]);

  const [pending, setPending] = useState<Place | null>(null);
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  // Cuando AddressSearch devuelve lat/lng y name
  const handleLocationSelected = (lat: number, lng: number, name: string) => {
    setPending({ name, location: { lat, lng } });
    setTime('');
    setDescription('');
    setLink('');
  };

  // Añadir una nueva ubicación
  const handleAdd = () => {
    if (!pending || !link.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const newLoc: LocationExtended = {
      name: pending.name,
      location: { ...pending.location },
      time: time || 'Hora no definida',
      description: description || 'Sin descripción',
      link: link.trim(),
    };
    setCustomLocations((prev) => [...prev, newLoc]);
    onAddLocation(newLoc);
    setPending(null);
  };

  // Eliminar únicamente de customLocations
  const handleMarkerClick = (combinedIndex: number) => {
    const initialCount = initialLocations.length;
    // Si clicas en una inicial, no hacemos nada
    if (combinedIndex < initialCount) return;
    // Si clicas en una custom, la borramos
    const customIndex = combinedIndex - initialCount;
    setCustomLocations((prev) => {
      const updated = prev.filter((_, i) => i !== customIndex);
      onRemoveLocation(customIndex);
      return updated;
    });
  };

  // Combina para pasar al mapa
  const allLocations: LocationExtended[] = [
    ...initialLocations,
    ...customLocations,
  ];

  return (
    <div className="space-y-4 h-full">
      <AddressSearch onLocationSelected={handleLocationSelected} />

      {pending && (
        <div className="flex flex-col gap-2 border rounded p-4 bg-gray-50">
          <p className="font-semibold">Información para: {pending.name}</p>

          <label className="text-sm font-medium">Hora</label>
          <input
            type="text"
            className="rounded border px-3 py-1"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Ej: Sáb 10:00 PM"
          />

          <label className="text-sm font-medium">Descripción</label>
          <input
            type="text"
            className="rounded border px-3 py-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: Encuentro en parking"
          />

          <label className="text-sm font-medium">Link</label>
          <input
            type="url"
            className="rounded border px-3 py-1"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://maps.app.goo.gl/..."
          />

          <button
            onClick={handleAdd}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Añadir ubicación
          </button>
        </div>
      )}

      <div className="h-[100%]">
        <MapComponent
          locations={allLocations}
          onMarkerClick={handleMarkerClick}
        />
      </div>
    </div>
  );
}






