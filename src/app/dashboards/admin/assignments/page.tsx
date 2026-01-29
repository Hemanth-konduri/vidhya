"use client";

import { Button } from "@/components/ui/button";
import AssignmentsClassList from "@/components/dashboards/admin/assignments/AssignmentsClassList";
import { Plus } from "lucide-react";

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">Dashboard / Assignments</p>
          <h1 className="text-2xl font-semibold">Assignments Management</h1>
        </div>
        <Button className="gap-2 bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4" />
          New Assignment
        </Button>
      </div>

      {/* ASSIGNMENTS CLASS LIST */}
      <AssignmentsClassList />

    </div>
  );
}
