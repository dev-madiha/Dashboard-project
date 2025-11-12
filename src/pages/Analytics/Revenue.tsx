import React from "react";
import Chart from "react-apexcharts";

const Revenue = () => {
  // ✅ JSON data object (inside the same file)
  const revenueData = {
    year: 2024,
    months: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    values: [15000, 22000, 30000, 40000, 38000, 45000, 50000, 47000, 52000, 58000, 60000, 59000],
    colors: {
      line: "#F97316",
      gradientTo: "#FDBA74",
      text: "#6B7280",
    },
  };

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: [revenueData.colors.line],
    },
    dataLabels: { enabled: false },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        gradientToColors: [revenueData.colors.gradientTo],
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: revenueData.months,
      labels: {
        style: {
          colors: revenueData.colors.text,
          fontSize: "13px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 15000,
      max: 60000,
      tickAmount: 3,
      labels: {
        formatter: (val) => val.toLocaleString(),
        style: {
          colors: revenueData.colors.text,
          fontSize: "13px",
        },
      },
    },
    colors: [revenueData.colors.line],
    tooltip: {
      y: {
        formatter: (val) => `${val} vouchers`,
      },
    },
  };

  const series = [
    {
      name: "Revenue",
      data: revenueData.values,
    },
  ];

  return (
    <div className="rounded-2xl mt-6 border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Monthly Revenue</h3>
          <p className="text-sm text-gray-500">Revenue trends over the year</p>
        </div>

        <div className="relative">
          <select className="border border-gray-300 rounded-lg text-sm px-3 py-1 text-gray-700 focus:outline-none">
            <option>{revenueData.year}</option>
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>
      </div>

      <div className="h-[320px]">
        <Chart
          options={options}
          series={series}
          type="area"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default Revenue;
