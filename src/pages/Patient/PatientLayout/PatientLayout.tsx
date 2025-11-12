import React from "react";
import StepProgress from "../../../components/StepProgress/SteoProgress";
import { Outlet } from "react-router-dom";


const PatientLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-5xl   ">
        <StepProgress />
        <Outlet />
      </div>
    </div>
  );
  
};
export default PatientLayout;
