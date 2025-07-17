import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategory, getCategoryById, updateCategory } from '../api/apiServices/userService';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCategory({ open, onClose, updatedData }) {
  const queryClient = useQueryClient();
  const isEditMode = Boolean(updatedData?.id || updatedData?._id);

  const [data, setData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    setData({ name: '', description: '' });

    if (open && isEditMode) {
      const fetchCategory = async () => {
        try {
          const res = await getCategoryById(updatedData?.id || updatedData?._id);
          const category = res?.data;
          setData({
            name: category?.name || '',
            description: category?.description || '',
          });
        } catch (err) {
          toast.error('Failed to fetch category data');
        }
      };
      fetchCategory();
    }
  }, [open, isEditMode, updatedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSuccess = (res) => {
    toast.success(res?.message || 'Success', {
      position: 'top-center',
      autoClose: 3000,
    });
    queryClient.invalidateQueries({ queryKey: ['category'] });
    setData({ name: '', description: '' });
    onClose();
  };

  const handleError = (err) => {
    toast.error(err?.response?.data?.message || 'Something went wrong', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const addMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) => updateCategory(id, updatedData),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name.trim()) {
      toast.warn('Category name is required', { position: 'top-center' });
      return;
    }

    if (isEditMode) {
      updateMutation.mutate({
        id: updatedData.id || updatedData._id,
        updatedData: data,
      });
    } else {
      addMutation.mutate(data);
    }
  };

  if (!open) return null;

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-zinc-800 p-8 rounded-xl w-full max-w-md shadow-lg">
          <h2 className="text-white text-2xl font-bold mb-4">
            {isEditMode ? 'Edit Category' : 'Add Category'}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none"
              onChange={handleChange}
              value={data.name}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white resize-none focus:outline-none"
              rows="4"
              onChange={handleChange}
              value={data.description}
            />
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  setData({ name: '', description: '' });
                  onClose();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                {isEditMode ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
