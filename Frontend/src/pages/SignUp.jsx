import React, { useEffect, useState } from "react";
import CustomInput from "../components/customInput";
import expense from "../assets/expense4.jpg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useRef } from "react";
import { createUser, useCustomMutation } from "../api/apiServices/userService";
// import '../App.css';

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

  //for focus the input field user should start typing
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
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
    username: '',
    emailId: '',
    mobileNo: '',
    password: '',
    user_profile: null,
    profilePreview: null, 
  });

  if (fileInputRef.current) {
    fileInputRef.current.value = ''; 
  }
};


  const mutation = useCustomMutation(createUser, {
    onSuccess:(data) => {
      console.log("User created successfull",data);
      resetForm();
    },
    onError:(error) =>{
      console.log("Error creating user",error.message);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username',data.username);
    formData.append('mobileNo',data.mobileNo);
    formData.append('password',data.password);
    formData.append('emailId',data.emailId);
    formData.append('user_profile',data.user_profile);
    mutation.mutate(formData)

  };

  return (
    <>
      <div className="main">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-wrapper">
            <div className="input-fields">
              <h4 className="head">SignUp Form </h4>
               <p className='para-log'>Already have an account? <a href="/">Login</a></p>
              <CustomInput
                // label='First Name'
                type="text"
                id="username"
                name="username"
                placeholder="Enter your name"
                className="input-field"
                inputRef={focusRef}
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
                inputRef={fileInputRef}
                onChange={(e) => handleChange(e)}
              />
              {data.profilePreview && (
                <>
                  <img
                    src={data.profilePreview}
                    alt="Preview"
                    className="img-preview"
                  />
                  <RiDeleteBin6Fill
                    className="delete-icon"
                    onClick={() => {
                      setData((prev) => ({
                        ...prev,
                        user_profile: null,
                        profilePreview: null,
                      }));

                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                  />
                </>
              )}
              <button type="submit" className="submit-btn">
                Create account
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
