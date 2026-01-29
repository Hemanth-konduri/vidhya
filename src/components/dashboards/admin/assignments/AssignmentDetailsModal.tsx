"use client";

import { X, CheckCircle, Clock, RotateCcw, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AssignmentDetailsModalProps {
  courseId: string;
  isOpen: boolean;
  onClose: () => void;
}

const submissionTimelineData = [
  { week: "Week 1", submitted: 28, pending: 17 },
  { week: "Week 2", submitted: 35, pending: 10 },
  { week: "Week 3", submitted: 38, pending: 7 },
  { week: "Week 4", submitted: 40, pending: 5 },
];

const assignmentStatusData = [
  { name: "Completed", value: 32 },
  { name: "Pending", value: 8 },
  { name: "Reassignment", value: 3 },
  { name: "Not Submitted", value: 2 },
];

const gradeDistributionData = [
  { range: "90-100", count: 12 },
  { range: "80-89", count: 15 },
  { range: "70-79", count: 10 },
  { range: "60-69", count: 5 },
  { range: "Below 60", count: 1 },
];

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#6b7280"];

export default function AssignmentDetailsModal({
  courseId,
  isOpen,
  onClose,
}: AssignmentDetailsModalProps) {
  if (!isOpen) return null;

  const assignmentData = {
    courseName: "Data Structures",
    teacherName: "Dr. Priya Sharma",
    completedEvaluation: 32,
    pendingEvaluation: 8,
    completedAssignments: 38,
    totalAssignments: 45,
    averageMarks: "78/100",
    completionRate: "84%",
    reassignments: 3,
  };

  return (
    <>
      {/* BACKDROP WITH BLUR */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-opacity"
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">

          {/* MODAL HEADER */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-8 flex items-center justify-between border-b border-blue-800 flex-shrink-0">
            <div>
              <h2 className="text-3xl font-bold">{assignmentData.courseName}</h2>
              <p className="text-blue-100 text-sm mt-2">Taught by: <span className="font-semibold">{assignmentData.teacherName}</span></p>
            </div>
            <button
              onClick={onClose}
              className="bg-blue-500/30 hover:bg-blue-500/50 p-3 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* MODAL BODY - SCROLLABLE */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-b from-slate-50 to-white">

            {/* TOP STATISTICS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {/* COMPLETED EVALUATION */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 hover:border-green-300 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-green-700">{assignmentData.completedEvaluation}</p>
                <p className="text-xs text-green-600 font-semibold mt-2">Completed</p>
              </div>

              {/* PENDING EVALUATION */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-200 hover:border-yellow-300 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-yellow-600 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-yellow-700">{assignmentData.pendingEvaluation}</p>
                <p className="text-xs text-yellow-600 font-semibold mt-2">Pending</p>
              </div>

              {/* COMPLETION RATE */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-blue-700">{assignmentData.completionRate}</p>
                <p className="text-xs text-blue-600 font-semibold mt-2">Completion</p>
              </div>

              {/* AVERAGE MARKS */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 hover:border-purple-300 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-600 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-purple-700">{assignmentData.averageMarks}</p>
                <p className="text-xs text-purple-600 font-semibold mt-2">Average</p>
              </div>

            </div>

            {/* CHARTS ROW 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* SUBMISSION TIMELINE */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-md p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                  Submission Timeline
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={submissionTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1" }} />
                    <Legend />
                    <Bar dataKey="submitted" fill="#10b981" radius={[8, 8, 0, 0]} name="Submitted" />
                    <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* ASSIGNMENT STATUS PIE */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-md p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                  Assignment Status
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={assignmentStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {assignmentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* CHARTS ROW 2 */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-md p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-orange-600 rounded-full"></div>
                Grade Distribution
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={gradeDistributionData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1" }} />
                  <Legend />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Number of Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* REASSIGNMENTS & INFO ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* REASSIGNMENTS SECTION */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-600 p-3 rounded-lg">
                    <RotateCcw className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Reassignments Required</h3>
                    <p className="text-sm text-slate-600">Students needing to resubmit</p>
                  </div>
                </div>
                <p className="text-4xl font-bold text-red-700 mb-3">{assignmentData.reassignments}</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong>{assignmentData.reassignments}</strong> students have been marked for reassignment due to incomplete or unsatisfactory submissions. Please follow up with them.
                </p>
              </div>

              {/* QUICK STATS */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 font-semibold">Total Students</p>
                      <p className="text-2xl font-bold text-slate-900">{assignmentData.totalAssignments}</p>
                    </div>
                    <div className="text-4xl text-blue-200">👥</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 font-semibold">Not Submitted</p>
                      <p className="text-2xl font-bold text-slate-900">{assignmentData.totalAssignments - assignmentData.completedAssignments}</p>
                    </div>
                    <div className="text-4xl text-red-200">📋</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* MODAL FOOTER */}
          <div className="bg-slate-100 px-8 py-6 border-t-2 border-slate-200 flex gap-3 justify-end flex-shrink-0">
            <Button variant="outline" onClick={onClose} className="font-semibold">
              Close
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold gap-2">
              <Award className="w-4 h-4" />
              Generate Report
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}
