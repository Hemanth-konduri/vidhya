"use client";

const feedbacks = [
  "Very well structured course",
  "More real-world examples needed",
  "Assignments are helpful",
];

export default function CourseFeedback() {
  return (
    <div className="bg-white p-6 rounded-xl border">

      <h3 className="text-sm font-semibold mb-4">
        Course Feedback
      </h3>

      <ul className="space-y-3 text-sm">
        {feedbacks.map((f, i) => (
          <li
            key={i}
            className="bg-slate-50 p-3 rounded-lg"
          >
            {f}
          </li>
        ))}
      </ul>

    </div>
  );
}