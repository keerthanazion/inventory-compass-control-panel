
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function NotificationSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    expiryAlerts: true,
    redistributeWindow: '12'
  });

  const handleSave = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  return (
    <div className="max-w-2xl">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Notifications & Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Toggle Settings */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  🔔 Email Alerts for Surplus
                </Label>
                <p className="text-sm text-gray-500">Receive email notifications when items exceed thresholds</p>
              </div>
              <Switch
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, emailAlerts: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  🔔 App Push Notifications for Redistribute
                </Label>
                <p className="text-sm text-gray-500">Get push notifications for redistribution opportunities</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  🔔 Alert if Item Expiry &lt; 24h
                </Label>
                <p className="text-sm text-gray-500">Warning notifications for items expiring soon</p>
              </div>
              <Switch
                checked={settings.expiryAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, expiryAlerts: checked })}
              />
            </div>
          </div>

          {/* Dropdown Settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Redistribute Notification Window</Label>
              <Select value={settings.redistributeWindow} onValueChange={(value) => setSettings({ ...settings, redistributeWindow: value })}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 hours</SelectItem>
                  <SelectItem value="12">12 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
