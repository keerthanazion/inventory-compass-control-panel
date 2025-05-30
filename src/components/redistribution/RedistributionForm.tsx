
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, DollarSign, Fuel, Package } from 'lucide-react';

// Mock data for demonstration
const suggestedDestinations = [
  {
    id: 1,
    name: "Downtown Branch",
    distance: "2.3 km",
    demand: "High",
    eta: "45 min",
    savings: "$120"
  },
  {
    id: 2,
    name: "West Side Location",
    distance: "5.7 km", 
    demand: "Medium",
    eta: "1h 15min",
    savings: "$85"
  },
  {
    id: 3,
    name: "Community Kitchen",
    distance: "3.1 km",
    demand: "High",
    eta: "55 min",
    savings: "$95"
  }
];

const availableItems = [
  { id: 1, name: "Organic Apples", available: 150, unit: "kg" },
  { id: 2, name: "Whole Wheat Bread", available: 85, unit: "loaves" },
  { id: 3, name: "Free-Range Eggs", available: 200, unit: "dozen" },
  { id: 4, name: "Pasta Sauce", available: 120, unit: "jars" }
];

export function RedistributionForm() {
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [quantity, setQuantity] = useState([50]);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedItemData = availableItems.find(item => item.id.toString() === selectedItem);
  const selectedDestData = suggestedDestinations.find(dest => dest.id.toString() === selectedDestination);
  
  const maxQuantity = selectedItemData?.available || 100;
  const currentQuantity = quantity[0];
  const estimatedCost = selectedDestData ? parseFloat(selectedDestData.savings.replace('$', '')) * (currentQuantity / 100) : 0;
  const gasFee = 0.02; // Mock blockchain gas fee

  const handleSubmit = async () => {
    if (!selectedItem || !selectedDestination || currentQuantity === 0) return;
    
    setIsProcessing(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    
    // Reset form
    setSelectedItem('');
    setSelectedDestination('');
    setQuantity([50]);
    
    // Show success message (you could add a toast here)
    console.log('Redistribution submitted successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Create Redistribution Order
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Item Selection */}
        <div className="space-y-2">
          <Label>Select Item to Redistribute</Label>
          <Select value={selectedItem} onValueChange={setSelectedItem}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an item..." />
            </SelectTrigger>
            <SelectContent>
              {availableItems.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name} ({item.available} {item.unit} available)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Destination Selection */}
        <div className="space-y-2">
          <Label>Suggested Destinations</Label>
          <Select value={selectedDestination} onValueChange={setSelectedDestination}>
            <SelectTrigger>
              <SelectValue placeholder="Choose destination..." />
            </SelectTrigger>
            <SelectContent>
              {suggestedDestinations.map((dest) => (
                <SelectItem key={dest.id} value={dest.id.toString()}>
                  <div className="flex items-center justify-between w-full">
                    <span>{dest.name}</span>
                    <Badge variant={dest.demand === 'High' ? 'destructive' : 'secondary'}>
                      {dest.demand} Demand
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quantity Selector */}
        {selectedItemData && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Quantity to Redistribute</Label>
              <span className="text-sm text-gray-500">
                {currentQuantity} / {maxQuantity} {selectedItemData.unit}
              </span>
            </div>
            <Slider
              value={quantity}
              onValueChange={setQuantity}
              max={maxQuantity}
              min={1}
              step={1}
              className="w-full"
            />
            <Input
              type="number"
              value={currentQuantity}
              onChange={(e) => setQuantity([parseInt(e.target.value) || 0])}
              max={maxQuantity}
              min={1}
              className="w-20"
            />
          </div>
        )}

        {/* Live Feedback */}
        {selectedDestData && selectedItemData && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900">Order Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>ETA: {selectedDestData.eta}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-500" />
                <span>{selectedDestData.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>Savings: ${estimatedCost.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-orange-500" />
                <span>Gas Fee: ${gasFee.toFixed(3)} ETH</span>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Blockchain Notice & Confirm */}
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Blockchain Notice:</strong> This redistribution will be recorded on the blockchain for transparency and traceability. Gas fees apply.
            </p>
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={!selectedItem || !selectedDestination || currentQuantity === 0 || isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? 'Processing on Blockchain...' : 'Confirm Redistribution'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
