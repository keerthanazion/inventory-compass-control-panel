
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export function TopBar() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBellClick = () => {
    navigate('/alerts');
    toast({
      title: "Notifications",
      description: "Viewing your latest alerts and notifications",
    });
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search inventory, SKUs, locations..." 
            className="pl-10 w-96 bg-gray-50 border-gray-200"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative" onClick={handleBellClick}>
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
