import { dataTagSymbol, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addIncome, getCategory, getIncomeById } from "../api/apiServices/userService";
import { useCustomQuery } from "../api/apiServices/customFunction";
import { useParams } from "react-router-dom";

export default function AddIncome() {
  const [data, setData] = useState({
    category: '',
    amount: '',
    source: '',
    description: '',
    date: '',
    proof: null,
  });
  const { id } = useParams();
  console.log("id---",id);
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'proof') {
      setData((prev) => ({ ...prev, proof: files[0] }));
    } 
//     if(name==='date'){
//       const [year,month,day] = value.split('-');
//       const formatedDate = `${day}-${month}-${year}`;
//       setData((prev)=>({
//         ...prev,
//         [name]:formatedDate
//       }))
//        console.log("dateee----",data)

//  }
    else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSuccess = (res) =>{
      toast.success(res?.data?.message || 'Income added successfully',{
        position:'top-center',
        onClose:3000,
        pauseOnHover:false,
        progress:undefined,
        draggable:false,
        isLoading:false,
        className:'custom-toast'
      })
      queryClient.invalidateQueries({ queryKey: ['income']});
      setData({ category:'', source:'',description:'',date:'',amount:'',proof:null})
  } 

  const handleError = (error) =>{
      toast.error(error?.response?.data?.message || 'Something want wrong',{
        position:'top-center',
        onClose:3000,
        pauseOnHover:false,
        progress:undefined,
        draggable:false,
        isLoading:false,
        className:'custom-toast'
      })
  }

  const mutation = useMutation({
    mutationFn:addIncome,
    onSuccess:handleSuccess,
    onError:handleError
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const [year,month,day] = data.date.split('-');
    const formatedDate = `${day}-${month}-${year}`;

    console.log("Submitted:", data);
    const formData = new FormData();
    formData.append('category',data.category)
    formData.append('amount',data.amount)
    formData.append('source',data.source)
    formData.append('description',data.description)
    formData.append('date',formatedDate)
    formData.append('proof',data.proof)

    mutation.mutate(formData);

  };

  //  const { data:datas, error, isLoading, isError } = useQuery({
  //     queryKey: ['category'],
  //     queryFn: getCategory,
  //     staleTime: 1000 * 60 * 5,
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //   });
  //   console.log("datasss",datas);

  const { data: datas} = useCustomQuery(['category'],()=>getCategory());
  const { data: income} = useCustomQuery(['income',id], () => getIncomeById(id));
  const incomeValue = income?.data;
  console.log("incomeValue---",incomeValue?.amount)

function converdateFormat(datastr){
  console.log("datastr---",datastr)
  const date = new Date(datastr);
    if(!datastr) return '';
    const day = String(date.getDate()).padStart(2,'0');
    const month = String(date.getMonth() + 1).padStart(2,'0')
    const year = date.getFullYear();
  console.log("first",`${day}-${month}-${year}`);
  return `${year}-${month}-${day}`
}

  useEffect(()=>{
    if(income?.data ){
      setData({
          category:income?.data.category,
          amount: income?.data.amount,
          source: income?.data.source,
          description: income?.data.description,
          date: converdateFormat(income?.data.date),
          proof: income?.data.proof,
      })
      console.log("data---",data);
    }
  },[income?.data.category,
    income?.data.amount,
    income?.data.source,
    income?.data.description,
    income?.data.date,
    income?.data.proof,
  ])





    // const {data:income,isLoading,isError,error} = useQuery({

    // })

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-5xl"
      >
        <h2 className="text-2xl font-semibold text-green-400 mb-8 text-center">
          ➕ Add Income Details
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
                { Array.isArray(datas?.data) && datas?.data.map((item,index)=>(
                  <option key={index} value={item.id}>
                       {item.name} 
                  </option>
                ))}
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
            💾 Save Income
          </button>
        </div>
          </div>
          
        </div>

        {/* SAVE BUTTON */}
       
      </form>
    </div>
  );
}
