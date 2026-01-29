"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import GeneralSettings from "@/components/dashboards/admin/settings/GeneralSettings";
import NotificationSettings from "@/components/dashboards/admin/settings/NotificationSettings";
import SecuritySettings from "@/components/dashboards/admin/settings/SecuritySettings";
import { Settings, Bell, Lock } from "lucide-react";

type SettingsTab = "general" | "notifications" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  const tabs = [
    { id: "general" as SettingsTab, label: "General Settings", icon: Settings },
    { id: "notifications" as SettingsTab, label: "Notifications", icon: Bell },
    { id: "security" as SettingsTab, label: "Security", icon: Lock },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <p className="text-sm text-slate-500">Dashboard / Settings</p>
        <h1 className="text-2xl font-semibold">System Settings</h1>
      </div>

      {/* TABS */}
      <div className="flex gap-2 border-b border-slate-200 bg-white p-4 rounded-t-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}
      <div className="space-y-6">
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "security" && <SecuritySettings />}
      </div>

    </div>
  );
}
