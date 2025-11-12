import Chart from "react-apexcharts";

export default function MonthlyTarget() {
  const chartData = {
    title: "Voucher Status",
    subtitle: "Current distribution",
    vouchers: [
      { label: "Active", value: 1389, color: "#4F46E5" },
      { label: "Redeemed", value: 1290, color: "#8B5CF6" },
      { label: "Expired", value: 100, color: "#9CA3AF" },
    ],
  };

  const series = chartData.vouchers.map((v) => v.value);
  const labels = chartData.vouchers.map((v) => v.label);
  const colors = chartData.vouchers.map((v) => v.color);

  const options = {
    chart: {
      type: "donut",
      height: 300,
    },
    labels,
    colors,
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      colors: ["#fff"],
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: string) => val + " vouchers",
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-800">
        {chartData.title}
      </h3>
      <p className="text-sm text-gray-500 mb-4">{chartData.subtitle}</p>

      <div className="flex flex-col items-center justify-center">
        <Chart options={options} series={series} type="donut" height={250} width={250} />
      </div>

      
      <div className="mt-6 space-y-2">
        {chartData.vouchers.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-gray-600 text-sm">{item.label}</span>
            </div>
            <span className="text-gray-800 font-medium text-sm">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
