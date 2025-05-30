
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Clock, Truck } from 'lucide-react';

export function ActiveAlerts() {
  const alerts = [
    {
      type: 'expiry',
      icon: Clock,
      title: 'Items Close to Expiry',
      message: '15 items expire within 24 hours',
      priority: 'high',
    },
    {
      type: 'logistics',
      icon: Truck,
      title: 'Logistics Delay',
      message: 'Delivery to Kiosk 8 delayed by 2 hours',
      priority: 'medium',
    },
    {
      type: 'surplus',
      icon: AlertTriangle,
      title: 'Surplus Alert',
      message: 'Dairy section 85% over capacity',
      priority: 'high',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Active Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className={`p-3 border-l-4 rounded-r-lg ${getPriorityColor(alert.priority)}`}>
              <div className="flex items-start gap-3">
                <alert.icon className="w-5 h-5 mt-0.5 text-gray-600" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{alert.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{alert.message}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
