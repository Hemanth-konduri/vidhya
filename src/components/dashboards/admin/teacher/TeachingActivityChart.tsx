"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { day: "Mon", lectures: 4, labs: 2, tutorials: 1 },
  { day: "Tue", lectures: 3, labs: 3, tutorials: 2 },
  { day: "Wed", lectures: 5, labs: 1, tutorials: 1 },
  { day: "Thu", lectures: 3, labs: 2, tutorials: 2 },
  { day: "Fri", lectures: 4, labs: 3, tutorials: 1 },
  { day: "Sat", lectures: 2, labs: 1, tutorials: 0 },
  { day: "Sun", lectures: 0, labs: 0, tutorials: 0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
        <p className="font-medium text-slate-700 mb-2">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {`${entry.dataKey.charAt(0).toUpperCase() + entry.dataKey.slice(1)}: ${entry.value} hours`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TeachingActivityChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col min-h-[350px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Teaching Activity</h3>
        <div className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-lg text-sm text-slate-600 cursor-pointer hover:bg-slate-100">
          <span>This Week</span>
          <ChevronDown size={14} />
        </div>
      </div>

      {/* Total Hours */}
      <div className="mb-4">
        <p className="text-3xl font-bold text-slate-800">
          38 <span className="text-lg font-normal text-slate-600">hours</span> 45 <span className="text-lg font-normal text-slate-600">minutes</span>
        </p>
        <p className="text-sm text-slate-500">Total teaching time this week</p>
      </div>

      {/* Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barGap={8}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              interval={0}
              tickMargin={10}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              domain={[0, 8]}
            />

            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey="lectures" stackId="a" fill="#16a34a" />
            <Bar dataKey="labs" stackId="a" fill="#38bdf8" />
            <Bar dataKey="tutorials" stackId="a" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded bg-green-600" />
          <span className="text-slate-600">Lectures</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded bg-sky-400" />
          <span className="text-slate-600">Labs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded bg-yellow-400" />
          <span className="text-slate-600">Tutorials</span>
        </div>
      </div>

      {/* Course Summary Cards
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-slate-800">12</p>
          <p className="text-xs text-slate-500 mt-1">Hours</p>
          <p className="text-xs text-slate-600 mt-1 font-medium">Data Structures</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-slate-800">15</p>
          <p className="text-xs text-slate-500 mt-1">Hours</p>
          <p className="text-xs text-slate-600 mt-1 font-medium">Operating Systems</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-slate-800">11.5</p>
          <p className="text-xs text-slate-500 mt-1">Hours</p>
          <p className="text-xs text-slate-600 mt-1 font-medium">Database Systems</p>
        </div>
      </div> */}
    </div>
  );
}