"use client";

const feedbacks = [
  {
    user: "Rahul Sharma",
    message: "Video lectures buffering frequently.",
    date: "Apr 22",
  },
  {
    user: "Ananya Patel",
    message: "Unable to submit assignment for DBMS.",
    date: "Apr 21",
  },
  {
    user: "Karthik R",
    message: "Need dark mode option.",
    date: "Apr 20",
  },
];

export default function FeedbackPanel() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold">
          Complaints & Feedback
        </h3>
        <button className="text-xs text-green-600 hover:underline">
          View All
        </button>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {feedbacks.map((f, i) => (
          <div
            key={i}
            className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 transition"
          >

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-semibold">
              {f.user[0]}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-medium">{f.user}</p>
              <p className="text-sm text-slate-600">
                {f.message}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {f.date}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}