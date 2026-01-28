"use client";

const users = [
  {
    name: "Alice Johnson",
    role: "Student",
    class: "BSc CS - 1st Year",
    joined: "Apr 23, 2024",
  },
  {
    name: "Michael Smith",
    role: "Teacher",
    class: "BSc ME - 3rd Year",
    joined: "Apr 22, 2024",
  },
  {
    name: "Emily Davis",
    role: "Student",
    class: "BSc EE - 2nd Year",
    joined: "Apr 21, 2024",
  },
];

export default function RecentUsersTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800">
          Recent Users
        </h3>
        <button className="text-xs text-green-600 hover:underline">
          View All
        </button>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-12 text-xs font-semibold text-slate-400 bg-slate-50 px-4 py-2 rounded-lg">
        <div className="col-span-4">Name</div>
        <div className="col-span-3">Role</div>
        <div className="col-span-3">Class</div>
        <div className="col-span-2">Joined</div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {users.map((u, i) => (
          <div
            key={i}
            className="grid grid-cols-12 items-center px-4 py-3 hover:bg-slate-50 transition"
          >

            {/* Name */}
            <div className="col-span-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold">
                {u.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-slate-800">
                {u.name}
              </span>
            </div>

            {/* Role */}
            <div className="col-span-3">
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium
                ${
                  u.role === "Student"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-purple-50 text-purple-600"
                }`}
              >
                {u.role}
              </span>
            </div>

            {/* Class */}
            <div className="col-span-3 text-sm text-slate-600">
              {u.class}
            </div>

            {/* Joined */}
            <div className="col-span-2 text-sm text-slate-500">
              {u.joined}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}