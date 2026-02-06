import { CalendarDays } from "lucide-react";

export default function UpcomingSchedulePanel() {

  const schedules = [
    { title: "DSA Assignment Due", date: "Tomorrow" },
    { title: "OS Quiz", date: "Friday" },
    { title: "Module 3 Target Completion", date: "Next Week" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold">Upcoming Schedule</h3>
      </div>

      <div className="space-y-3">
        {schedules.map((s, i) => (
          <div
            key={i}
            className="flex justify-between items-center
                       p-3 rounded-lg bg-slate-50"
          >
            <p className="text-sm">{s.title}</p>

            <span className="text-xs text-slate-500">
              {s.date}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
