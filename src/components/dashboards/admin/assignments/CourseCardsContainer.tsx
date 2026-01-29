"use client";

import { BookOpen, Code, Database, Network, Cpu, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Course {
  id: string;
  name: string;
  icon: React.ReactNode;
  teacher: string;
  totalAssignments: number;
}

const courses: Course[] = [
  {
    id: "1",
    name: "Data Structures",
    icon: <Code className="w-8 h-8" />,
    teacher: "Dr. Priya Sharma",
    totalAssignments: 3,
  },
  {
    id: "2",
    name: "Database Management",
    icon: <Database className="w-8 h-8" />,
    teacher: "Prof. Rajesh Kumar",
    totalAssignments: 4,
  },
  {
    id: "3",
    name: "Web Development",
    icon: <BookOpen className="w-8 h-8" />,
    teacher: "Dr. Amit Singh",
    totalAssignments: 5,
  },
  {
    id: "4",
    name: "Computer Networks",
    icon: <Network className="w-8 h-8" />,
    teacher: "Dr. Neha Patel",
    totalAssignments: 2,
  },
  {
    id: "5",
    name: "Operating Systems",
    icon: <Cpu className="w-8 h-8" />,
    teacher: "Prof. Vikram Singh",
    totalAssignments: 3,
  },
  {
    id: "6",
    name: "Algorithms",
    icon: <FileJson className="w-8 h-8" />,
    teacher: "Dr. Priya Sharma",
    totalAssignments: 4,
  },
];

interface CourseCardsContainerProps {
  onCourseSelect: (courseId: string) => void;
}

export default function CourseCardsContainer({ onCourseSelect }: CourseCardsContainerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Course Assignments</h2>
        <p className="text-sm text-slate-500">{courses.length} Courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            
            {/* CARD HEADER - ICON & SUBJECT */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-between group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <div className="text-blue-600">{course.icon}</div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{course.name}</h3>
                  <p className="text-sm text-slate-600">Subject Course</p>
                </div>
              </div>
            </div>

            {/* CARD BODY */}
            <div className="p-6 space-y-4">
              
              {/* TEACHER */}
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Teacher</p>
                <p className="text-sm font-medium text-slate-900">{course.teacher}</p>
              </div>

              {/* ASSIGNMENTS COUNT */}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-xs text-slate-500 font-medium mb-1">Total Assignments</p>
                <p className="text-2xl font-bold text-blue-600">{course.totalAssignments}</p>
              </div>

            </div>

            {/* CARD FOOTER - VIEW BUTTON */}
            <div className="px-6 pb-6">
              <Button
                onClick={() => onCourseSelect(course.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
              >
                View Details
              </Button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
