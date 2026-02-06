"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function TeacherStudentProfile({
  studentId
}: {
  studentId: string;
}) {

  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    async function load() {

      const { data } = await supabase
        .from("students")
        .select(`
          name,
          roll_no,
          phone,
          email,
          gender,
          dob,
          address,
          batches(name),
          departments(name)
        `)
        .eq("id", studentId)
        .single();

      setStudent(data);
    }

    load();
  }, [studentId]);

  if (!student) return <p>Loading...</p>;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        {student.name}
      </h1>

      <div className="bg-white p-6 rounded-xl border shadow-sm">

        <p><b>Roll No:</b> {student.roll_no}</p>
        <p><b>Batch:</b> {student.batches?.name}</p>
        <p><b>Department:</b> {student.departments?.name}</p>
        <p><b>Email:</b> {student.email}</p>
        <p><b>Phone:</b> {student.phone}</p>
        <p><b>Gender:</b> {student.gender}</p>
        <p><b>DOB:</b> {student.dob}</p>
        <p><b>Address:</b> {student.address}</p>

      </div>

    </div>
  );
}
