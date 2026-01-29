"use client";

const scheduleData = [
  {
    day: "Monday",
    slots: [
      { time: "9:00-10:00", course: "Data Structures", type: "Lecture", room: "CS-101" },
      { time: "10:00-11:00", course: "", type: "", room: "" },
      { time: "11:00-12:00", course: "Operating Systems", type: "Lab", room: "CS-Lab1" },
      { time: "12:00-1:00", course: "", type: "", room: "" },
      { time: "2:00-3:00", course: "Database Systems", type: "Lecture", room: "CS-102" },
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { time: "9:00-10:00", course: "Computer Networks", type: "Lecture", room: "CS-103" },
      { time: "10:00-11:00", course: "Data Structures", type: "Tutorial", room: "CS-101" },
      { time: "11:00-12:00", course: "", type: "", room: "" },
      { time: "12:00-1:00", course: "Operating Systems", type: "Lecture", room: "CS-102" },
      { time: "2:00-3:00", course: "", type: "", room: "" },
    ]
  },
  {
    day: "Wednesday",
    slots: [
      { time: "9:00-10:00", course: "", type: "", room: "" },
      { time: "10:00-11:00", course: "Database Systems", type: "Lab", room: "CS-Lab2" },
      { time: "11:00-12:00", course: "Computer Networks", type: "Tutorial", room: "CS-103" },
      { time: "12:00-1:00", course: "Data Structures", type: "Lecture", room: "CS-101" },
      { time: "2:00-3:00", course: "Operating Systems", type: "Lab", room: "CS-Lab1" },
    ]
  },
  {
    day: "Thursday",
    slots: [
      { time: "9:00-10:00", course: "Database Systems", type: "Lecture", room: "CS-102" },
      { time: "10:00-11:00", course: "", type: "", room: "" },
      { time: "11:00-12:00", course: "Computer Networks", type: "Lab", room: "CS-Lab2" },
      { time: "12:00-1:00", course: "Data Structures", type: "Tutorial", room: "CS-101" },
      { time: "2:00-3:00", course: "", type: "", room: "" },
    ]
  },
  {
    day: "Friday",
    slots: [
      { time: "9:00-10:00", course: "Operating Systems", type: "Lecture", room: "CS-102" },
      { time: "10:00-11:00", course: "Database Systems", type: "Tutorial", room: "CS-102" },
      { time: "11:00-12:00", course: "", type: "", room: "" },
      { time: "12:00-1:00", course: "Computer Networks", type: "Lecture", room: "CS-103" },
      { time: "2:00-3:00", course: "Data Structures", type: "Lab", room: "CS-Lab1" },
    ]
  },
];

const timeSlots = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", "2:00-3:00"];

export default function ScheduleTimetable() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Lecture":
        return "bg-green-100 text-green-700 border-green-200";
      case "Lab":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Tutorial":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-slate-50 text-slate-400";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Schedule / Timetable</h3>
        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
          Current Week
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 font-medium text-slate-600 w-24">Day</th>
              {timeSlots.map((time) => (
                <th key={time} className="text-center py-3 px-2 font-medium text-slate-600 min-w-32">
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((dayData) => (
              <tr key={dayData.day} className="border-b border-slate-100">
                <td className="py-4 px-2 font-medium text-slate-700">
                  {dayData.day}
                </td>
                {dayData.slots.map((slot, index) => (
                  <td key={index} className="py-4 px-2 text-center">
                    {slot.course ? (
                      <div className={`p-2 rounded-lg border text-xs ${getTypeColor(slot.type)}`}>
                        <div className="font-medium">{slot.course}</div>
                        <div className="text-xs opacity-75">{slot.type}</div>
                        <div className="text-xs opacity-75">{slot.room}</div>
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-slate-50 text-slate-400 text-xs">
                        Free
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-100 border border-green-200" />
          <span className="text-slate-600">Lecture</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200" />
          <span className="text-slate-600">Lab</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200" />
          <span className="text-slate-600">Tutorial</span>
        </div>
      </div>

    </div>
  );
}