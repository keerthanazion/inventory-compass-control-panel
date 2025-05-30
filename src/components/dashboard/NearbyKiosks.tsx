
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NearbyKiosks() {
  const kiosks = [
    { name: 'Downtown Plaza', distance: '0.8 km', demand: 'High', items: 12 },
    { name: 'Mall Central', distance: '1.2 km', demand: 'Medium', items: 8 },
    { name: 'Station Hub', distance: '2.1 km', demand: 'High', items: 15 },
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Nearby Kiosks with Demand
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {kiosks.map((kiosk, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{kiosk.name}</div>
                <div className="text-sm text-gray-500">{kiosk.distance} • {kiosk.items} matching items</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(kiosk.demand)}`}>
                  {kiosk.demand}
                </span>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
