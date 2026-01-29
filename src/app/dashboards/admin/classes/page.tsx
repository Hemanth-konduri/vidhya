"use client";

import { Button } from "@/components/ui/button";
import ClassesTable from "@/components/dashboards/admin/classes/ClassesTable";
import ClassStatistics from "@/components/dashboards/admin/classes/ClassStatistics";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClassesPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">Dashboard / Classes</p>
          <h1 className="text-2xl font-semibold">Classes Management</h1>
        </div>
        <Button 
          className="gap-2 bg-green-600 hover:bg-green-700"
          onClick={() => router.push("/dashboards/admin/classes/add")}
        >
          <Plus className="w-4 h-4" />
          New Class
        </Button>
      </div>

      {/* STATISTICS */}
      <ClassStatistics />

      {/* CLASSES TABLE */}
      <ClassesTable />

    </div>
  );
}
