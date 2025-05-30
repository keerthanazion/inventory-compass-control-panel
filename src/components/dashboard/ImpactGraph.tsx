
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Leaf } from 'lucide-react';

export function ImpactGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Redistribution Impact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 flex items-center justify-center gap-2">
              <Leaf className="w-8 h-8" />
              120kg
            </div>
            <p className="text-gray-600 mt-1">Saved from waste this month</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">$3,240</div>
              <p className="text-sm text-gray-600">Value recovered</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">89%</div>
              <p className="text-sm text-gray-600">Success rate</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-gray-500 text-center">75% of monthly waste reduction goal</p>
        </div>
      </CardContent>
    </Card>
  );
}
