"use client";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const courseData = [
  { name: "Computer Science", value: 40, fill: "#10b981" },
  { name: "Electronics", value: 25, fill: "#14b8a6" },
  { name: "Mechanical", value: 20, fill: "#06b6d4" },
  { name: "Civil", value: 15, fill: "#0ea5e9" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-stone-200 text-sm">
        <p className="font-semibold text-slate-900">{payload[0].name}</p>
        <p className="text-xs text-slate-600 font-medium">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex justify-center gap-3 flex-wrap mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-600 font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CourseCompletionChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 60 }}>
        <Pie
          data={courseData}
          cx="50%"
          cy="40%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {courseData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CourseCompletionChart;