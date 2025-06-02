
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function ReportsExports() {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date()
  });
  const [exportOptions, setExportOptions] = useState({
    inventoryLog: false,
    redistributionHistory: false,
    financialReport: false
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = async () => {
    const selectedOptions = Object.entries(exportOptions).filter(([_, selected]) => selected);
    
    if (selectedOptions.length === 0) {
      toast({
        title: "No Options Selected",
        description: "Please select at least one export option.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast({
            title: "Report Ready to Download",
            description: "Your report has been generated successfully.",
          });
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  return (
    <div className="max-w-2xl">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Reports & Data Export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date Range Selection */}
          <div className="space-y-4">
            <Label>Select Time Range</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white",
                        !dateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => date && setDateRange({ ...dateRange, from: date })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white",
                        !dateRange.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => date && setDateRange({ ...dateRange, to: date })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <Label>📤 Export Options</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inventoryLog"
                  checked={exportOptions.inventoryLog}
                  onCheckedChange={(checked) => 
                    setExportOptions({ ...exportOptions, inventoryLog: !!checked })
                  }
                />
                <Label htmlFor="inventoryLog">Inventory Log (CSV)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="redistributionHistory"
                  checked={exportOptions.redistributionHistory}
                  onCheckedChange={(checked) => 
                    setExportOptions({ ...exportOptions, redistributionHistory: !!checked })
                  }
                />
                <Label htmlFor="redistributionHistory">Redistribution History (PDF)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="financialReport"
                  checked={exportOptions.financialReport}
                  onCheckedChange={(checked) => 
                    setExportOptions({ ...exportOptions, financialReport: !!checked })
                  }
                />
                <Label htmlFor="financialReport">Financial Report (XLS)</Label>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {isGenerating && (
            <div className="space-y-2">
              <Label>Generating Report...</Label>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* Generate Button */}
          <div className="pt-4">
            <Button 
              onClick={handleExport} 
              disabled={isGenerating}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Download className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate Export'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
