import TeacherNavbar from "@/components/dashboards/teacher/TeacherNavbar";
import TeacherSidebar from "@/components/dashboards/teacher/TeacherSidebar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="h-screen flex bg-[#f6f8f6]">
   
         {/* SIDEBAR */}
         <TeacherSidebar className="sticky top-0 z-20" />
   
         {/* RIGHT SIDE */}
         <div className="flex flex-col flex-1 overflow-hidden">
   
           {/* NAVBAR */}
           <TeacherNavbar />
   
           {/* MAIN CONTENT */}
           <main className="flex-1 overflow-y-auto p-6 bg-[#f6f8f6]">
             {children}
           </main>
   
         </div>
   
       </div>
  );
}
