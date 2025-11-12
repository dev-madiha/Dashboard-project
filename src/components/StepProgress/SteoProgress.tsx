

import React from "react";
import { useLocation } from "react-router-dom";

const StepProgress = () => {
  const { pathname } = useLocation();

  const steps = [
    { id: 1, name: "Voucher", path: "/consultation-flow" },
    { id: 2, name: "Details", path: "/consultation-flow/details" },
    { id: 3, name: "Consultation", path: "/consultation-flow/consultation" },
  ];

  const currentIndex = steps.findIndex((step) => step.path === pathname);
  
  return (
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 mb-10">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all duration-300 ${
              index <= currentIndex
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step.id}
          </div>

          <span
            className={`mx-2 text-xs sm:text-sm font-medium ${
              index <= currentIndex ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {step.name}
          </span>

          {index < steps.length - 1 && (
            <div
              className={`w-8 sm:w-10 h-[2px] rounded-full transition-all duration-300 ${
                index < currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
