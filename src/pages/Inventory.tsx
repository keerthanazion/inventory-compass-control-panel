
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navigation } from '@/components/Navigation';
import { TopBar } from '@/components/TopBar';
import { InventoryTable } from '@/components/inventory/InventoryTable';

const Inventory = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Navigation />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-gray-600 mt-2">Monitor stock levels and identify surplus items for redistribution</p>
              </div>
              <InventoryTable />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Inventory;
