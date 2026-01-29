"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import Pagination from "@/components/ui/pagination";

const classes = [
  {
    id: "1",
    name: "CSE 1-A",
    department: "Computer Science",
    semester: "1st Semester",
    instructor: "Dr. Priya Sharma",
    totalAssignments: 12,
  },
  {
    id: "2",
    name: "CSE 1-B",
    department: "Computer Science",
    semester: "1st Semester",
    instructor: "Prof. Rajesh Kumar",
    totalAssignments: 10,
  },
  {
    id: "3",
    name: "CSE 2-A",
    department: "Computer Science",
    semester: "2nd Semester",
    instructor: "Dr. Amit Singh",
    totalAssignments: 15,
  },
  {
    id: "4",
    name: "ECE 1-A",
    department: "Electronics",
    semester: "1st Semester",
    instructor: "Dr. Neha Patel",
    totalAssignments: 8,
  },
  {
    id: "5",
    name: "ECE 2-B",
    department: "Electronics",
    semester: "2nd Semester",
    instructor: "Prof. Kiran Joshi",
    totalAssignments: 11,
  },
  {
    id: "6",
    name: "MECH 1-A",
    department: "Mechanical",
    semester: "1st Semester",
    instructor: "Prof. Vikram Singh",
    totalAssignments: 9,
  },
  {
    id: "7",
    name: "CIVIL 1-A",
    department: "Civil",
    semester: "1st Semester",
    instructor: "Dr. Ravi Gupta",
    totalAssignments: 7,
  },
  {
    id: "8",
    name: "CSE 3-A",
    department: "Computer Science",
    semester: "3rd Semester",
    instructor: "Dr. Sunita Rao",
    totalAssignments: 13,
  },
];

export default function AssignmentsClassList() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(classes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClasses = classes.slice(startIndex, startIndex + itemsPerPage);

  const handleViewClass = (classId: string) => {
    router.push(`/dashboards/admin/assignments/${classId}`);
  };

  return (
    <div className="space-y-6">

      {/* CLASSES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedClasses.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            
            {/* CLASS HEADER */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
              <h3 className="text-lg font-bold">{classItem.name}</h3>
              <p className="text-sm text-blue-100">{classItem.department}</p>
            </div>

            {/* CLASS INFO */}
            <div className="p-4 space-y-3 flex-1">
              <div>
                <p className="text-xs text-slate-500 mb-1">Semester</p>
                <p className="text-sm font-medium text-slate-900">{classItem.semester}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Instructor</p>
                <p className="text-sm font-medium text-slate-900">{classItem.instructor}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Total Assignments</p>
                <p className="text-2xl font-bold text-blue-600">{classItem.totalAssignments}</p>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="p-4 border-t border-slate-200">
              <Button
                onClick={() => handleViewClass(classItem.id)}
                className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Eye className="w-4 h-4" />
                View Assignments
              </Button>
            </div>

          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={classes.length}
        />
      </div>

    </div>
  );
}
