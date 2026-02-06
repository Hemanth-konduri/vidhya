import { AlertTriangle } from "lucide-react";

export default function ComplaintsPanel() {

  const complaints = [
    { issue: "Video not playing - CSE-A", status: "Open" },
    { issue: "Assignment unclear - CSE-B", status: "Open" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <h3 className="font-semibold">Complaints / Issues</h3>
      </div>

      <div className="space-y-3">
        {complaints.map((c, i) => (
          <div
            key={i}
            className="flex justify-between items-center
                       p-3 rounded-lg bg-slate-50"
          >
            <p className="text-sm">{c.issue}</p>

            <span className="text-xs px-2 py-1 rounded-full
                             bg-red-100 text-red-600">
              {c.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
