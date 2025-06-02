
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navigation } from '@/components/Navigation';
import { TopBar } from '@/components/TopBar';
import { SettingsContent } from '@/components/settings/SettingsContent';

export default function Settings() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Navigation />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1">
            <SettingsContent />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
