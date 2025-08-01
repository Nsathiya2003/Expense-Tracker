import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import { useCustomMutation } from "../api/apiServices/customFunction";
import { createUser } from "../api/apiServices/userService";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [data, setData] = useState({
    username: "",
    emailId: "",
    mobileNo: "",
    password: "",
    user_profile: null,
    profilePreview: null,
  });

  const fileInputRef = useRef(null);
  const focusRef = useRef(null);
  const navigate = useNavigate(); // ✅ For redirection

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setData((prev) => ({
          ...prev,
          [name]: file,
          profilePreview: URL.createObjectURL(file),
        }));
      }
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const resetForm = () => {
    setData({
      username: "",
      emailId: "",
      mobileNo: "",
      password: "",
      user_profile: null,
      profilePreview: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

 const mutation = useCustomMutation({
  mutatefn: createUser,
  resetfn: resetForm,
  navigate: navigate, // ✅ Pass the navigate function
  navigatePath: '/login', // ✅ Destination path
});


  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, emailId, password, mobileNo } = data;

    if (!username || !emailId || !password || !mobileNo) {
      toast.warn("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("mobileNo", data.mobileNo);
    formData.append("password", data.password);
    formData.append("emailId", data.emailId);
    formData.append("user_profile", data.user_profile);

    mutation.mutate(formData);
  };

  const handleDelete = () => {
    setData((prev) => ({
      ...prev,
      user_profile: null,
      profilePreview: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-green-400 mb-2 text-center">
            Create Account
          </h2>
          <p className="text-zinc-400 text-sm text-center mb-6">
            Already have an account?{" "}
            <a href="/login" className="text-green-400 underline">
              Login
            </a>
          </p>

          <div className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              ref={focusRef}
              value={data.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white focus:outline-none"
            />
            <input
              type="text"
              name="mobileNo"
              placeholder="Enter your mobile no"
              value={data.mobileNo}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white focus:outline-none"
            />
            <input
              type="email"
              name="emailId"
              placeholder="Enter your email"
              value={data.emailId}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white focus:outline-none"
            />
            <input
              type="file"
              name="user_profile"
              ref={fileInputRef}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white focus:outline-none cursor-pointer"
            />

            {data.profilePreview && (
              <div className="relative w-32 h-32 mt-4">
                <img
                  src={data.profilePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg border"
                />
                <RiDeleteBin6Fill
                  className="absolute -top-2 -right-2 text-red-500 cursor-pointer bg-white rounded-full p-1"
                  size={24}
                  onClick={handleDelete}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-semibold transition"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
