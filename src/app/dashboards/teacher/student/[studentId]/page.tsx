import TeacherStudentProfile from "@/components/dashboards/teacher/student/TeacherStudentProfile";

export default function StudentProfilePage({
  params,
}: {
  params: { studentId: string };
}) {
  return (
    <TeacherStudentProfile studentId={params.studentId} />
  );
}
