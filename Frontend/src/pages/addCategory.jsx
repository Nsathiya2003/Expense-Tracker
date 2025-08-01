import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useCustomMutation } from '../api/apiServices/customFunction';
import {
  addCategory,
  getCategoryById,
  updateCategory,
} from '../api/apiServices/userService';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCategory({ open, onClose, updatedData }) {
  const isEditMode = Boolean(updatedData?.id || updatedData?._id);
  const [data, setData] = useState({ name: '', description: '' });

  const resetForm = () => {
    setData({ name: '', description: '' });
  };

  useEffect(() => {
    resetForm();

    if (open && isEditMode) {
      const fetchCategory = async () => {
        try {
          const res = await getCategoryById(updatedData.id || updatedData._id);
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

  // Add Mutation
  const addCategoryMutation = useCustomMutation({
    mutatefn: addCategory,
    resetfn: () => {
      resetForm();
      onClose();
    },
    invalidateKey: ['category'],
    onSuccess: (res) => {
      toast.success(res?.data?.message || 'Category added successfully');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to add category');
    },
  });

  // Update Mutation
  const updateCategoryMutation = useCustomMutation({
    mutatefn: ({ id, updatedData }) => updateCategory(id, updatedData),
    resetfn: () => {
      resetForm();
      onClose();
    },
    invalidateKey: ['category'],
    onSuccess: (res) => {
      toast.success(res?.data?.message || 'Category updated successfully');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to update category');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.name.trim()) {
      toast.warn('Category name is required', { position: 'top-center' });
      return;
    }

    if (isEditMode) {
      updateCategoryMutation.mutate({
        id: updatedData.id || updatedData._id,
        updatedData: data,
      });
    } else {
      addCategoryMutation.mutate(data);
    }
  };

  if (!open) return null;

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
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
              placeholder="Description (optional)"
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white resize-none focus:outline-none"
              rows="4"
              onChange={handleChange}
              value={data.description}
            />
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                className="bg-gray-500 cursor-pointer hover:bg-gray-400 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 cursor-pointer hover:bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                {isEditMode ? 'Update Category' : 'Save Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
