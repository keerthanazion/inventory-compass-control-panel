
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus, RefreshCw, Info } from 'lucide-react';

interface InventorySummaryCardProps {
  item: {
    id: number;
    name: string;
    quantity: number;
    acquiredPrice: number;
    mrp: number;
    unit: string;
    depletionRate: 'High' | 'Medium' | 'Low';
    forecastedDailyRequirement: number;
    overSupplyLimit: number;
    underSupplyLimit: number;
    redistributionStatus: 'eligible' | 'in-redistribution' | 'none';
    estimatedMarketDemand: number;
    nearbyRadius: number;
  };
}

export function InventorySummaryCard({ item }: InventorySummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate supply status
  const getSupplyStatus = () => {
    if (item.quantity > item.overSupplyLimit) {
      return { status: 'over-supplied', label: 'Over-supplied', color: 'destructive' as const, bgColor: 'bg-red-50 border-red-200' };
    }
    if (item.quantity < item.underSupplyLimit) {
      return { status: 'under-supplied', label: 'Under-supplied', color: 'secondary' as const, bgColor: 'bg-yellow-50 border-yellow-200' };
    }
    return { status: 'apt-supply', label: 'Apt supply', color: 'outline' as const, bgColor: 'bg-green-50 border-green-200' };
  };

  const supplyStatus = getSupplyStatus();

  // Calculate redistribution eligibility
  const getRedistributionStatus = () => {
    if (item.redistributionStatus === 'in-redistribution') {
      return { label: 'In Redistribution', color: 'secondary' as const };
    }
    if (supplyStatus.status !== 'apt-supply') {
      return { label: 'Eligible for Redistribution', color: 'outline' as const };
    }
    return null;
  };

  const redistributionStatus = getRedistributionStatus();

  // Calculate financial impact
  const calculateFinancialImpact = () => {
    const redistributableQty = supplyStatus.status === 'over-supplied' 
      ? item.quantity - item.overSupplyLimit 
      : supplyStatus.status === 'under-supplied' 
      ? item.estimatedMarketDemand 
      : 0;

    const expectedRevenue = redistributableQty * item.mrp;
    const originalCost = redistributableQty * item.acquiredPrice;
    const netProfit = expectedRevenue - originalCost;

    return {
      redistributableQty,
      expectedRevenue,
      originalCost,
      netProfit,
      isProfit: netProfit > 0,
      isBreakeven: netProfit === 0
    };
  };

  const financialImpact = calculateFinancialImpact();

  // Get depletion rate icon and color
  const getDepletionIndicator = () => {
    switch (item.depletionRate) {
      case 'High':
        return { icon: TrendingUp, color: 'text-red-500', bgColor: 'bg-red-100' };
      case 'Medium':
        return { icon: Minus, color: 'text-yellow-500', bgColor: 'bg-yellow-100' };
      case 'Low':
        return { icon: TrendingDown, color: 'text-green-500', bgColor: 'bg-green-100' };
    }
  };

  const depletionIndicator = getDepletionIndicator();

  // Calculate supply level percentage for progress bar
  const supplyLevelPercentage = Math.min((item.quantity / item.overSupplyLimit) * 100, 100);

  // Smart prompts
  const getSmartPrompt = () => {
    if (supplyStatus.status === 'over-supplied') {
      const excess = item.quantity - item.overSupplyLimit;
      if (financialImpact.isProfit) {
        return `You're ${excess}${item.unit} over your set threshold. Redistributing now yields an estimated ₹${financialImpact.netProfit.toFixed(0)} profit.`;
      } else {
        return `You're ${excess}${item.unit} over your set threshold. You can prevent spoilage but may incur a ₹${Math.abs(financialImpact.netProfit).toFixed(0)} loss. Proceed?`;
      }
    }
    if (supplyStatus.status === 'under-supplied') {
      const shortage = item.underSupplyLimit - item.quantity;
      return `You're ${shortage}${item.unit} below your minimum threshold. Consider requesting supply or redistributing from nearby branches.`;
    }
    return null;
  };

  const smartPrompt = getSmartPrompt();

  return (
    <TooltipProvider>
      <Card className={`transition-all duration-200 hover:shadow-md ${supplyStatus.bgColor}`}>
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      {item.quantity} <span className="text-sm font-normal text-gray-500">{item.unit}</span>
                    </span>
                    <Badge variant={supplyStatus.color}>{supplyStatus.label}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {redistributionStatus && (
                        <Badge variant={redistributionStatus.color} className="text-xs">
                          {redistributionStatus.label}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded-full ${depletionIndicator.bgColor}`}>
                        <depletionIndicator.icon className={`w-3 h-3 ${depletionIndicator.color}`} />
                      </div>
                      <span className="text-xs text-gray-600">{item.depletionRate} depletion</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Supply Level</span>
                      <span>{supplyLevelPercentage.toFixed(0)}%</span>
                    </div>
                    <Progress value={supplyLevelPercentage} className="h-2" />
                  </div>
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Financial Details */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-xs font-medium text-gray-500">Acquired Price</label>
                    <p className="text-sm font-semibold">₹{item.acquiredPrice}/{item.unit}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">MRP</label>
                    <p className="text-sm font-semibold">₹{item.mrp}/{item.unit}</p>
                  </div>
                </div>

                {/* Supply Analytics */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">Forecasted Daily Requirement</label>
                    <p className="text-sm font-semibold">{item.forecastedDailyRequirement} {item.unit}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Depletion Rate</label>
                    <div className="flex items-center gap-2">
                      <depletionIndicator.icon className={`w-4 h-4 ${depletionIndicator.color}`} />
                      <span className="text-sm font-semibold">{item.depletionRate}</span>
                    </div>
                  </div>
                </div>

                {/* Supply Limits */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">Over Supply Limit</label>
                    <p className="text-sm font-semibold">{item.overSupplyLimit} {item.unit}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Under Supply Limit</label>
                    <p className="text-sm font-semibold">{item.underSupplyLimit} {item.unit}</p>
                  </div>
                </div>

                {/* Market Demand */}
                <div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-gray-500">Estimated Market Demand Nearby</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-3 h-3 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Based on nearby requests in last 24 hrs</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-sm font-semibold">{item.estimatedMarketDemand}{item.unit} needed within {item.nearbyRadius}km</p>
                </div>

                {/* Financial Impact */}
                {financialImpact.redistributableQty > 0 && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Net Financial Status (Post-Redistribution)</h4>
                    <div className="space-y-1 text-xs">
                      <p>Redistributable Quantity: {financialImpact.redistributableQty} {item.unit}</p>
                      <p>Expected Revenue: ₹{financialImpact.expectedRevenue.toFixed(2)}</p>
                      <p>Original Cost: ₹{financialImpact.originalCost.toFixed(2)}</p>
                    </div>
                    <div className="mt-2">
                      <Badge variant={financialImpact.isProfit ? "default" : financialImpact.isBreakeven ? "secondary" : "destructive"}>
                        {financialImpact.isBreakeven ? "Break-even" : financialImpact.isProfit ? `Profit ₹${financialImpact.netProfit.toFixed(0)}` : `Loss ₹${Math.abs(financialImpact.netProfit).toFixed(0)}`}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Smart Prompt */}
                {smartPrompt && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800">{smartPrompt}</p>
                  </div>
                )}

                {/* Action Button */}
                {redistributionStatus && redistributionStatus.label === 'Eligible for Redistribution' && (
                  <Button className="w-full" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Redistribute Now
                  </Button>
                )}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </TooltipProvider>
  );
}
