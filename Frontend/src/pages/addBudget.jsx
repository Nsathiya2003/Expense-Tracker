import { useQueryClient} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  addBudget,
  getBudgetById,
  getCategory,
  updateBudget,
} from "../api/apiServices/userService";
import {
  useCustomMutation,
  useCustomQuery,
} from "../api/apiServices/customFunction";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ArrowBigLeft, ChevronLeft } from "lucide-react";


export default function AddBudget() {
  const [data, setData] = useState({
      category: "",
      amount: "",
      date: "",
      month:''
    });
    const [error, setError] = useState({});
    const fileInputRef = useRef(null);
  
    const resetForm = () => {
      setData({
        category: "",
        amount: "",
        month: "",
        date: "",
      });
    };
  
    const navigate = useNavigate();
  
    const { id } = useParams();
    const queryClient = useQueryClient();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
          setData((prev) => ({
          ...prev,
          [name]: value,
        }));
  
        // Clear error for text fields like category, amount, etc.
        if (error?.[name]) {
          setError((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            if (value.trim() !== "") {
              delete updatedErrors[name];
            }
            return updatedErrors;
          });
        }
    };
  
    //Get all categories
    const { data: category, isLoading: loadingCategories } = useCustomQuery({
      key: "Categories",
      fetchfn: getCategory,
    });
  
    // Create and update the income
   const createBudgetMutation = useCustomMutation({
    mutatefn: ({ id, data }) => {
      return id ? updateBudget(id, data) : addBudget(data);
    },
    resetfn: resetForm,
    navigate,
    navigatePath: '/budget',
    invalidateKey: ['budgets'] // or whatever key you used in useQuery()
  });

  
    // Get Income by id
    const { data: income } = useCustomQuery({
      key: ["budget", id],
      fetchfn: () => getBudgetById(id),
      enabled: !!id,
    });
  console.log("budget---",income?.data);
    const validateForm = () => {
      const newErrors = {};
      console.log("first", data.category);
  
      if (!data.category) {
        console.log("heloo");
        newErrors.category = "Please choose one category";
      }
      if (!data.amount) {
        newErrors.amount = "Amount is required";
      }
      if (!data.month) {
        newErrors.month = "Month is required";
      }
      if (!data.date) {
        newErrors.date = "Please select amount recived dates";
      }
      setError(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
      const payload = {
        ...data,
        category_id: data.category
      }
      console.log("payload",payload);
      if (id) {
        createBudgetMutation.mutate(
          { id, data: payload, resetForm },
          {
            onSuccess: (data) => {
              resetForm();
              // toast.success(data?.message || ( id ? 'Income updated': 'Income added'))
            },
            onError: (error) => {
              console.log("error.message---", error.message);
              toast.error(error?.message);
            },
          }
        );
      } else {
        createBudgetMutation.mutate({ id: null, data: payload });
      }
    };
  
    function converdateFormat(datastr) {
      console.log("datastr---", datastr);
      const date = new Date(datastr);
      if (!datastr) return "";
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      console.log("first", `${day}-${month}-${year}`);
      return `${year}-${month}-${day}`;
    }
    useEffect(() => {
      if (income?.data) {
        setData({
          category: income?.data.category_id,
          amount: income?.data.amount,
          month: income?.data.month,
          date: converdateFormat(income?.data.date),
        });
        console.log("data---", data);
      }
    }, [
      income?.data.category_id,
      income?.data.amount,
      income?.data.month,
      income?.data.date,
    ]);

    const handlePrevious = () => {
      navigate(-1);
    };

  return (
    <>
     <div className="m-0 p-0 ml-4 mb-2 px-1 py-1 rounded-full border-4 border-green-600  w-10 h-10 cursor-pointer">
            <ChevronLeft className="text-green-500" onClick={handlePrevious} />
          </div>
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-5xl"
      >
        <h2 className="text-2xl font-semibold text-green-400 mb-8 text-center">
          { id ? '➕ Update Budget Details' : ' ➕ Add Budget Details'}
        </h2>

        <div className="grid  md:grid-cols-2 ml-80 ">
          {/* LEFT SIDE - INPUT FIELDS */}
          <div>
            <div className="mb-4">
                <label className="block text-sm mb-2 text-white">
                  Category<span className="text-red-500 text-lg ml-1">*</span>
                </label>
                <select
                  name="category"
                  onChange={handleChange}
                  value={data.category}
                  className={`w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none border ${
                    error?.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Category</option>
                  {Array.isArray(category?.data) &&
                    category?.data.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>

                {error?.category && (
                  <p className="text-red-500 text-sm mt-1">{error.category}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2 text-white">
                  Amount
                  <span className="text-red-500 text-lg ml-1">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  onChange={handleChange}
                  value={data.amount}
                  className={`w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none border ${
                    error?.amount ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {error?.amount && (
                  <p className="text-red-500 text-sm mt-1">{error.amount}</p>
                )}
              </div>

               <div className="mb-4">
              <label className="block text-sm mb-2 text-white">Month
                 <span className="text-red-500 text-lg ml-1">*</span>
              </label>
              <select
                name="month"
                onChange={handleChange}
                value={data.month}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none"
              >
                <option value="">Choose Month</option>
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                 <option value="Apr">Apr</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                 <option value="Jul">Jul</option>
                <option value="Aug">Aug</option>
                <option value="Sep">Sep</option>
                <option value="Oct">Oct</option>
                <option value="Nov">Nov</option>
                <option value="Dec">Dec</option>
              </select>
                 {error?.month && (
                  <p className="text-red-500 text-sm mt-1">{error.month}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2 text-white">
                  Date
                  <span className="text-red-500 text-lg ml-1">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  value={data.date}
                  className={`w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none border ${
                    error?.date ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {error?.date && (
                  <p className="text-red-500 text-sm mt-1">{error.date}</p>
                )}
              </div>
            <button
            type="submit"
            className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-8 mx-14 rounded-lg cursor-pointer transition duration-300"
          >
            { id ? '💾 Update Budget' :' 💾Add Budget'}
          </button>
          </div>

        </div>       
      </form>
      <ToastContainer/>
    </div>
        </>

  );
}
