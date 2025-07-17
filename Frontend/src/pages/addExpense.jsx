import { useState } from "react";

export default function AddExpense() {
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
          ➕ Add Expense Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label className="block text-sm mb-2 text-white">Source</label>
              <input
                type="text"
                name="source"
                placeholder="e.g. UPI, Bank"
                onChange={handleChange}
                value={data.source}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2 text-white">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Details about income"
                onChange={handleChange}
                value={data.description}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none"
              />
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
          </div>

          {/* RIGHT SIDE - FILE UPLOAD */}
          <div>
            <label className="block text-sm mb-2 text-white">Upload Proof (Image/PDF)</label>
           <div className="flex items-center justify-center h-[220px] bg-zinc-700 rounded-lg relative cursor-pointer">
  <label
    htmlFor="proof"
    className="flex flex-col items-center justify-center text-green-400 text-4xl cursor-pointer"
  >
    +
    <span className="text-sm text-gray-400 mt-2">Upload Proof</span>
  </label>

  <input
    id="proof"
    type="file"
    name="proof"
    accept=".jpg,.jpeg,.png,.pdf"
    onChange={handleChange}
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
  />
</div>

            {data.proof && (
              <p className="text-green-400 text-sm mt-2">
                📎 {data.proof.name}
              </p>
            )}
             <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            💾 Save Expense
          </button>
        </div>
          </div>
          
        </div>

        {/* SAVE BUTTON */}
       
      </form>
    </div>
  );
}
