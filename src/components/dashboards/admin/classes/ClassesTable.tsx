"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import Pagination from "@/components/ui/pagination";
import { supabase } from "@/lib/supabase/client";

/* =======================
   TYPES
======================= */

type Class = {
  id: string;
  semester: string;
  status: string;
  created_at: string;

  batches: {
    name: string;
  } | null;

  teachers: {
    name: string;
  } | null;
};

/* =======================
   COMPONENT
======================= */

export default function ClassesTable() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;

  /* =======================
     FETCH CLASSES
  ======================= */

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const { data, error } = await supabase
  .from("classes")
  .select(`
    id,
    semester,
    status,
    created_at,
    batches!classes_batch_id_fkey (
      name
    ),
    teachers!classes_class_teacher_id_fkey (
      name
    )
  `)
  .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch error:", error);
        setClasses([]);
      } else {
        setClasses((data as Class[]) || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     PAGINATION
  ======================= */

  const totalPages = Math.ceil(classes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClasses = classes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* =======================
     HELPERS
  ======================= */

  const handleViewClass = (classId: string) => {
    router.push(`/dashboards/admin/classes/${classId}`);
  };

  const getStatusBadge = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  /* =======================
     LOADING STATE
  ======================= */

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-slate-500">Loading classes...</div>
      </div>
    );
  }

  /* =======================
     UI
  ======================= */

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">
          All Classes ({classes.length})
        </h3>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">

          {/* TABLE HEAD */}
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Class ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Semester
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Batch
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Teacher
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {paginatedClasses.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-slate-500"
                >
                  No classes found
                </td>
              </tr>
            ) : (
              paginatedClasses.map((classItem) => (
                <tr
                  key={classItem.id}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                >

                  {/* CLASS ID */}
                  <td className="px-6 py-4 font-medium text-slate-900">
                    Class {classItem.id.slice(0, 8)}
                  </td>

                  {/* SEMESTER */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    Semester {classItem.semester}
                  </td>

                  {/* BATCH */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {classItem.batches?.name || "No Batch"}
                  </td>

                  {/* TEACHER */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {classItem.teachers?.name || "No Teacher"}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        classItem.status
                      )}`}
                    >
                      {classItem.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => handleViewClass(classItem.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-green-600 hover:text-green-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {classes.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={classes.length}
        />
      )}

    </div>
  );
}