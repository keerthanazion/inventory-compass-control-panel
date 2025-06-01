
import React from 'react';
import { InventorySummaryCard } from './InventorySummaryCard';

// Mock data for demonstration
const mockInventoryData = [
  {
    id: 1,
    name: "Organic Tomatoes",
    quantity: 95,
    acquiredPrice: 22,
    mrp: 40,
    unit: "kg",
    depletionRate: "High" as const,
    forecastedDailyRequirement: 50,
    overSupplyLimit: 70,
    underSupplyLimit: 30,
    redistributionStatus: "eligible" as const,
    estimatedMarketDemand: 28,
    nearbyRadius: 3
  },
  {
    id: 2,
    name: "Free-Range Eggs",
    quantity: 45,
    acquiredPrice: 8,
    mrp: 12,
    unit: "dozen",
    depletionRate: "Medium" as const,
    forecastedDailyRequirement: 60,
    overSupplyLimit: 80,
    underSupplyLimit: 40,
    redistributionStatus: "none" as const,
    estimatedMarketDemand: 35,
    nearbyRadius: 2
  },
  {
    id: 3,
    name: "Whole Wheat Bread",
    quantity: 25,
    acquiredPrice: 15,
    mrp: 25,
    unit: "loaves",
    depletionRate: "Low" as const,
    forecastedDailyRequirement: 40,
    overSupplyLimit: 60,
    underSupplyLimit: 30,
    redistributionStatus: "eligible" as const,
    estimatedMarketDemand: 15,
    nearbyRadius: 5
  },
  {
    id: 4,
    name: "Greek Yogurt",
    quantity: 120,
    acquiredPrice: 45,
    mrp: 65,
    unit: "containers",
    depletionRate: "High" as const,
    forecastedDailyRequirement: 80,
    overSupplyLimit: 100,
    underSupplyLimit: 50,
    redistributionStatus: "in-redistribution" as const,
    estimatedMarketDemand: 25,
    nearbyRadius: 4
  }
];

export function InventorySummaryGrid() {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Summary</h2>
        <p className="text-gray-600 mt-1">Click on any item to view detailed analytics and redistribution options</p>
      </div>
      
      <div className="grid gap-4">
        {mockInventoryData.map((item) => (
          <InventorySummaryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
