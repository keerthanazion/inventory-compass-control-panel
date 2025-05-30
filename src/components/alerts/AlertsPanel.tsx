
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, AlertTriangle, Package, Trash2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Alert {
  id: string;
  type: 'surplus' | 'redistribution' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'surplus',
    title: 'Surplus Alert',
    message: 'You have 10kg surplus of tomatoes',
    timestamp: '2024-01-15 14:30:22',
    isRead: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'redistribution',
    title: 'Redistribution Confirmed',
    message: 'Redistribution request confirmed',
    timestamp: '2024-01-15 13:15:10',
    isRead: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'system',
    title: 'Storage Updated',
    message: 'Box storage updated successfully',
    timestamp: '2024-01-15 11:45:33',
    isRead: true,
    priority: 'low'
  },
  {
    id: '4',
    type: 'surplus',
    title: 'Surplus Alert',
    message: 'You have 5kg surplus of bananas',
    timestamp: '2024-01-15 10:20:45',
    isRead: false,
    priority: 'high'
  },
  {
    id: '5',
    type: 'redistribution',
    title: 'Redistribution In Progress',
    message: 'Transfer to Downtown Branch is in progress',
    timestamp: '2024-01-14 16:22:18',
    isRead: true,
    priority: 'medium'
  }
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'surplus': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
    case 'redistribution': return <Package className="w-5 h-5 text-blue-600" />;
    case 'system': return <CheckCircle className="w-5 h-5 text-green-600" />;
    default: return <Bell className="w-5 h-5 text-gray-600" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'destructive';
    case 'medium': return 'secondary';
    case 'low': return 'outline';
    default: return 'outline';
  }
};

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const { toast } = useToast();

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
    toast({
      title: "Alert marked as read",
      description: "The notification has been marked as read",
    });
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
    toast({
      title: "All alerts marked as read",
      description: "All notifications have been marked as read",
    });
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast({
      title: "Alert deleted",
      description: "The notification has been removed",
    });
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" size="sm">
            <Check className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`transition-all hover:shadow-md ${!alert.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : 'bg-white'}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${!alert.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {alert.title}
                      </h3>
                      <Badge variant={getPriorityColor(alert.priority)} className="text-xs">
                        {alert.priority}
                      </Badge>
                      {!alert.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className={`text-sm ${!alert.isRead ? 'text-gray-700' : 'text-gray-600'}`}>
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {!alert.isRead && (
                    <Button
                      onClick={() => markAsRead(alert.id)}
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Mark as read
                    </Button>
                  )}
                  <Button
                    onClick={() => deleteAlert(alert.id)}
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {alerts.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up! No new alerts at this time.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
