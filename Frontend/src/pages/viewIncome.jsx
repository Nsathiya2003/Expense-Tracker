import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft,ChevronRight, DeleteIcon, EditIcon } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteIncome, getAllIncome } from '../api/apiServices/userService';
import { useCustomMutation, useCustomQuery } from '../api/apiServices/customFunction';

export default function ViewIncome() {
  const navigate = useNavigate();

  // Dummy data
  // const data = Array.from({ length: 50 }, (_, i) => ({
  //   category: 'Freelance',
  //   amount: '₹7,500',
  //   method: 'Bank Transfer',
  //   date: '2025-07-12',
  // }));

  const handleSuccess = (res) => {
      toast.success(res?.data?.message,{
            position:'top-center',
            autoClose:3000,
            hideProgressBar:false,
            pauseOnHover:true,
            draggable:false,
            closeOnClick:false,
            // isLoading:true,
            progress:undefined,
            className:'custom-toast'
           })
  }
  const handleError = (error) =>{
    toast.error( toast.error(error?.response?.data?.message,{
            position:'top-center',
            autoClose:3000,
            hideProgressBar:false,
            pauseOnHover:false,
            draggable:false,
            closeOnClick:false,
            // isLoading:true,
            progress:undefined,
            className:'custom-toast'
    }))
  }

 const [currentPage, setCurrentPage] = useState(1);
  const [editItem, setEditItem] = useState(null);

  const queryClient = useQueryClient();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['category'],
    queryFn: getAllIncome,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  

  
  const incomeData = Array.isArray(data?.data) ? data.data : [];
  const itemsPerPage = 8;
  const totalPages = Math.ceil(incomeData.length / itemsPerPage);

  const currentData = incomeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleClick = () => {
    navigate('/addIncome');
  };
  const handleEdit = (item) =>{
    if(item.id){
    navigate(`/addIncome/${item.id}`)
    }
    else{
      navigate('/addIncome')
    }
  }
  
  const deleteMutation = useCustomMutation({
    mutatefn: (editItem) => deleteIncome(editItem),
    onSuccess: (data) =>{
      if(data) {
        console.log("data is----",data);
        console.log("data is----",data?.data);
        toast.success(data?.data?.message || 'Income data deleted successfully')
      }
    },
    successmsg:"Income data deleted successfully",
    key: ['income']
  })
  console.log("deletedMutation------",deleteMutation);

  const handleDelete = (id) =>{
    setEditItem(id)
    deleteMutation.mutate(id);
  }


  return (
    <>
      <div className="min-h-screen bg-zinc-900 text-white px-4 py-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-green-400">💰 Manage Income</h2>
        <button
          onClick={handleClick}
          className="bg-green-700 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition duration-300 cursor-pointer"
        >
          + Add Income
        </button>
      </div>

      {/* Table Container */}
      <div className="w-full max-w-5xl overflow-x-auto rounded-xl shadow-md border border-gray-700">
        <table className="min-w-[900px] w-full table-auto bg-zinc-800 rounded-xl">
          <thead className="bg-zinc-700">
            <tr>
              {['Category', 'Amount', 'Payment Method', 'Date','Description','Status', 'Action'].map((head, i) => (
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
                <td className="px-5 py-4 text-sm text-gray-200">{item.source}</td>
                <td className="px-5 py-4 text-sm text-gray-200">
                  {item.date ? new Date(item.date).toLocaleDateString():'-'}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-200">{item.description}</td>
                  <td className="px-5 py-4 text-sm text-gray-200">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'ACTIVE'
                              ? 'bg-green-600 text-white'
                              : 'bg-red-600 text-white'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

               <td className="px-5 py-4 flex gap-2">
                        <button
                          className="text-blue-400 hover:text-blue-300"
                          onClick={() => handleEdit(item)}
                          title="Edit"
                        >
                          <EditIcon size={18} />
                        </button>
                        <button
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                        >
                          <DeleteIcon size={18} />
                        </button>
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
    <ToastContainer/>
    </>
  
  );
}
