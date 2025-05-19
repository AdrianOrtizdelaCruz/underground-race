'use client';

import { useState } from 'react';

interface AddressSearchProps {
  onLocationSelected: (lat: number, lng: number, name: string) => void;
}

export default function AddressSearch({ onLocationSelected }: AddressSearchProps) {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    if (!address.trim()) {
      setError('Por favor, ingresa una dirección');
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setError('Falta la clave de API de Google Maps');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
      );

      const data = await res.json();

      if (data.status !== 'OK' || data.results.length === 0) {
        setError('No se encontró ninguna ubicación');
      } else {
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;
        const formattedName = result.formatted_address;
        onLocationSelected(lat, lng, formattedName);
        setAddress('');
      }
    } catch (err) {
      setError('Error al buscar la ubicación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Escribe una dirección"
        className="border px-3 py-2 rounded w-full text-black"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}





