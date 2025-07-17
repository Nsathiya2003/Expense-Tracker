import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft,ChevronRight } from 'lucide-react';

export default function ViewBudget() {
  const navigate = useNavigate();

  // Dummy data
  const allData = Array.from({ length: 50 }, (_, i) => ({
    category: 'Freelance',
    amount: '₹7,500',
    method: 'JAN',
    date: '2025-07-12',
  }));

  // Pagination logic
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allData.length / itemsPerPage);

  const currentData = allData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClick = () => {
    navigate('/addBudget');
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-green-400">🧾 Manage Budget</h2>
        <button
          onClick={handleClick}
          className="bg-green-700 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition duration-300 cursor-pointer"
        >
          + Add Budget
        </button>
      </div>

      {/* Table Container */}
      <div className="w-full max-w-5xl overflow-x-auto rounded-xl shadow-md border border-gray-700">
        <table className="min-w-[900px] w-full table-auto bg-zinc-800 rounded-xl">
          <thead className="bg-zinc-700">
            <tr>
              {['Category','Amount','Month', 'Date', 'Action'].map((head, i) => (
                <th
                  key={i}
                  className="text-left px-5 py-3 text-sm font-semibold text-white uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-600">
            {currentData.map((item, idx) => (
              <tr key={idx} className="hover:bg-zinc-600 transition">
                <td className="px-5 py-4 text-sm text-gray-200">{item.category}</td>
                <td className="px-5 py-4 text-sm text-gray-200">{item.amount}</td>
                <td className="px-5 py-4 text-sm text-gray-200">{item.method}</td>
                <td className="px-5 py-4 text-sm text-gray-200">{item.date}</td>
                <td className="px-5 py-4">
                  <button className="text-blue-400 hover:text-blue-300 mr-4">Edit</button>
                  <button className="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination UI */}
      <div className="mt-6 flex items-center gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-full ${
            currentPage === 1 ? 'bg-zinc-700 text-gray-400 cursor-not-allowed' : 'bg-zinc-700 text-white hover:bg-zinc-600'
          }`}
        >
          <ChevronLeft className='w-5 h-8' />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded-full ${
              currentPage === i + 1
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-zinc-700 text-white hover:bg-zinc-600'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-full ${
            currentPage === totalPages
              ? 'bg-zinc-700 text-gray-400 cursor-not-allowed'
              : 'bg-zinc-700 text-white hover:bg-zinc-600'
          }`}
        >
          <ChevronRight className='w-5 h-8' />
        </button>
      </div>
    </div>
  );
}
