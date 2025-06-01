
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navigation } from '@/components/Navigation';
import { TopBar } from '@/components/TopBar';
import { RedistributionTable } from '@/components/redistribution/RedistributionTable';

const RedistributionManagement = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Navigation />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Redistribution Management</h1>
                <p className="text-gray-600 mt-2">View, manage, and edit scheduled redistributions of inventory</p>
              </div>
              
              <RedistributionTable />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RedistributionManagement;
