
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AccessSecurity() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    walletConnected: true
  });

  const users = [
    { name: 'John Doe', email: 'john@akta.com', role: 'Manager' },
    { name: 'Jane Smith', email: 'jane@akta.com', role: 'Editor' },
    { name: 'Mike Johnson', email: 'mike@akta.com', role: 'Viewer' },
  ];

  const handleSave = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your access and security settings have been updated successfully.",
    });
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Role Management */}
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            🔒 Role Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={user.role === 'Manager' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 2FA and Web3Auth */}
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            🛡️ Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Two-Factor Authentication (2FA)</Label>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Web3Auth Status</Label>
              <p className="text-sm text-gray-500">Blockchain wallet authentication</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-green-600">Connected Wallet</span>
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
