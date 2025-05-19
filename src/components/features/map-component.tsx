'use client';

import { useState, useEffect } from 'react';
import type { Place } from '@/services/geo';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export interface LocationWithMeta extends Place {
  time?: string;
  description?: string;
}

interface MapComponentProps {
  locations: LocationWithMeta[];
  onMarkerClick?: (index: number) => void;
}

const SANTANDER_CENTER = { lat: 43.4623, lng: -3.8099 };
const DEFAULT_ZOOM = 12;

export default function MapComponent({
  locations,
  onMarkerClick,
}: MapComponentProps) {
  const [isClient, setIsClient] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-md border bg-muted">
        <p className="text-muted-foreground">Cargando Mapa...</p>
      </div>
    );
  }

  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error de Configuración</AlertTitle>
          <AlertDescription>
            Falta la clave API de Google Maps. Por favor, configúrala en las
            variables de entorno (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY).
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden rounded-md border">
      <APIProvider apiKey={apiKey}>
        <Map
          mapId="underground-rides-map"
          style={{ width: '100%', height: '100%' }}
          defaultCenter={locations[0]?.location || SANTANDER_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          gestureHandling="greedy"
          disableDefaultUI
        >
          {locations.map((loc, i) => (
            <AdvancedMarker
              key={`${loc.name}-${i}`}
              position={loc.location}
              title={loc.name}
              onClick={() => onMarkerClick?.(i)}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}


