"use client";

import { BookOpen, Users, Clock, BarChart3, Eye, Lock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Pagination from "@/components/ui/pagination";

type Course = {
  id: string;
  title: string;
  category: string;
  instructor: string;
  students: number;
  duration: string;
  progress: number;
  status: "Active" | "Completed" | "Draft";
};

const courses: Course[] = [
  {
    id: "1",
    title: "Database Management Systems",
    category: "Computer Science",
    instructor: "Dr. Priya Sharma",
    students: 120,
    duration: "40h",
    progress: 78,
    status: "Active",
  },
  {
    id: "2",
    title: "Operating Systems",
    category: "Computer Science",
    instructor: "Anil Kumar",
    students: 95,
    duration: "36h",
    progress: 65,
    status: "Active",
  },
  {
    id: "3",
    title: "Data Structures",
    category: "Computer Science",
    instructor: "Rahul Mehta",
    students: 140,
    duration: "45h",
    progress: 100,
    status: "Completed",
  },
  {
    id: "4",
    title: "Computer Networks",
    category: "Computer Science",
    instructor: "Sneha Rao",
    students: 80,
    duration: "30h",
    progress: 40,
    status: "Draft",
  },
  {
    id: "5",
    title: "Software Engineering",
    category: "Computer Science",
    instructor: "Dr. Amit Singh",
    students: 110,
    duration: "50h",
    progress: 85,
    status: "Active",
  },
  {
    id: "6",
    title: "Machine Learning",
    category: "Computer Science",
    instructor: "Prof. Neha Patel",
    students: 75,
    duration: "60h",
    progress: 45,
    status: "Active",
  },
  {
    id: "7",
    title: "Web Development",
    category: "Computer Science",
    instructor: "Vikram Singh",
    students: 130,
    duration: "35h",
    progress: 90,
    status: "Active",
  },
  {
    id: "8",
    title: "Digital Marketing",
    category: "Business",
    instructor: "Sunita Rao",
    students: 65,
    duration: "25h",
    progress: 100,
    status: "Completed",
  },
];

export default function CoursesPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const itemsPerPage = 5;

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || course.category === categoryFilter;
    const matchesStatus = !statusFilter || course.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Courses</h1>
          <p className="text-sm text-slate-500">
            Manage and monitor all courses
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
          value="120"
          icon={<BookOpen size={18} />}
        />

        <StatCard
          title="Active Courses"
          value="98"
          icon={<BarChart3 size={18} />}
        />

        <StatCard
          title="Completed Courses"
          value="22"
          icon={<Clock size={18} />}
        />

        <StatCard
          title="Avg Completion"
          value="76%"
          icon={<Users size={18} />}
        />

      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilterChange();
          }}
          className="border rounded-lg px-3 py-2 text-sm w-60"
        />

        <select 
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            handleFilterChange();
          }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Business">Business</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select 
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            handleFilterChange();
          }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {/* COURSES TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-[2fr_1fr_1fr_0.8fr_1fr_1fr_1fr] bg-slate-50 px-6 py-3 text-sm font-semibold gap-4">
          <div>Course</div>
          <div>Category</div>
          <div>Instructor</div>
          <div>Students</div>
          <div>Progress</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {/* ROWS */}
        {paginatedCourses.map((course) => (
          <div
            key={course.id}
            className="grid grid-cols-[2fr_1fr_1fr_0.8fr_1fr_1fr_1fr] px-6 py-4 text-sm items-center border-t hover:bg-slate-50 gap-4"
          >

            {/* COURSE */}
            <div className="font-medium text-slate-900">
              {course.title}
            </div>

            {/* CATEGORY */}
            <div className="text-slate-600">
              {course.category}
            </div>

            {/* INSTRUCTOR */}
            <div className="text-slate-600">
              {course.instructor}
            </div>

            {/* STUDENTS */}
            <div className="text-slate-600">
              {course.students}
            </div>

            {/* PROGRESS */}
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden flex-shrink-0">
                <div
                  className="h-full bg-green-600"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 w-10">
                {course.progress}%
              </span>
            </div>

            {/* STATUS */}
            <span
              className={`text-xs px-2 py-1 rounded-full w-fit ${
                course.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : course.status === "Completed"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {course.status}
            </span>

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
        ))}

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