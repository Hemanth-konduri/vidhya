"use client";

const modules = [
  "Introduction",
  "Relational Model",
  "SQL Basics",
  "Normalization",
  "Transactions",
];

export default function CourseModules() {
  return (
    <div className="bg-white p-6 rounded-xl border">

      <h3 className="text-sm font-semibold mb-4">
        Course Modules
      </h3>

      <ul className="space-y-2 text-sm">
        {modules.map((m, i) => (
          <li
            key={i}
            className="px-3 py-2 bg-slate-50 rounded-lg"
          >
            {m}
          </li>
        ))}
      </ul>

    </div>
  );
}