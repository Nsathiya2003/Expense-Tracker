import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomMutation, useCustomQuery } from "../api/apiServices/customFunction";
import { addExpense, getCategory, getExpenseById, updateExpense } from "../api/apiServices/userService";
import { ChevronLeft } from "lucide-react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ToastContainer } from "react-toastify";

export default function AddExpense() {
 const [data, setData] = useState({
     category: "",
     amount: "",
     paymentMethod: "",
     description: "",
     date: "",
     proof: null,
     profilePreview: null,
   });
   const [error, setError] = useState({});
   const fileInputRef = useRef(null);
 
   const resetForm = () => {
     setData({
       category: "",
       amount: "",
       paymentMethod: "",
       description: "",
       date: "",
       proof: null,
     });
   };
 
   const navigate = useNavigate();
 
   const { id } = useParams();
   const queryClient = useQueryClient();
 
   const handleChange = (e) => {
     const { name, value, files } = e.target;
 
     if (name === "proof") {
       const file = files[0];
       setData((prev) => ({
         ...prev,
         [name]: file,
         profilePreview: URL.createObjectURL(file),
       }));
 
       // Clear error for proof if exists
       if (error?.proof) {
         setError((prevErrors) => {
           const updatedErrors = { ...prevErrors };
           delete updatedErrors.proof;
           return updatedErrors;
         });
       }
     } else {
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
     }
   };
 
   //Get all categories
   const { data: category, isLoading: loadingCategories } = useCustomQuery({
     key: "Categories",
     fetchfn: getCategory,
   });
 
   // Create and update the income
   const createIncomeMutation = useCustomMutation({
     mutatefn: ({ id, data }) => {
       console.log("first", id, data);
       return id ? updateExpense(id, data) : addExpense(data);
     },
     resetfn: resetForm,
     navigate,
    navigatePath: '/expense',
    invalidateKey: ['expense']
   });
 
   // Get Income by id
   const { data: income } = useCustomQuery({
     key: ["expense", id],
     fetchfn: () => getExpenseById(id),
     enabled: !!id,
   });
 
   const validateForm = () => {
     const newErrors = {};
     console.log("first", data);
 
     if (!data.category) {
       console.log("heloo");
       newErrors.category = "Please choose one category";
     }
     if (!data.amount) {
       newErrors.amount = "Amount is required";
     }
     if (!data.paymentMethod) {
       newErrors.paymentMethod = "Payment method is required";
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
     const formData = new FormData();
     if (!id && data?.date?.includes?.("-")) {
       const [year, month, day] = data?.date?.split("-");
       const formatedDate = `${day}-${month}-${year}`;
       formData.append("date", formatedDate);
     } else {
       const [year, month, day] = data?.date?.split("-");
       const formatedDate = `${day}-${month}-${year}`;
       formData.append("date", formatedDate);
       }
     formData.append("category_id", data.category);
     formData.append("amount", data.amount);
     formData.append("paymentMethod", data.paymentMethod);
     formData.append("description", data.description);
     // formData.append('date',data.date)
     formData.append("proof", data.proof);
     if (id) {
       console.log("id---", id);
       createIncomeMutation.mutate(
         { id, data: formData, resetForm },
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
       createIncomeMutation.mutate({ id: null, data: formData });
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
         paymentMethod: income?.data.paymentMethod,
         description: income?.data.description,
         date: converdateFormat(income?.data.date),
         proof: income?.data.proof,
       });
       console.log("data---", data);
     }
   }, [
     income?.data.category,
     income?.data.amount,
     income?.data.paymentMethod,
     income?.data.description,
     income?.data.date,
     income?.data.proof,
   ]);
   const handleDelete = () => {
     setData((prev) => ({
       ...prev,
       proof: null,
       profilePreview: null,
     }));
 
     if (fileInputRef.current) {
       fileInputRef.current.value = "";
     }
   };
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
            {id ? "➕ Update Expense Details" : " ➕ Add Expense Details"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label className="block text-sm mb-2 text-white">
                  Source
                  <span className="text-red-500 text-lg ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="paymentMethod"
                  placeholder="e.g. UPI, Bank"
                  onChange={handleChange}
                  value={data.paymentMethod}
                  className={`w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none border ${
                    error?.paymentMethod ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {error?.paymentMethod && (
                  <p className="text-red-500 text-sm mt-1">{error.paymentMethod}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2 text-white">
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  placeholder="Details about income"
                  onChange={handleChange}
                  value={data.description}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none"
                />
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
            </div>

            {/* RIGHT SIDE - FILE UPLOAD */}
            <div>
              <label className="block text-sm mb-2 text-white">
                Upload Proof (Image/PDF)
              </label>
              <div className="flex items-center justify-center h-[220px] bg-zinc-700 rounded-lg relative cursor-pointer">
                <label
                  htmlFor="proof"
                  className="flex flex-col items-center justify-center text-green-400 text-4xl cursor-pointer"
                >
                  +
                  <span className="text-sm text-gray-400 mt-2">
                    Upload Proof
                  </span>
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
              {/* {data.profilePreview && (
                   <>
                                <div className="flex gap-3">
                                <div>
                                 <img
                                    src={data.profilePreview}
                                    alt="Preview"
                                    className="img-preview"
                                  />
                                </div>
                                <div className="mt-14 cursor-pointer">
                                 <RiDeleteBin6Fill
                                    className=""
                                    onClick={() => {
                                      setData((prev) => ({
                                        ...prev,
                                        proof: null,
                                        profilePreview: null,
                                      }));
                
                                      if (fileInputRef.current) {
                                        fileInputRef.current.value = "";
                                      }
                                    }}
                                  />
                                </div>
                          
                                </div>
                                 
                                 
                  </>
            )}
            {data.proof && (
              <img 
                     className=" w-16 h-20 mt-5 ml-4"
                    src={`http://localhost:5000/uploads/proof/${data.proof}`}
                    // src={imgUrl('proof', item.proof)}
                    alt="Income proof" />
            )} */}
              {data.profilePreview || data.proof ? (
                <div className="relative w-32 h-32 mt-4">
                  <img
                    src={
                      data.profilePreview
                        ? data.profilePreview
                        : typeof data.proof === "string"
                        ? `http://localhost:5000/uploads/proof/${data.proof}`
                        : ""
                    }
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md border"
                  />

                  <RiDeleteBin6Fill
                    className="absolute top-0 right-0 text-red-500 cursor-pointer bg-white rounded-full p-1"
                    size={20}
                    onClick={handleDelete}
                  />
                </div>
              ) : null}
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg cursor-pointer transition duration-300"
                >
                {id ? ' 💾 Update Expense': ' 💾 Add Expense'}
                   {/* Save Income */}
                </button>
              </div>
            </div>
          </div>

          {/* SAVE BUTTON */}
        </form>
        <ToastContainer />
      </div>    </>
  );
}
