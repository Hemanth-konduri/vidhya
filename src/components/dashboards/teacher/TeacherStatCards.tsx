import { Users, Layers, CheckCircle, TrendingUp } from "lucide-react";

const stats = [
  { title: "Total Batches", value: "8", icon: Layers },
  { title: "Total Students", value: "420", icon: Users },
  { title: "Avg Attendance", value: "78%", icon: TrendingUp },
  { title: "Submission Rate", value: "84%", icon: CheckCircle },
];

export default function TeacherStatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={i}
            className="bg-white rounded-xl border shadow-sm p-6
                       flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-slate-500">{s.title}</p>
              <p className="text-3xl font-bold mt-1">{s.value}</p>
            </div>

            <div className="w-12 h-12 rounded-lg bg-indigo-50
                            flex items-center justify-center">
              <Icon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
