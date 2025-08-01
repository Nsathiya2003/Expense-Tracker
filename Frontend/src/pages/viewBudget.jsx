import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft,ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { useCustomMutation, useCustomQuery } from '../api/apiServices/customFunction';
import { deleteBudget, getAllBudget } from '../api/apiServices/userService';
import { ToastContainer,toast } from 'react-toastify';
import { useLocation} from 'react-router-dom';


export default function ViewBudget() {
  const navigate = useNavigate();
  // Dummy data
  const { data : budgetData, isLoading,isError,error,refetch} = useCustomQuery({
    fetchfn: getAllBudget,
    key :['budget']
  })
  //re-fetch the data dynamically on each page
  const handleClick = () => {
    navigate('/addBudget');
  };
  const location = useLocation();
  useEffect(()=>{
      if(location.state?.shouldRefetch){
        console.log("refetch will created")
        refetch();
        window.history.replaceState({},document.title);
      }
  },[location.state])

  const expenses = Array.isArray(budgetData?.data) ? budgetData.data : [];

  // Pagination logic
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const currentData = expenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

   const deleteMutation = useCustomMutation({
    mutatefn: deleteBudget,
    invalidateKey: ['budget'], // 👈 this is the magic
  });



  const handleEdit = (item) => {
    console.log("item----",item);
    navigate(`/addBudget/${item?.id || ''}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
     <>
      <div className="min-h-screen bg-zinc-900 text-white px-4 py-8 flex flex-col items-center">
        {/* Header */}
        <div className="w-full max-w-6xl flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-400">🧾 Manage Budgets</h2>
          <button
            onClick={handleClick}
            className="bg-green-700 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg transition cursor-pointer"
          >
            + Add Budget
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <p className="text-gray-300">Loading budgets...</p>
        ) : isError ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : currentData.length === 0 ? (
          <div className="text-gray-400 mt-10">No budgets found.</div>
        ) : (
          <>
            <div className="w-full max-w-6xl overflow-x-auto rounded-xl shadow-lg border border-gray-700">
              <table className="min-w-[900px] w-full table-auto bg-zinc-800">
                <thead className="bg-zinc-700">
                  <tr>
                    {['Category','Month', 'Amount','Spent','Remaining','Actions'].map((header, i) => (
                      <th key={i} className="px-5 py-3 text-sm font-bold text-white uppercase text-left tracking-wide">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-600">
                  {currentData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-zinc-700 transition">
                      <td className="px-5 py-3 text-sm">{item.category?.name || '—'}</td>
                      <td className="px-5 py-3 text-sm">{item.month}</td>
                      <td className="px-5 py-3 text-sm">{item.amount}</td>
                      <td className="px-5 py-3 text-sm">{item.spent}</td>
                      <td className="px-5 py-3 text-sm">{item.remaining}</td>
                      {/* <td className="px-5 py-3 text-sm">
                        {item.date ? new Date(item.date).toLocaleDateString() : '—'}
                      </td> */}
                      {/* <td className="px-5 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'ACTIVE'
                              ? 'bg-green-600 text-white'
                              : 'bg-red-600 text-white'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td> */}
                      <td className="px-5 py-3 text-sm flex gap-3">
                        <button onClick={() => handleEdit(item)} className="text-blue-400 hover:text-blue-300  cursor-pointer">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300  cursor-pointer">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-full ${
                  currentPage === 1
                    ? 'bg-zinc-700 text-gray-400 cursor-not-allowed'
                    : 'bg-zinc-700 text-white hover:bg-zinc-600'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 rounded-full ${
                    currentPage === i + 1
                      ? 'bg-green-600 text-white font-bold'
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
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
