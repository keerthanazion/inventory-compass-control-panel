
import React from 'react';
import { SurplusAlertCard } from './dashboard/SurplusAlertCard';
import { InventorySummary } from './dashboard/InventorySummary';
import { NearbyKiosks } from './dashboard/NearbyKiosks';
import { RecentTransactions } from './dashboard/RecentTransactions';
import { ImpactGraph } from './dashboard/ImpactGraph';
import { ActiveAlerts } from './dashboard/ActiveAlerts';

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor and manage your inventory redistribution</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Priority Alert - Full Width on mobile, spans 2 columns on large */}
        <div className="lg:col-span-2">
          <SurplusAlertCard />
        </div>
        
        {/* Impact Graph */}
        <div className="lg:col-span-1">
          <ImpactGraph />
        </div>
        
        {/* Inventory Summary */}
        <div className="lg:col-span-1">
          <InventorySummary />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Nearby Kiosks */}
        <div>
          <NearbyKiosks />
        </div>
        
        {/* Recent Transactions */}
        <div>
          <RecentTransactions />
        </div>
        
        {/* Active Alerts */}
        <div>
          <ActiveAlerts />
        </div>
      </div>
    </div>
  );
}
