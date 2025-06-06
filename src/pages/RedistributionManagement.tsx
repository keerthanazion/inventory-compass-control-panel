
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navigation } from '@/components/Navigation';
import { TopBar } from '@/components/TopBar';
import { RedistributionTable } from '@/components/redistribution/RedistributionTable';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const RedistributionManagement = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Navigation />
        <div className="flex-1 flex flex-col relative">
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
          
          {/* Floating Action Button - moved inside the flex-1 container */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => navigate('/create-redistribution')}
                className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-xl hover:shadow-2xl z-50 bg-primary hover:bg-primary/90 transition-all duration-200"
                size="icon"
              >
                <Plus className="h-8 w-8" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create New Redistribution</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RedistributionManagement;
