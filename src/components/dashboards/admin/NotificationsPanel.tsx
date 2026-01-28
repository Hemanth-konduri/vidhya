"use client";

const notifications = [
  {
    text: "Low attendance alert in CSE 2nd Year",
    date: "Apr 22",
  },
  {
    text: "12 assignments pending review",
    date: "Apr 21",
  },
  {
    text: "3 courses need new instructors",
    date: "Apr 20",
  },
  {
    text: "New teacher registration: Mark Lee",
    date: "Apr 19",
  },
];

export default function NotificationsPanel() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700">
          Notifications
        </h3>
        <button className="text-xs text-green-600 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((n, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              🔔
            </div>
            <div>
              <p className="text-sm text-slate-700">
                {n.text}
              </p>
              <p className="text-xs text-slate-400">
                {n.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}