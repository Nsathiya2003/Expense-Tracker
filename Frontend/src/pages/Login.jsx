import React, { useEffect, useState, useRef } from "react";
import CustomInput from "../components/customInput";
import { login, useCustomMutation } from "../api/apiServices/userService";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [data, setData] = useState({
    emailId: "",
    password: "",
  });

  const navigate = useNavigate();
  const focusRef = useRef(null);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setData({
      emailId: "",
      password: "",
    });
  };

  const mutation = useCustomMutation(login, {
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.data?.message || "Login successful", {
          position: "top-center",
          autoClose: 3000,
          className: "custom-toast",
        });
        resetForm();
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000); // give 1 second before redirect
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login failed", {
        position: "top-center",
        autoClose: 3000,
        className: "custom-toast",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(data);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-zinc-800 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-green-400 mb-2 text-center">
            Login
          </h2>
          <p className="text-sm text-zinc-400 mb-6 text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-green-400 underline">
              Register
            </a>
          </p>

          <CustomInput
            type="email"
            name="emailId"
            id="emailId"
            placeholder="Enter your email"
            value={data.emailId}
            onChange={handleChange}
            inputRef={focusRef}
            className="w-full p-3 rounded-md bg-zinc-700 text-white mb-4"
          />

          <CustomInput
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-zinc-700 text-white mb-6"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
