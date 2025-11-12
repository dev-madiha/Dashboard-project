import React from "react";
import Chart from "react-apexcharts";

const PrescriptionTrendsChart = () => {
    
  const chartJSON = `
  {
    "options": {
      "chart": {
        "type": "area",
        "toolbar": { "show": false },
        "zoom": { "enabled": false }
      },
      "stroke": { "curve": "smooth", "width": 3 },
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
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        "labels": {
          "style": { "colors": "#6B7280", "fontSize": "13px" }
        },
        "axisBorder": { "show": false },
        "axisTicks": { "show": false }
      },
      "yaxis": {
        "min": 0,
        "max": 10000,
        "tickAmount": 5,
        "labels": {
          "style": { "colors": "#6B7280", "fontSize": "13px" }
        }
      },
      "colors": ["#A855F7", "#22C55E"],
      "tooltip": {
        "shared": true,
        "intersect": false,
        "y": { "formatter": "(val) => val + ' prescriptions'" }
      }
    },
    "series": [
      {
        "name": "Avg per Consultation",
        "data": [3000, 4200, 5000, 5800, 5200, 4300, 4600, 7000, 8200, 9000, 8600, 9800]
      },
      {
        "name": "Total Prescriptions",
        "data": [2500, 3800, 4600, 5200, 4900, 4000, 4300, 6800, 7800, 8600, 8300, 9500]
      }
    ]
  }
  `;


  const chartData = JSON.parse(chartJSON);
  const options = chartData.options;
  const series = chartData.series;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Prescription Trends
          </h3>
          <p className="text-sm text-gray-500">
            Monthly prescription volume and average per consultation
          </p>
        </div>
        <div>
          <select className="border border-gray-300 rounded-lg text-sm px-3 py-1 text-gray-700 focus:outline-none">
            <option>2024</option>
            <option>2023</option>
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

export default PrescriptionTrendsChart;
