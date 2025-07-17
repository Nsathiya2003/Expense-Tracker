import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2 as DeleteIcon, Pencil as EditIcon } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategory, deleteCategory } from '../api/apiServices/userService';
import AddCategory from './addCategory';
import { toast } from 'react-toastify';

export default function ViewCategory() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editItem, setEditItem] = useState(null);

  const queryClient = useQueryClient();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['category'],
    queryFn: getCategory,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const categoryData = Array.isArray(data?.data) ? data.data : [];
  const itemsPerPage = 8;
  const totalPages = Math.ceil(categoryData.length / itemsPerPage);

  const currentData = categoryData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowPopup(true);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (res) => {
      toast.success(res?.message || 'Deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['category'] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to delete');
    }
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-900 text-white px-4 py-8 flex flex-col items-center">
        {/* Header */}
        <div className="w-full max-w-5xl flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-green-400">View Categories</h2>
          <button
            onClick={() => {
              setEditItem(null);
              setShowPopup(true);
            }}
            className="bg-green-700 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition duration-300 cursor-pointer"
          >
            + Add Category
          </button>
        </div>

        {/* Loading / Error */}
        {isLoading && <p className="text-white">Loading...</p>}
        {isError && <p className="text-red-400">Error: {error.message}</p>}

        {!isLoading && !isError && (
          <>
            {/* Table */}
            <div className="w-full max-w-5xl overflow-x-auto rounded-xl shadow-md border border-gray-700">
              <table className="min-w-[900px] w-full table-auto bg-zinc-800 rounded-xl">
                <thead className="bg-zinc-700">
                  <tr>
                    {['Name', 'Description', 'Created At', 'Status', 'Action'].map((head, i) => (
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
                      <td className="px-5 py-4 text-sm text-gray-200">{item.name}</td>
                      <td className="px-5 py-4 text-sm text-gray-200">{item.description}</td>
                      <td className="px-5 py-4 text-sm text-gray-200">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
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
                          onClick={() => handleDelete(item._id || item.id)}
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
                <ChevronLeft className="w-5 h-8" />
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
                <ChevronRight className="w-5 h-8" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal for Add / Edit */}
      <AddCategory
        open={showPopup}
        onClose={() => {
          setShowPopup(false);
          setEditItem(null); // Clear form on close
        }}
        updatedData={editItem}
      />
    </>
  );
}
