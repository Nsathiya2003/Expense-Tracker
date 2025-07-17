import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast, ToastContainer } from "react-toastify";

export const useCustomQuery = ({ key,fetchfn,enabled=true})=>{
  return useQuery({
    queryKey: key,
    queryFn:fetchfn,
    enabled,// it only execute the enabled true
    refetchOnWindowFocus:false,
    staleTime:1000 * 60 * 5,
    onError: (err) => {
      console.log("error",err);
    }
  })
}

export const useCustomMutation = ({ key,mutatefn,successmsg}) =>{
    const queryClient = useQueryClient();
    return useMutation({
     mutationFn:mutatefn,
     onSuccess: (data) =>{
        console.log("data is----",data);
        toast.success(successmsg || 'Success');
        if(key){
          queryClient.invalidateQueries(key);
        }
     },
     onError: (err) => {
        toast.error(err || 'Something went wrong');
     },
    })
}


