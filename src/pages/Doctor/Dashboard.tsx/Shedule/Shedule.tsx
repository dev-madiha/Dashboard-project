import React from "react";
import { CalendarDays } from "lucide-react";

const Shedule = () => {
  const schedule = [
    { id: 1, title: "Monday", hours: "5 hrs" },
    { id: 2, title: "Tuesday", hours: "4 hrs" },
    { id: 3, title: "Wednesday", hours: "6 hrs" },
    { id: 4, title: "Thursday", hours: "3 hrs" },
  ];

  const weeks = [
    { id: 1, day: "Monday", time: "08:00 - 18:00", patients: "15 patients", button: "Available" },
    { id: 2, day: "Tuesday", time: "08:00 - 18:00", patients: "12 patients", button: "Available" },
    { id: 3, day: "Wednesday", time: "08:00 - 18:00", patients: "18 patients", button: "Available" },
    { id: 4, day: "Thursday", time: "08:00 - 18:00", patients: "10 patients", button: "Available" },
    { id: 5, day: "Friday", time: "08:00 - 18:00", patients: "14 patients", button: "Available" },
    { id: 6, day: "Saturday", time: "09:00 - 14:00", patients: "7 patients", button: "Available" },
    { id: 7, day: "Sunday", time: "Off Day", patients: "-", button: "Unavailable" },
  ];

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <CalendarDays size={20} className="text-blue-600" />
          Weekly Schedule
        </h2>
        <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-xl mt-2 sm:mt-0">
          Schedule
        </span>
      </div>

      <p className="text-gray-500 text-sm mb-6">
        Your weekly consultation schedule overview
      </p>

      {/* Summary Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {schedule.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-4 bg-gray-50 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.title}</h3>
            <span className="text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 mt-2 rounded-lg">
              {item.hours}
            </span>
          </div>
        ))}
      </div>

      {/* Weekly Detail Table */}
      <div className="space-y-3">
        {weeks.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition"
          >
            <div className="flex justify-between w-full sm:w-auto sm:items-center sm:gap-4">
              <h1 className="font-medium text-gray-800 text-base sm:text-lg">{item.day}</h1>
              <p className="text-sm text-gray-600 sm:hidden">{item.time}</p>
            </div>

            <div className="flex justify-between items-center w-full sm:w-auto sm:gap-6 text-sm text-gray-600">
              <p className="hidden sm:block">{item.time}</p>
              <p>{item.patients}</p>
              <button
                className={`px-5 py-1.5 rounded-lg font-medium text-xs sm:text-sm ${
                  item.button === "Unavailable"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {item.button}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shedule;
