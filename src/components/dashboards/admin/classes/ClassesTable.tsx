"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import Pagination from "@/components/ui/pagination";

const classes = [
  {
    id: "1",
    name: "CSE 1-A",
    department: "Computer Science",
    semester: "1st Semester",
    instructor: "Dr. Priya Sharma",
    students: 45,
    status: "Active",
  },
  {
    id: "2",
    name: "CSE 1-B",
    department: "Computer Science",
    semester: "1st Semester",
    instructor: "Prof. Rajesh Kumar",
    students: 42,
    status: "Active",
  },
  {
    id: "3",
    name: "CSE 2-A",
    department: "Computer Science",
    semester: "2nd Semester",
    instructor: "Dr. Amit Singh",
    students: 38,
    status: "Active",
  },
  {
    id: "4",
    name: "ECE 1-A",
    department: "Electronics",
    semester: "1st Semester",
    instructor: "Dr. Neha Patel",
    students: 40,
    status: "Active",
  },
  {
    id: "5",
    name: "MECH 1-A",
    department: "Mechanical",
    semester: "1st Semester",
    instructor: "Prof. Vikram Singh",
    students: 35,
    status: "Inactive",
  },
  {
    id: "6",
    name: "CSE 3-A",
    department: "Computer Science",
    semester: "3rd Semester",
    instructor: "Dr. Sunita Rao",
    students: 41,
    status: "Active",
  },
  {
    id: "7",
    name: "ECE 2-B",
    department: "Electronics",
    semester: "2nd Semester",
    instructor: "Prof. Kiran Joshi",
    students: 39,
    status: "Active",
  },
  {
    id: "8",
    name: "CIVIL 1-A",
    department: "Civil",
    semester: "1st Semester",
    instructor: "Dr. Ravi Gupta",
    students: 44,
    status: "Active",
  },
];

const getStatusBadge = (status: string) => {
  return status === "Active"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";
};

export default function ClassesTable() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(classes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClasses = classes.slice(startIndex, startIndex + itemsPerPage);

  const handleViewClass = (classId: string) => {
    router.push(`/dashboards/admin/classes/${classId}`);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">All Classes</h3>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Class Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Department
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Semester
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Instructor
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Students
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedClasses.map((classItem) => (
              <tr
                key={classItem.id}
                className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900">{classItem.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {classItem.department}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {classItem.semester}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {classItem.instructor}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">
                  {classItem.students}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      classItem.status
                    )}`}
                  >
                    {classItem.status}
                  </span>
                </td>
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
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={classes.length}
      />

    </div>
  );
}
