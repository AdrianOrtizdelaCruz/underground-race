'use client';

import { useState, useEffect } from 'react';
import MapWithSearch, { LocationExtended } from '@/components/features/MapWithSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, MapPin } from 'lucide-react';
import AuthGate from '@/components/auth/AuthGate';
import type { Place } from '@/services/geo';

const mockKdds = [
  {
    name: "Hostal La Biela 43",
    location: { lat: 43.4665, lng: -3.6561 },
    time: "Vie 9:00 PM",
    description: "Reunión informal entre participantes.",
    link: "https://maps.app.goo.gl/g5wXmTwvuSpTSiWk7"
  },
  {
    name: 'The Bridge Tavern "La Finca"',
    location: { lat: 43.3476, lng: -4.0916 },
    time: "Sáb 3:00 PM",
    description: "Punto de encuentro para briefing general.",
    link: "https://maps.app.goo.gl/fYTK59wjm8AfPWbW8"
  },
  {
    name: "El Mirador de Reocín",
    location: { lat: 43.3630, lng: -4.1130 },
    time: "Sáb 10:00 PM",
    description: "Encuentro informal en zona industrial.",
    link: "https://maps.app.goo.gl/hipWevSKR5AYN6rU9"
  },
];

export default function MapPage() {
  const [kdds, setKdds] = useState<LocationExtended[]>(mockKdds);

  // Añadir nueva ubicación
  const handleAddLocation = (newLoc: LocationExtended) => {
    setKdds(prev => [...prev, newLoc]);
  };

  // Eliminar ubicación clicada
  const handleRemoveLocation = (index: number) => {
    setKdds(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AuthGate>
      <div className="container mx-auto flex flex-col gap-8 px-4 py-8 md:px-6 lg:flex-row lg:px-8">
        <div className="flex-grow lg:w-2/3">
          <Card className="h-[70vh] shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Ubicaciones KDD (Santander)
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)] p-0">
              <MapWithSearch
                initialLocations={kdds}
                onAddLocation={handleAddLocation}
                onRemoveLocation={handleRemoveLocation}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3">
          <Card className="h-full shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5 text-primary" />
                Próximos Encuentros
              </CardTitle>
            </CardHeader>
            <CardContent>
              {kdds.length > 0 ? (
                <ul className="space-y-4">
                  {kdds.map((kdd, idx) => (
                    <li key={idx} className="border-b pb-3 last:border-b-0">
                      <h3 className="font-semibold text-foreground">{kdd.name}</h3>
                      <p className="text-sm text-muted-foreground">{kdd.description}</p>
                      <a
                        href={kdd.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-xs"
                      >
                        Ver en Google Maps
                      </a>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="text-accent">{kdd.time}</span>
                        <span className="text-muted-foreground">
                          ({kdd.location.lat.toFixed(4)}, {kdd.location.lng.toFixed(4)})
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No se encontraron próximos KDDs.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGate>
  );
}





