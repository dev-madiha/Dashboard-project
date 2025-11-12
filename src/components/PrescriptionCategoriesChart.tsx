import React from "react";
import Chart from "react-apexcharts";

const PrescriptionCategoriesChart = () => {
  // 📊 Chart JSON Data
  const chartJSON = `
  {
    "options": {
      "chart": { "type": "pie" },
      "labels": [
        "Antibiotics",
        "Pain Relief",
        "Vitamins",
        "Allergies",
        "Other",
        "Generic Meds"
      ],
      "colors": [
        "#3B82F6",
        "#22C55E",
        "#F59E0B",
        "#F87171",
        "#9CA3AF",
        "#A855F7"
      ],
      "legend": {
        "position": "bottom",
        "fontSize": "13px",
        "labels": { "colors": "#6B7280" }
      },
      "dataLabels": {
        "enabled": true,
        "style": { "fontSize": "12px" }
      },
      "tooltip": {
        "y": { "formatter": "(val) => val + '%'" }
      }
    },
    "series": [28, 18, 10, 12, 8, 24]
  }
  `;

  // Parse JSON
  const chartData = JSON.parse(chartJSON);
  const options = chartData.options;
  const series = chartData.series;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">
        Prescription Categories
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Distribution by medication type
      </p>

      <Chart options={options} series={series} type="pie" height={300} />
    </div>
  );
};

export default PrescriptionCategoriesChart;
