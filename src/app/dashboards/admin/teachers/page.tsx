"use client";

import { useEffect, useState } from "react";
import { Eye, Ban, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import { supabase } from "@/lib/supabase/client";


type Teacher = {
  id: string;
  name: string;
  email: string;
  employee_id: string;
  designation: string;
  image_url: string | null;
  created_at: string;
};

export default function AdminTeachersPage() {
  const router = useRouter();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchTeachers();
  }, []);

  async function fetchTeachers() {
    try {
      const { data, error } = await supabase
        .from("teachers")
        .select(`
          id,
          name,
          email,
          employee_id,
          designation,
          image_url,
          created_at
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTeachers(data || []);
    } catch (err) {
      console.error("Fetch teachers error:", err);
    } finally {
      setLoading(false);
    }
  }

  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeachers = teachers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-slate-500">
        Loading teachers...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Teachers</h1>
          <p className="text-sm text-slate-500">
            Manage teachers ({teachers.length})
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboards/admin/teachers/add")}
          className="bg-green-600 hover:bg-green-700
                     text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Teacher
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">

        <table className="w-full text-sm border-collapse">

          {/* HEAD */}
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Teacher</th>
              <th className="px-4 py-3 text-left">Designation</th>
              <th className="px-4 py-3 text-left">Employee ID</th>
              <th className="px-4 py-3 text-left">Joined</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {paginatedTeachers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-slate-400"
                >
                  No teachers found
                </td>
              </tr>
            )}

            {paginatedTeachers.map((teacher) => (
              <tr
                key={teacher.id}
                className="border-t hover:bg-slate-50"
              >

                {/* TEACHER */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">

                    {teacher.image_url ? (
                      <img
  src={teacher.image_url}
  alt={teacher.name}
  className="w-9 h-9 rounded-full object-cover"
/>

                    ) : (
                      <div className="w-9 h-9 rounded-full bg-indigo-100
                                      flex items-center justify-center
                                      text-indigo-700 font-semibold">
                        {teacher.name.charAt(0)}
                      </div>
                    )}

                    <div>
                      <p className="font-medium leading-tight">
                        {teacher.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {teacher.email}
                      </p>
                    </div>

                  </div>
                </td>

                {/* DESIGNATION */}
                <td className="px-4 py-3">
                  {teacher.designation || "—"}
                </td>

                {/* EMPLOYEE ID */}
                <td className="px-4 py-3">
                  {teacher.employee_id}
                </td>

                {/* JOINED */}
                <td className="px-4 py-3">
                  {new Date(teacher.created_at).toLocaleDateString()}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() =>
                        router.push(
                          `/dashboards/admin/teachers/${teacher.id}`
                        )
                      }
                      className="p-2 rounded hover:bg-slate-200"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      className="p-2 rounded hover:bg-yellow-100"
                      title="Disable"
                    >
                      <Ban className="w-4 h-4 text-yellow-600" />
                    </button>

                    <button
                      className="p-2 rounded hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>

                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

        {/* PAGINATION */}
        {teachers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={teachers.length}
          />
        )}

      </div>

    </div>
  );
}
