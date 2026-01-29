"use client";

import { Button } from "@/components/ui/button";
import { Lock, Shield, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function SecuritySettings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  return (
    <div className="space-y-6">

      {/* CHANGE PASSWORD */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Change Password</h2>
              <p className="text-sm text-slate-500">Update your account password</p>
            </div>
          </div>
          <Button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            variant={showPasswordForm ? "default" : "outline"}
          >
            {showPasswordForm ? "Cancel" : "Change"}
          </Button>
        </div>

        {showPasswordForm && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter your current password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your new password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 w-full">
              Update Password
            </Button>
          </div>
        )}
      </div>

      {/* SECURITY OPTIONS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-3 rounded-lg">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Security Options</h2>
            <p className="text-sm text-slate-500">Manage your account security</p>
          </div>
        </div>

        <div className="space-y-4">

          {/* TWO-FACTOR AUTH */}
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
            <div>
              <h3 className="font-medium text-slate-900">Two-Factor Authentication</h3>
              <p className="text-sm text-slate-500">Add an extra layer of security</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>

          {/* LOGIN ALERTS */}
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
            <div>
              <h3 className="font-medium text-slate-900">Login Alerts</h3>
              <p className="text-sm text-slate-500">Get notified of new login attempts</p>
            </div>
            <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-green-600 transition-colors">
              <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-7" />
            </button>
          </div>

          {/* SESSION MANAGEMENT */}
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
            <div>
              <h3 className="font-medium text-slate-900">Active Sessions</h3>
              <p className="text-sm text-slate-500">View and manage your active sessions</p>
            </div>
            <Button variant="outline">Manage</Button>
          </div>

        </div>

      </div>

      {/* DATA & PRIVACY */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-100 p-3 rounded-lg">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Danger Zone</h2>
            <p className="text-sm text-slate-500">Irreversible and destructive actions</p>
          </div>
        </div>

        <div className="space-y-4">

          {/* DELETE ACCOUNT */}
          <div className="flex items-center justify-between p-4 border-2 border-red-200 rounded-lg bg-red-50">
            <div>
              <h3 className="font-medium text-slate-900">Delete Account</h3>
              <p className="text-sm text-slate-500">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
              Delete
            </Button>
          </div>

        </div>

      </div>

    </div>
  );
}
