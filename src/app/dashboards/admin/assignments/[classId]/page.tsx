"use client";

import { useParams, useRouter } from "next/navigation";
import ClassProfileHeader from "@/components/dashboards/admin/classes/ClassProfileHeader";
import CourseCardsContainer from "@/components/dashboards/admin/assignments/CourseCardsContainer";
import { useState } from "react";
import AssignmentDetailsModal from "@/components/dashboards/admin/assignments/AssignmentDetailsModal";

export default function AssignmentsClassProfilePage() {
  const { classId } = useParams();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const classData = {
    id: classId as string,
    name: "CSE 1-A",
    classIncharge: "Dr. Priya Sharma",
    totalStudents: 45,
    branch: "Computer Science",
    group: "Group A",
    specialization: "Software Development",
    semester: "1st Semester",
    academicYear: "2025-2026",
    room: "Block A - Room 101",
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <p className="text-sm text-slate-500">
          Dashboard / Assignments / {classData.name}
        </p>
        <h1 className="text-2xl font-semibold">
          {classData.name} - Course Assignments
        </h1>
      </div>

      {/* CLASS PROFILE HEADER */}
      <ClassProfileHeader classData={classData} />

      {/* COURSE CARDS */}
      <CourseCardsContainer onCourseSelect={setSelectedCourse} />

      {/* ASSIGNMENT DETAILS MODAL */}
      {selectedCourse && (
        <AssignmentDetailsModal
          courseId={selectedCourse}
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

    </div>
  );
}
