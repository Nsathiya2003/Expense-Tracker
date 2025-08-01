export default function LatestList() {
  const latestTransactions = [
    { category: "Salary", date: "2025-07-08", amount: "+ ₹15,000", type: "Income", method: "UPI" },
    { category: "Groceries", date: "2025-07-07", amount: "- ₹1,200", type: "Expense", method: "Cash" },
    { category: "Freelance", date: "2025-07-06", amount: "+ ₹4,500", type: "Income", method: "Bank" },
  ];

  const latestExpenses = [
    { category: "Electricity", date: "2025-07-08", amount: "₹2,000", method: "UPI" },
    { category: "Travel", date: "2025-07-07", amount: "₹800", method: "Card" },
  ];

  return (
    <div className="w-[94%] bg-zinc-800 m-auto p-6 rounded-xl shadow-md text-white">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Income & Expenses */}
        <div className="w-full lg:w-1/2 bg-zinc-700 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
            💰 Latest Transactions
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-zinc-600 text-gray-300">
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Method</th>
                </tr>
              </thead>
              <tbody>
                {latestTransactions.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-zinc-600 ${
                      index % 2 === 0 ? "bg-zinc-600/20" : ""
                    } hover:bg-zinc-600/40 transition-colors`}
                  >
                    <td className="py-2">{item.category}</td>
                    <td className="text-gray-300">{item.date}</td>
                    <td className={item.type === "Income" ? "text-green-400 font-medium" : "text-rose-400 font-medium"}>
                      {item.amount}
                    </td>
                    <td className="text-gray-300">{item.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side - Only Expenses */}
        <div className="w-full lg:w-1/2 bg-zinc-700 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
            🧾 Latest Expenses
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-zinc-600 text-gray-300">
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Method</th>
                </tr>
              </thead>
              <tbody>
                {latestExpenses.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-zinc-600 ${
                      index % 2 === 0 ? "bg-zinc-600/20" : ""
                    } hover:bg-zinc-600/40 transition-colors`}
                  >
                    <td className="py-2">{item.category}</td>
                    <td className="text-gray-300">{item.date}</td>
                    <td className="text-green-400 font-medium">{item.amount}</td>
                    <td className="text-gray-300">{item.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
