
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Warehouse, TrendingUp } from 'lucide-react';

export function InventorySummary() {
  const stats = [
    { label: 'Total SKUs', value: '1,247', icon: Package, change: '+12' },
    { label: 'Storage Used', value: '78%', icon: Warehouse, change: '+5%' },
    { label: 'Value', value: '$142K', icon: TrendingUp, change: '+8.2K' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Current Inventory Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <stat.icon className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">{stat.label}</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-green-600">{stat.change}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
