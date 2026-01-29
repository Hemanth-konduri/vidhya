"use client";

import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const sectionProgressData = [
  { section: "CSE 1", performance: 95 },
  { section: "CSE 2", performance: 88 },
  { section: "CSE 3", performance: 72 },
  { section: "CSE 4", performance: 58 },
  { section: "CSE 5", performance: 35 },
];

const moduleCompletionData = [
  { name: "Completed", value: 45 },
  { name: "In Progress", value: 35 },
  { name: "Pending", value: 20 },
];

const studentPerformanceData = [
  { range: "90-100", count: 15 },
  { range: "80-89", count: 35 },
  { range: "70-79", count: 45 },
  { range: "60-69", count: 20 },
  { range: "Below 60", count: 5 },
];

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export default function CourseAnalyticsCharts() {
  return (
    <div className="space-y-6">
      
      {/* TOP ROW - 2 CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SECTION PERFORMANCE */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Section-wise Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sectionProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="section" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="performance" 
                stroke="#3b82f6" 
                fill="#93c5fd"
                strokeWidth={2}
                name="Performance %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* MODULE COMPLETION STATUS */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Module Completion Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={moduleCompletionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {moduleCompletionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* BOTTOM ROW - PERFORMANCE DISTRIBUTION */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Student Performance Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={studentPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Number of Students" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

