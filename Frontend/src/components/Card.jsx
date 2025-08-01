import { cardItems } from "../data/cardItems";
import BarChart from "./barChart";
import LatestList from "./latestList";
import { ArrowUpRight } from "lucide-react";

export default function Card() {
  return (
    <>
      <div className="flex flex-wrap gap-4 pl-8 p-2">
        {cardItems && cardItems.length > 0 ? (
          cardItems.map((item, index) => {
            const Icon = item.icon;

            // Color mapping for icons & trend badges
            const colorMap = {
              green: {
                iconBg: "bg-green-950",
                text: "text-green-400",
                tagBg: "bg-green-950",
              },
              rose: {
                iconBg: "bg-rose-950",
                text: "text-rose-400",
                tagBg: "bg-rose-950",
              },
              blue: {
                iconBg: "bg-blue-950",
                text: "text-blue-400",
                tagBg: "bg-blue-950",
              },
              yellow: {
                iconBg: "bg-yellow-950",
                text: "text-yellow-400",
                tagBg: "bg-yellow-950",
              },
              default: {
                iconBg: "bg-gray-700",
                text: "text-white",
                tagBg: "bg-gray-700",
              },
            };

            const trendColors = colorMap[item.trendColor] || colorMap.default;

            return (
              <div
                key={index}
                className="bg-zinc-800 w-[340px] h-[150px] rounded-xl p-5 shadow text-white hover:scale-105 transition-transform"
              >
                {/* Top Section: Name & Icon */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.subtitle}</p>
                  </div>
                  <div className={`rounded-full p-3 ${trendColors.iconBg}`}>
                    <Icon className={`w-10 h-10 ${trendColors.text}`} />
                  </div>
                </div>

                {/* Bottom Section: Amount & Trend */}
                <div className="flex items-end justify-between mt-6">
                  <span className={`text-3xl font-bold ${trendColors.text}`}>
                    ₹{item.amount.toLocaleString()}
                  </span>
                  {/* Trend Tag */}
                  <div
                    className={`flex items-center gap-1 ${trendColors.tagBg} ${trendColors.text} px-2 py-1 rounded-md text-sm`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{item.trend}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-white">No card data found</p>
        )}
      </div>

      {/* Charts */}
      <div className="space-y-4">
        <BarChart />
        <LatestList />
      </div>
    </>
  );
}
