import React, { useEffect, useState,useRef } from "react";
import CustomInput from "../components/customInput";
import expense from "../assets/expense4.jpg";
import {login, useCustomMutation } from "../api/apiServices/userService";
// import '../App.css';

export default function Login() {
 const [data, setData] = useState({
  emailId: "",
  password: "",
});
  const focusRef = useRef(null);

  //for focus the input field user should start typing
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
    emailId: '',
    password: ''
  });

};


  const mutation = useCustomMutation(login, {
    onSuccess:(data) => {
      console.log("User login successfull",data);
      resetForm();
    },
    onError:(error) =>{
      console.log("Error login a user",error.message);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(data)

  };

  return (
    <>
      <div className="main">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-wrapper">
            <div className="input-fields">
              <h4 className="head">Login</h4>
                <p className='para-log'>Don't have an account? <a href="/signup">Register</a></p>
              <CustomInput
                type="email"
                id="emailId"
                name="emailId"
                placeholder="Enter your email"
                className="input-field"
                value={data.emailId}
                inputRef={focusRef}
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
             
              <button type="submit" className="submit-btn">
                Login
              </button>
            </div>
            <div className="image-box">
              <img src={expense} alt="signup-visual" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
