"use client";

import { BookOpen, Users, Clock, BarChart3, Eye, Lock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Pagination from "@/components/ui/pagination";
import { supabase } from "@/lib/supabase/client";

type Course = {
  id: string;
  title: string;
  course_code: string;
  credits: number;
  created_at: string;
};

export default function CoursesPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      console.log("Fetching courses...");
      // First try courses table
      let { data, error } = await supabase
        .from("courses")
        .select("id, title, course_code, credits, created_at")
        .order("created_at", { ascending: false });

      console.log("Courses data:", data, "Error:", error);
      
      // If courses table doesn't exist, create some dummy data
      if (error && error.code === '42P01') {
        console.log("Courses table doesn't exist, showing empty state");
        data = [];
        error = null;
      }

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.course_code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-slate-500">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Courses</h1>
          <p className="text-sm text-slate-500">
            Manage and monitor all courses ({courses.length} total)
          </p>
        </div>

        <button 
          onClick={() => router.push("/dashboards/admin/courses/add")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Course
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Courses"
          value={courses.length.toString()}
          icon={<BookOpen size={18} />}
        />

        <StatCard
          title="Active Courses"
          value={courses.length.toString()}
          icon={<BarChart3 size={18} />}
        />

        <StatCard
          title="Total Credits"
          value={courses.reduce((sum, c) => sum + (c.credits || 0), 0).toString()}
          icon={<Clock size={18} />}
        />

        <StatCard
          title="Avg Credits"
          value={courses.length > 0 ? Math.round(courses.reduce((sum, c) => sum + (c.credits || 0), 0) / courses.length).toString() : "0"}
          icon={<Users size={18} />}
        />

      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Search courses by name or code..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilterChange();
          }}
          className="border rounded-lg px-3 py-2 text-sm w-60"
        />
      </div>

      {/* COURSES TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] bg-slate-50 px-6 py-3 text-sm font-semibold gap-4">
          <div>Course Name</div>
          <div>Course Code</div>
          <div>Credits</div>
          <div>Created</div>
          <div>Actions</div>
        </div>

        {/* ROWS */}
        {paginatedCourses.length === 0 ? (
          <div className="px-6 py-8 text-center text-slate-500">
            {searchTerm ? `No courses found for "${searchTerm}"` : "No courses found"}
          </div>
        ) : (
          paginatedCourses.map((course) => (
            <div
              key={course.id}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-6 py-4 text-sm items-center border-t hover:bg-slate-50 gap-4"
            >

              {/* COURSE */}
              <div className="font-medium text-slate-900">
                {course.title}
              </div>

              {/* CODE */}
              <div className="text-slate-600">
                {course.course_code}
              </div>

              {/* CREDITS */}
              <div className="text-slate-600">
                {course.credits || 0}
              </div>

              {/* CREATED */}
              <div className="text-slate-600">
                {new Date(course.created_at).toLocaleDateString()}
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push(`/dashboards/admin/courses/${course.id}`)}
                  className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                  title="View"
                >
                  <Eye size={16} />
                </button>
                <button
                  className="p-1.5 text-yellow-600 hover:bg-yellow-100 rounded-lg transition"
                  title="Disable"
                >
                  <Lock size={16} />
                </button>
                <button
                  className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          ))
        )}

        {/* PAGINATION */}
        {filteredCourses.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredCourses.length}
          />
        )}

      </div>

    </div>
  );
}

/* ------------------ */
/* STAT CARD */
/* ------------------ */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4">

      <div className="w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>

    </div>
  );
}