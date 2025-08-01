import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const ChartData = [
  { month: "Jan", income: 5000, expense: 3000 },
  { month: "Feb", income: 7000, expense: 3500 },
  { month: "Mar", income: 6500, expense: 4000 },
  { month: "Apr", income: 6500, expense: 2500 },
  { month: "May", income: 10000, expense: 7000 },
  { month: "Jun", income: 9000, expense: 3000 },
    { month: "Jan", income: 5000, expense: 3000 },
  { month: "Feb", income: 7000, expense: 3500 },
  { month: "Mar", income: 6500, expense: 4000 },
  { month: "Apr", income: 6500, expense: 2500 },
  { month: "May", income: 10000, expense: 7000 },
  { month: "Jun", income: 9000, expense: 3000 },
];

export default function BarChartComponent() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(ChartData);
  }, []);

  return (
    <div className="w-[95%] h-[260px] p-4 bg-zinc-800 shadow rounded-xl ml-8">
      {/* Title */}
      <div className="mb-2">
        <h2 className="text-white text-base font-medium">
          Income vs Expense Overview
        </h2>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
        >
          <CartesianGrid stroke="#3f3f46" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#d4d4d8" fontSize={12} />
          <YAxis stroke="#d4d4d8" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              borderColor: "#52525b",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#f4f4f5" }}
            itemStyle={{ color: "#e4e4e7" }}
          />

          <Bar
            dataKey="income"
            fill="#4ade80"
            barSize={14}
            radius={[2, 2, 0, 0]}
            animationDuration={800}
          />
          <Bar
            dataKey="expense"
            fill="#60a5fa"
            barSize={14}
            radius={[2, 2, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
