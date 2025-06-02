
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Warehouse, 
  DollarSign, 
  AlertTriangle, 
  MapPin, 
  ArrowRight,
  CheckCircle,
  Clock,
  Plus,
  TrendingUp,
  TrendingDown,
  Leaf
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-full">
      {/* Row 1: Real-Time Key Indicators */}
      <div className="flex items-center justify-between gap-8 py-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          <span className="text-gray-600 font-medium">Inventory:</span>
          <span className="text-2xl font-semibold text-gray-900">1,247 SKUs</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-500 font-semibold">12</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Warehouse className="w-5 h-5 text-orange-600" />
          <span className="text-gray-600 font-medium">Storage Used:</span>
          <span className="text-2xl font-semibold text-gray-900">78%</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-orange-500 font-semibold">5%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span className="text-gray-600 font-medium">Recovered:</span>
          <span className="text-2xl font-semibold text-gray-900">₹2.8L</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-500 font-semibold">₹8.2K</span>
          </div>
        </div>
      </div>

      {/* Row 2: Split View - Surplus Alert & Impact Summary */}
      <div className="grid grid-cols-5 gap-6">
        {/* LEFT: Surplus Alert Card (40% width = 2 columns) */}
        <div className="col-span-2">
          <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-orange-900">Surplus Alert</h3>
                    <div className="text-3xl font-bold text-orange-800 mt-1">3 Items Over Threshold</div>
                    <p className="text-orange-700 mt-2">Redistribute now to avoid waste</p>
                  </div>
                  <Button 
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={() => navigate('/redistribution-management')}
                  >
                    View & Redistribute
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Impact Summary (60% width = 3 columns) */}
        <div className="col-span-3">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">This Month's Redistribution</h3>
                
                <div className="flex items-center gap-3">
                  <Leaf className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-3xl font-bold text-green-600">120kg Saved from Waste</div>
                    <div className="text-gray-600 mt-1">₹3,240 Value Recovered • 89% Success Rate</div>
                  </div>
                </div>
                
                {/* Progress bar for monthly goal */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Goal Progress</span>
                    <span className="font-semibold text-gray-900">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Row 3: Two-Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* LEFT: Nearby Kiosks with Demand */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Nearby Kiosks with Demand
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Downtown Plaza</div>
                    <div className="text-sm text-gray-500">0.8km • 12 Items Matched</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <Button variant="ghost" size="sm">
                    Match Now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Mall Central</div>
                    <div className="text-sm text-gray-500">1.2km • 8 Items Matched</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <Button variant="ghost" size="sm">
                    Match Now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT: Recent Redistributions */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Redistributions
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 py-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Organic Apples</div>
                  <div className="text-sm text-gray-600">Store A → Kiosk 12 • 2h ago</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Onions</div>
                  <div className="text-sm text-gray-600">Store A → Kiosk 9 • 4h ago</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Dairy Products</div>
                  <div className="text-sm text-gray-600">Store C → Kiosk 15 • 6h ago</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Packaged Meals</div>
                  <div className="text-sm text-gray-600">Store D → Kiosk 7 • 1 day ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => navigate('/redistribution-management')}
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-xl hover:shadow-2xl z-50 bg-orange-600 hover:bg-orange-700 transition-all duration-200"
            size="icon"
          >
            <Plus className="h-8 w-8 text-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>New Redistribution</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
