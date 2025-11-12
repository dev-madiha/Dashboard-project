import React from "react";
import DoctorMetrics from "../../../../components/DoctorMetrics/DoctorMetrics";
import PatientQueue from "../../../../components/Patientqueue/PatientQueue";
import TodaySum from "../../../../components/TodaySum/TodaySum";
import AvgDuration from "../../../../components/AvgDuration/AvgDuration";
import WeekyCons from "../../../../components/WeeklyCons/WeeklyCons";
import RecentCons from "../../../../components/RecentCons/RecentCons";

const DocDashboard = () => {
  return (
    <div>
      <DoctorMetrics />

      <div className="grid my-6 grid-cols-12 gap-6 items-stretch">
        <div className="col-span-12 xl:col-span-8">
          <PatientQueue />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <TodaySum />
        </div>
      </div>

      <div className="grid my-6 grid-cols-12 gap-6 items-stretch">
        <div className="col-span-12 xl:col-span-6">
          <WeekyCons />{" "}
        </div>
        <div className="col-span-12 xl:col-span-6">
          <AvgDuration />
        </div>
      </div>

      <RecentCons/>
    </div>
  );
};

export default DocDashboard;
