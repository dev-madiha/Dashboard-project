import React from "react";
import Chart from "react-apexcharts";

const AvgDuration = () => {
  // ✅ All hardcoded chart data in JSON format
  const chartJSON = `
  {
    "title": "Average Duration",
    "description": "Consultation duration per day (minutes)",
    "options": {
      "chart": {
        "type": "line",
        "toolbar": { "show": false },
        "zoom": { "enabled": false }
      },
      "stroke": {
        "curve": "smooth",
        "width": 2
      },
      "markers": {
        "size": 6,
        "colors": ["#A855F7"],
        "strokeColors": "#fff",
        "strokeWidth": 2,
        "hover": { "size": 8 }
      },
      "grid": {
        "borderColor": "#E5E7EB",
        "strokeDashArray": 4
      },
      "dataLabels": { "enabled": false },
      "xaxis": {
        "categories": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "labels": {
          "style": {
            "colors": "#6B7280",
            "fontSize": "13px"
          }
        }
      },
      "yaxis": {
        "min": 0,
        "max": 1000,
        "tickAmount": 5,
        "labels": {
          "style": {
            "colors": "#6B7280",
            "fontSize": "13px"
          }
        }
      },
      "tooltip": {
        "y": {
          "formatter": "(val) => val + ' mins'"
        }
      },
      "colors": ["#22C55E"]
    },
    "series": [
      {
        "name": "Duration",
        "data": [400, 500, 450, 300, 500, 600, 550]
      }
    ]
  }`;

  // ✅ Parse JSON string to object
  const chartData = JSON.parse(chartJSON);
  const options = chartData.options;
  const series = chartData.series;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">
        {chartData.title}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {chartData.description}
      </p>

      <div className="h-[300px]">
        <Chart
          options={options}
          series={series}
          type="line"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default AvgDuration;
