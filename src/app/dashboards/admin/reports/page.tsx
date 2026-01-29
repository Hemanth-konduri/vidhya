"use client";

import { Button } from "@/components/ui/button";
import ReportsOverview from "@/components/dashboards/admin/reports/ReportsOverview";
import ReportsList from "@/components/dashboards/admin/reports/ReportsList";
import { Plus, Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">Dashboard / Reports</p>
          <h1 className="text-2xl font-semibold">Reports & Analytics</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* REPORTS OVERVIEW */}
      <ReportsOverview />

      {/* REPORTS LIST */}
      <ReportsList />

    </div>
  );
}
