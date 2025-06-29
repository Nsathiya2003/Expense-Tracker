import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import Login from "./pages/Login";

const queryClient = new QueryClient()

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
          <Router>
              <Routes>
                  <Route path="/signup" element={<SignUp />} />
                 <Route path="/" element={<Login />} />

              </Routes>
          </Router>
    </QueryClientProvider>
     
    </>
  );
}

export default App;
