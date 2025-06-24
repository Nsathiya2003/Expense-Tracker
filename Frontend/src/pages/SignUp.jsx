import { Password } from "@mui/icons-material";
import React, { useState } from "react";
import CustomInput from "../components/customInput";
import expense from "../assets/expense4.jpg";
// import '../App.css';

export default function SignUp() {
  const [data, setData] = useState({
    username: "",
    emailId: "",
    mobileNo: "",
    password: "",
    user_profile: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    console.log("File Type Detected:", type);
    setData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    e.preventDefault();
  };

  return (
    <>
      <div className="main">
        <div className="form" onSubmit={handleSubmit}>
          <div className="form-wrapper">
            <div className="input-fields">
              <h4 className="head">SignUp Form </h4>
              <CustomInput
                // label='First Name'
                type="text"
                id="username"
                name="username"
                placeholder="Enter your name"
                className="input-field"
                value={data.username}
                onChange={(e) => handleChange(e)}
              />
              <CustomInput
                type="text"
                id="mobileNo"
                name="mobileNo"
                placeholder="Enter your Mobile no"
                className="input-field"
                value={data.mobileNo}
                onChange={(e) => handleChange(e)}
              />
              <CustomInput
                type="email"
                id="emailId"
                name="emailId"
                placeholder="Enter your email"
                className="input-field"
                value={data.emailId}
                onChange={(e) => handleChange(e)}
              />
              <CustomInput
                type="text"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="input-field"
                value={data.password}
                onChange={(e) => handleChange(e)}
              />
              <CustomInput
                type="file"
                id="user_profile"
                name="user_profile"
                className="input-field"
                // value={data.user_profile}
                onChange={(e) => handleChange(e)}
              />
              <button type="submit" className="submit-btn">
                Create account
              </button>
            </div>
            <div className="image-box">
              <img src={expense} alt="signup-visual" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
