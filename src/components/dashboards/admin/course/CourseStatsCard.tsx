"use client";

export default function CourseStatsCard() {
  return (
    <div className="bg-white p-6 rounded-xl border space-y-4">

      <h3 className="text-sm font-semibold">
        Course Stats
      </h3>

      <div className="grid grid-cols-3 gap-4 text-center">

        <div>
          <p className="text-2xl font-bold">78%</p>
          <p className="text-xs text-slate-500">Avg Score</p>
        </div>

        <div>
          <p className="text-2xl font-bold">24</p>
          <p className="text-xs text-slate-500">Lessons</p>
        </div>

        <div>
          <p className="text-2xl font-bold">40h</p>
          <p className="text-xs text-slate-500">Duration</p>
        </div>

      </div>

    </div>
  );
}