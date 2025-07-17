import { useState } from "react";

export default function AddBudget() {
  const [data, setData] = useState({
    category: '',
    amount: '',
    source: '',
    description: '',
    date: '',
    proof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'proof') {
      setData((prev) => ({ ...prev, proof: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", data);
    // You can handle proof file here using FormData
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-5xl"
      >
        <h2 className="text-2xl font-semibold text-green-400 mb-8 text-center">
          ➕ Add Budget Details
        </h2>

        <div className="grid  md:grid-cols-2 ml-80 ">
          {/* LEFT SIDE - INPUT FIELDS */}
          <div>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-white">Category</label>
              <select
                name="category"
                onChange={handleChange}
                value={data.category}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none"
              >
                <option value="">Select Category</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investments">Investments</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2 text-white">Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                onChange={handleChange}
                value={data.amount}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2 text-white">Month</label>
              <select
                name="category"
                onChange={handleChange}
                value={data.category}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none"
              >
                <option value="">Choose Month</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investments">Investments</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2 text-white">Date</label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                value={data.date}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none"
              />
            </div>
            <button
            type="submit"
            className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-8 mx-14 rounded-lg transition duration-300"
          >
            💾 Save Budget
          </button>
          </div>

        </div>       
      </form>
    </div>
  );
}
