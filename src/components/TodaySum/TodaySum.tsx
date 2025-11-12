import React from "react";


const TodaySum = () => {
  const sum = [
    { id: 1, time: "Completed", num: 3, initials: "consolation" },
    { id: 2, time: "Completed", num: 3, initials: "consolation" },

    { id: 3, time: "Completed", num: 3, initials: "consolation" },
  ];
  return (
    <>
      <div className="bg-white shadow-md rounded-2xl p-5">
        <h1 className="text-[18px] my-2">Today Summary</h1>
        <div className="space-y-3">
          {sum.map((summary) => (
            <div
              key={summary.id}
              className="flex justify-between items-center border border-gray-200 rounded-xl p-3 hover:shadow-sm transition"
            >
              <div className="flex flex-col  items-center ">
                <h1>{summary.time}</h1>
                <h1>{summary.num}</h1>
                <p>{summary.initials}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
     
    </>
  );
};

export default TodaySum;
