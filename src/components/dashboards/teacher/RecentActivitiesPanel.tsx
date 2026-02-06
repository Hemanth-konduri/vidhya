import { Activity } from "lucide-react";

export default function RecentActivitiesPanel() {

  const activities = [
    { text: "Assignment created for CSE-A", time: "1h ago" },
    { text: "Quiz published for CSE-B", time: "3h ago" },
    { text: "Student added to ECE-A", time: "Yesterday" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold">Recent Activities</h3>
      </div>

      <div className="space-y-3">
        {activities.map((a, i) => (
          <div
            key={i}
            className="flex justify-between items-start
                       p-3 rounded-lg bg-slate-50"
          >
            <p className="text-sm">{a.text}</p>
            <span className="text-xs text-slate-400">
              {a.time}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
