import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

export const useCustomMutation = ({ mutatefn, resetfn, navigate, navigatePath, invalidateKey }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutatefn,
    onSuccess: (data) => {
      const message = data?.message || 'Successfull';
      toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
        className: 'custom-toast'
      });

      if (invalidateKey) {
        queryClient.invalidateQueries(invalidateKey);
      }

      if (navigate) {
        setTimeout(() => {
          resetfn?.();
          navigate(navigatePath || -1);
        }, 1000); 
      }
    },
    onError: (err) => {
      toast.error(err?.message || 'Something went wrong');
    }
  });
};





