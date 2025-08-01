import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddIncome from "./pages/addIncome";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MainLayout from "./layout/Mainlayout";
import ViewIncome from "./pages/viewIncome";
import ViewExpense from "./pages/viewExpense";
import AddExpense from "./pages/addExpense";
import ViewBudget from "./pages/viewBudget";
import AddBudget from "./pages/addBudget";
import ViewCategory from "./pages/viewcategory";
import { ToastContainer,toast} from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    <>
     <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="income" element={<ViewIncome />} />
          <Route path="expense" element={<ViewExpense />} />
          <Route path="addIncome" element={<AddIncome/>} />
          <Route path="addIncome/:id" element={<AddIncome/>} />
          <Route path="addExpense" element={<AddExpense/>} />
          <Route path="addExpense/:id" element={<AddExpense/>} />
          <Route path="budget" element={<ViewBudget/>} />
          <Route path="addBudget" element={<AddBudget/>} />
          <Route path="category" element={<ViewCategory/>} />
          <Route path="addBudget/:id" element={<AddBudget/>} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
     
    </QueryClientProvider>
     <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover={true}
        draggable={false}
        closeOnClick={false}
        // isLoading:true,
        progress={undefined}
        className='custom-toast'
        />
    </>
   
  );
}

export default App;
