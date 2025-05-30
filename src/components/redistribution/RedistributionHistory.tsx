
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, ExternalLink } from 'lucide-react';

// Mock data for recent redistributions
const recentRedistributions = [
  {
    id: 1,
    item: "Organic Apples",
    quantity: "75 kg",
    destination: "Downtown Branch",
    status: "Completed",
    timestamp: "2024-01-15 14:30",
    txHash: "0x1234...5678",
    savings: "$89"
  },
  {
    id: 2,
    item: "Whole Wheat Bread",
    quantity: "45 loaves",
    destination: "Community Kitchen", 
    status: "In Transit",
    timestamp: "2024-01-15 13:15",
    txHash: "0x5678...9012",
    savings: "$67"
  },
  {
    id: 3,
    item: "Free-Range Eggs",
    quantity: "120 dozen",
    destination: "West Side Location",
    status: "Delivered",
    timestamp: "2024-01-15 11:45",
    txHash: "0x9012...3456",
    savings: "$156"
  },
  {
    id: 4,
    item: "Greek Yogurt",
    quantity: "30 containers",
    destination: "Downtown Branch",
    status: "Pending",
    timestamp: "2024-01-15 10:20",
    txHash: "0x3456...7890",
    savings: "$43"
  }
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Completed':
    case 'Delivered':
      return 'default';
    case 'In Transit':
      return 'secondary';
    case 'Pending':
      return 'outline';
    default:
      return 'outline';
  }
};

export function RedistributionHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Recent Redistributions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {recentRedistributions.map((redistribution) => (
              <div
                key={redistribution.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {redistribution.item}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {redistribution.quantity} → {redistribution.destination}
                    </p>
                  </div>
                  <Badge variant={getStatusVariant(redistribution.status)}>
                    {redistribution.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>{redistribution.timestamp}</span>
                  <span className="text-green-600 font-medium">
                    {redistribution.savings} saved
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400">TX:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                    {redistribution.txHash}
                  </code>
                  <ExternalLink className="w-3 h-3 text-gray-400 hover:text-blue-500 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
