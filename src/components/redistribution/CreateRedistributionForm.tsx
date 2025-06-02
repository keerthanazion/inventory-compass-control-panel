
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { CalendarIcon, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockItems = [
  "Organic Tomatoes",
  "Greek Yogurt", 
  "Whole Wheat Bread",
  "Free-Range Eggs",
  "Fresh Spinach",
  "Almond Milk"
];

const mockBranches = [
  "Main Branch",
  "Downtown Branch", 
  "West Side Location",
  "Community Kitchen",
  "North Branch",
  "South Plaza"
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

export function CreateRedistributionForm() {
  const [selectedItem, setSelectedItem] = useState('');
  const [fromBranch, setFromBranch] = useState('Main Branch');
  const [toBranch, setToBranch] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [quantity, setQuantity] = useState('');
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const isFormValid = selectedItem && fromBranch && toBranch && selectedDate && selectedTime && quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast({
        title: "Please complete all fields before submitting ❗",
        variant: "destructive"
      });
      return;
    }

    const formattedDate = format(selectedDate!, 'PPP');
    
    toast({
      title: "New redistribution scheduled 🚚",
      description: `Redistribution scheduled successfully for ${selectedItem} from ${fromBranch} to ${toBranch} on ${formattedDate}, ${selectedTime}.`
    });

    // Redirect back to redistribution management
    navigate('/redistribution-management');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/redistribution-management')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Redistribution Management
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Redistribution</h1>
        <p className="text-gray-600 mt-2">Schedule a new redistribution of inventory between branches</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Redistribution Details</CardTitle>
          <CardDescription>Fill in all required fields to schedule your redistribution</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="item">Item *</Label>
              <Select value={selectedItem} onValueChange={setSelectedItem}>
                <SelectTrigger>
                  <SelectValue placeholder="Select item to redistribute" />
                </SelectTrigger>
                <SelectContent>
                  {mockItems.map(item => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from">From Branch *</Label>
                <Select value={fromBranch} onValueChange={setFromBranch}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBranches.map(branch => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to">To Branch (Destination) *</Label>
                <Select value={toBranch} onValueChange={setToBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBranches.filter(branch => branch !== fromBranch).map(branch => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                placeholder="e.g., 25 kg, 30 containers"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/redistribution-management')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!isFormValid}
                className="flex-1"
              >
                Schedule Redistribution
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/redistribution-management')}
        >
          View Redistribution History
        </Button>
      </div>
    </div>
  );
}
