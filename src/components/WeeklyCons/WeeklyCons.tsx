import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useState } from "react";

export default function WeekyCons() {
  // ✅ All chart and UI data moved to JSON
  const weeklyConsData = {
    title: "Weekly Consultation",
    description: "Number of consultations per day",
    colors: ["#8B5CF6", "#3B82F6"], // purple, blue
    xAxisCategories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [
      {
        name: "Online Sales",
        data: [120, 300, 200, 400, 250, 180, 300],
      },
      {
        name: "In-Store Sales",
        data: [150, 250, 180, 350, 200, 220, 270],
      },
    ],
    dropdownItems: [
      { label: "View More" },
      { label: "Delete" },
    ],
  };

  // ✅ Use JSON values in chart config
  const options: ApexOptions = {
    colors: weeklyConsData.colors,
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: weeklyConsData.xAxisCategories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    grid: {
      yaxis: { lines: { show: true } },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: { formatter: (val: number) => `${val}` },
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {weeklyConsData.title}
          </h3>
          <p className="text-sm text-gray-500">{weeklyConsData.description}</p>
        </div>

        <div className="relative inline-block">
          <button onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>

          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            {weeklyConsData.dropdownItems.map((item, index) => (
              <DropdownItem
                key={index}
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                {item.label}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 xl:min-w-full pl-2">
          <Chart
            options={options}
            series={weeklyConsData.series}
            type="bar"
          />
        </div>
      </div>
    </div>
  );
}
