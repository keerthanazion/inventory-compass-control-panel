
import React, { useState } from 'react';
import { Settings, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SettingsSidebar } from './SettingsSidebar';
import { GeneralSettings } from './GeneralSettings';
import { InventoryPreferences } from './InventoryPreferences';
import { NotificationSettings } from './NotificationSettings';
import { AccessSecurity } from './AccessSecurity';
import { ReportsExports } from './ReportsExports';

type SettingsTab = 'general' | 'inventory' | 'notifications' | 'access' | 'reports';

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'inventory':
        return <InventoryPreferences />;
      case 'notifications':
        return <NotificationSettings />;
      case 'access':
        return <AccessSecurity />;
      case 'reports':
        return <ReportsExports />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-gray-600" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your kiosk preferences, alerts, thresholds, and notifications.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>Logged in as: <span className="font-medium">Branch Manager</span></span>
            </div>
          </div>
        </div>
        <Separator />
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar */}
        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Right Panel */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white p-6 mt-12">
        <p className="text-center text-sm text-gray-600">
          Looking for help or want to reset defaults?{' '}
          <button className="text-orange-600 hover:text-orange-700 font-medium">
            Contact Support
          </button>
        </p>
      </div>
    </div>
  );
}
