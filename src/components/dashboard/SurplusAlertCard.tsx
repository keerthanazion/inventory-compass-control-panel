
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export function SurplusAlertCard() {
  return (
    <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          <CardTitle className="text-orange-800">Surplus Alert</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-2xl font-bold text-orange-900">
            3 items over threshold
          </div>
          <p className="text-orange-700 text-sm">
            Items require immediate redistribution to prevent waste
          </p>
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
            View Surplus Items
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
