
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navigation } from '@/components/Navigation';
import { TopBar } from '@/components/TopBar';
import { CreateRedistributionForm } from '@/components/redistribution/CreateRedistributionForm';

const CreateRedistribution = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Navigation />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 overflow-auto p-6">
            <CreateRedistributionForm />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CreateRedistribution;
