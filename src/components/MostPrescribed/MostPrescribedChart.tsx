import React from "react";
import Chart from "react-apexcharts";

const MostPrescribedChart = () => {
  const chartJSON = `
  {
    "title": "Most Prescribed Medications",
    "description": "Top 8 medications by prescription count",
    "options": {
      "chart": { "type": "bar", "toolbar": { "show": false } },
      "plotOptions": {
        "bar": {
          "horizontal": true,
          "borderRadius": 6,
          "barHeight": "60%"
        }
      },
      "colors": ["#EC4899", "#22C55E", "#F59E0B", "#3B82F6", "#A855F7", "#84CC16"],
      "dataLabels": { "enabled": false },
      "grid": {
        "borderColor": "#E5E7EB",
        "strokeDashArray": 4
      },
      "xaxis": {
        "categories": [
          "Metformin",
          "Amoxicillin",
          "Amlodipine",
          "Paracetamol",
          "Cetirizine",
          "Omeprazole"
        ],
        "labels": { "style": { "colors": "#6B7280" } }
      },
      "yaxis": { "labels": { "style": { "colors": "#6B7280" } } }
    },
    "series": [
      {
        "name": "Prescriptions",
        "data": [10000, 5000, 8000, 9500, 7500, 6500]
      }
    ]
  }`;

 
  const chartData = JSON.parse(chartJSON);
  const { title, description, options, series } = chartData;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default MostPrescribedChart;
