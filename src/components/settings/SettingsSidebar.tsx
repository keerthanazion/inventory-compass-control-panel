
import React from 'react';
import { User, Package, Bell, Shield, FileText } from 'lucide-react';

const settingsNavigation = [
  { id: 'general', title: 'General', icon: User },
  { id: 'inventory', title: 'Inventory Preferences', icon: Package },
  { id: 'notifications', title: 'Notifications & Alerts', icon: Bell },
  { id: 'access', title: 'Access & Security', icon: Shield },
  { id: 'reports', title: 'Reports & Data Exports', icon: FileText },
];

type SettingsTab = 'general' | 'inventory' | 'notifications' | 'access' | 'reports';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6">
      <nav className="space-y-2">
        {settingsNavigation.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as SettingsTab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-orange-50 text-orange-600 border border-orange-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
              <span className="font-medium">{item.title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
