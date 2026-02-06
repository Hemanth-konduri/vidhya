export default function RecentSubmissionsPanel() {
  const data = [
    { title: "DSA Assignment 3", batch: "CSE-A", time: "10m ago" },
    { title: "OS Quiz 1", batch: "CSE-B", time: "30m ago" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Recent Submissions</h3>
        <button className="text-sm text-indigo-600">View All</button>
      </div>

      <div className="space-y-3">
        {data.map((d, i) => (
          <div
            key={i}
            className="flex justify-between items-center
                       p-3 rounded-lg bg-slate-50"
          >
            <div>
              <p className="font-medium">{d.title}</p>
              <p className="text-xs text-slate-500">{d.batch}</p>
            </div>
            <span className="text-xs text-slate-400">{d.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
