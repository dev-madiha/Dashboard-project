import React from "react";
import { ClockIcon } from "lucide-react";

const ConsoltantyHis = () => {
  const history = [
    {
      id: 1,
      name: "John Doe",
      waiting: "5 min",
      date: "2025-10-09",
      desc: "Patient presents with runny nose, sore throat. Advised rest and hydration.",
      initials: "JD",
    },
    {
      id: 2,
      name: "Sarah Smith",
      waiting: "10 min",
      date: "2025-10-08",
      desc: "Complains of mild fever and fatigue. Recommended fluids and rest.",
      initials: "SS",
    },
    {
      id: 3,
      name: "Michael Johnson",
      waiting: "2 min",
      date: "2025-10-07",
      desc: "Patient reports mild cough. Prescribed cough syrup.",
      initials: "MJ",
    },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <div className="mb-2 sm:mb-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Consultation History</h1>
          <p className="text-sm text-gray-500">Total: {history.length} consultations</p>
        </div>
        <button className="text-sm text-indigo-600 font-medium hover:underline">
          Export Record
        </button>
      </div>

      {/* History Cards */}
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Left Section */}
            <div className="flex items-start md:items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full font-semibold text-lg">
                {item.initials}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-gray-900 text-lg">{item.name}</h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <ClockIcon size={16} className="text-gray-500" />
                  <span>Waiting: {item.waiting}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{item.date}</span>
                </div>
                <p className="text-gray-700 text-sm md:text-base">{item.desc}</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-end">
              <button className="w-full md:w-auto bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-700 hover:text-white text-sm font-medium px-4 py-2 rounded-xl transition">
                Common Cold
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsoltantyHis;
