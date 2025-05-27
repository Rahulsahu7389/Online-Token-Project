import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { handleError } from '../utils';

const Login = () => {
  const [LoginInfo, setLogin] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...LoginInfo };
    copyLoginInfo[name] = value;
    setLogin(copyLoginInfo);
  }
  const handleLogin = async (e) => { // this an api call
    e.preventDefault();
    const { email, password } = LoginInfo;
    if (email === "" || password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(LoginInfo)
      });
      const data = await response.json();//this is the response from the server
      const { message, success, jwtToken, name, error } = data;
      if (success) {
        toast.success(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("name", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        toast.error(details);
      } else if (!success) {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

  }
  console.log('LoginInfo ->', LoginInfo);
  return (

    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input onChange={handlechange} type="email" name="email"
            placeholder="Enter your email" value={LoginInfo.email}

          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input onChange={handlechange} type="password" name="password"
            placeholder="Enter your password"
            value={LoginInfo.password}
          />
        </div>
        <button>Signup</button><br />
        <span>Don't have an account?
          <Link to="/signup">SignUp</Link>
        </span>
      </form>
      <ToastContainer />
      {/* toast container is used to show notifications */}


    </div>

  )
}

export default Login
