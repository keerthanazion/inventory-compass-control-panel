
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function InventoryPreferences() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    minSupplyLimit: 30,
    maxSupplyLimit: 80,
    autoRedistribution: true,
    forecastMode: 'auto'
  });

  const handleSave = () => {
    toast({
      title: "Preferences Saved",
      description: "Your inventory preferences have been updated successfully.",
    });
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Default Item Thresholds */}
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            ⚙️ Default Item Thresholds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="minLimit">Min Supply Limit (kg)</Label>
              <Input
                id="minLimit"
                type="number"
                value={settings.minSupplyLimit}
                onChange={(e) => setSettings({ ...settings, minSupplyLimit: Number(e.target.value) })}
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxLimit">Max Supply Limit (kg)</Label>
              <Input
                id="maxLimit"
                type="number"
                value={settings.maxSupplyLimit}
                onChange={(e) => setSettings({ ...settings, maxSupplyLimit: Number(e.target.value) })}
                className="bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable auto-redistribution above limit</Label>
              <p className="text-sm text-gray-500">Automatically suggest redistributions when limits are exceeded</p>
            </div>
            <Switch
              checked={settings.autoRedistribution}
              onCheckedChange={(checked) => setSettings({ ...settings, autoRedistribution: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Demand Forecast Mode */}
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            📈 Demand Forecast Mode
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Choose how daily required stock is estimated</p>
              </TooltipContent>
            </Tooltip>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={settings.forecastMode}
            onValueChange={(value) => setSettings({ ...settings, forecastMode: value })}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="auto" id="auto" />
              <Label htmlFor="auto" className="flex-1">
                <div>
                  <p className="font-medium">Auto (ML)</p>
                  <p className="text-sm text-gray-500">Machine learning based predictions</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id="manual" />
              <Label htmlFor="manual" className="flex-1">
                <div>
                  <p className="font-medium">Manual Entry</p>
                  <p className="text-sm text-gray-500">Manually set stock requirements</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
        Save Changes
      </Button>
    </div>
  );
}
