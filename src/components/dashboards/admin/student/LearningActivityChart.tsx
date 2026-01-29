"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 5 },
  { day: "Wed", hours: 6 },
  { day: "Thu", hours: 4 },
  { day: "Fri", hours: 5 },
  { day: "Sat", hours: 2 },
  { day: "Sun", hours: 1 },
];

export default function LearningActivityChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Learning Activity</h3>
        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md">
          Weekly
        </span>
      </div>

      {/* Stat */}
      <div className="text-2xl font-bold mb-4">
        26 hrs
        <span className="text-xs text-slate-500 ml-2">total</span>
      </div>

      {/* Chart */}
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="learn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="hours"
              stroke="#16a34a"
              strokeWidth={3}
              fill="url(#learn)"
              dot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 text-sm">
        <span className="w-3 h-3 rounded-full bg-green-500" />
        Study Hours Per Day
      </div>

    </div>
  );
}