"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Completed", value: 65 },
  { name: "Remaining", value: 35 },
];

const COLORS = ["#22c55e", "#e5e7eb"];

export default function CourseCompletionPie() {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">

      {/* HEADER */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">
          Course Completion Overview
        </h3>
        <p className="text-sm text-slate-500">
          Progress across all batches
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

        {/* DONUT */}
        <div className="relative h-60">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={75}
                outerRadius={100}
                dataKey="value"
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-slate-800">65%</p>
            <p className="text-sm text-slate-500">Completed</p>
          </div>

        </div>

        {/* STATS */}
        <div className="space-y-5">

          <div className="flex justify-between">
            <span className="text-sm text-slate-500">
              Completed Topics
            </span>
            <span className="font-semibold text-green-600">
              52
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-slate-500">
              Remaining Topics
            </span>
            <span className="font-semibold">
              28
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-slate-500">
              Total Topics
            </span>
            <span className="font-semibold">
              80
            </span>
          </div>

          {/* PROGRESS BAR */}
          <div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: "65%" }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Overall completion
            </p>
          </div>

        </div>

      </div>

      {/* LEGEND */}
      <div className="flex gap-6 mt-4">

        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          Completed
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full bg-slate-300" />
          Remaining
        </div>

      </div>

    </div>
  );
}
