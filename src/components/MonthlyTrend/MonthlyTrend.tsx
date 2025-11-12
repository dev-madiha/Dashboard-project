import React from "react";
import Chart from "react-apexcharts";

const MontlyTrend = () => {
  const chartJSON = `
  {
    "options": {
      "chart": {
        "type": "area",
        "toolbar": { "show": false },
        "zoom": { "enabled": false }
      },
      "stroke": {
        "curve": "smooth",
        "width": 2
      },
      "dataLabels": { "enabled": false },
      "fill": {
        "type": "gradient",
        "gradient": {
          "shadeIntensity": 1,
          "opacityFrom": 0.4,
          "opacityTo": 0.1,
          "stops": [0, 90, 100]
        }
      },
      "grid": {
        "borderColor": "#E5E7EB",
        "strokeDashArray": 4
      },
      "legend": {
        "position": "bottom",
        "horizontalAlign": "center",
        "fontSize": "13px",
        "labels": { "colors": "#6B7280" },
        "markers": { "radius": 12 }
      },
      "xaxis": {
        "categories": [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        "labels": {
          "style": {
            "colors": "#6B7280",
            "fontSize": "13px"
          }
        },
        "axisBorder": { "show": false },
        "axisTicks": { "show": false }
      },
      "yaxis": {
        "min": 0,
        "max": 10000,
        "tickAmount": 5,
        "labels": {
          "style": {
            "colors": "#6B7280",
            "fontSize": "13px"
          }
        }
      },
      "colors": ["#A855F7", "#3B82F6"]
    },
    "series": [
      {
        "name": "Generated",
        "data": [2000, 4500, 7000, 6500, 5000, 4000, 5200, 6000, 4800, 5500, 7200, 8500]
      },
      {
        "name": "Redeemed",
        "data": [1800, 4800, 6800, 6200, 5500, 4500, 6000, 6200, 5200, 5800, 6500, 8000]
      }
    ]
  }
  `;

  const chartData = JSON.parse(chartJSON);
  const options = chartData.options;
  const series = chartData.series;

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-6 my-6">
        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm w-full">
            <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Monthly Trends
                </h3>
                <p className="text-sm text-gray-500">
                  Vouchers generated vs redeemed
                </p>
              </div>
              <div className="relative">
                <select className="border border-gray-300 rounded-lg text-sm px-3 py-1 text-gray-700 focus:outline-none">
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>
              </div>
            </div>

          
            <div className="h-[320px] w-full">
              <Chart
                options={options}
                series={series}
                type="area"
                height="100%"
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MontlyTrend;
