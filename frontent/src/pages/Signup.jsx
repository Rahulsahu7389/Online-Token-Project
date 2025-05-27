import React from 'react'
import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { handleError } from '../utils';

const Signup = () => {
    const [SignupInfo, setSignup] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const handlechange = (e) =>{
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = {...SignupInfo };
        copySignupInfo[name] = value;
        setSignup(copySignupInfo);
    }
    const handlesubmit = async (e) => { // this an api call
        e.preventDefault();
        const { name, email, password } = SignupInfo;
        if (name === "" || email === "" || password === "") {
            toast.error("Please fill all the fields");
            return;
        }
        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(SignupInfo)
            });
            const data = await response.json();//this is the response from the server
            const { message, success ,error } = data;
            if(success) {
                toast.success(message);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }else if(error) {
                const details = error?.details[0].message;
                toast.error(details);
            }else if(!success) {
                toast.error(message);
            }   
        } catch (error) {
            toast.error("Something went wrong");
        }
        
    }
    console.log('SignupInfo ->',SignupInfo);
    return (

        <div className="container">
            <h1>SignUp</h1>
            <form onSubmit={handlesubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input onChange={handlechange} type="text" name="name"
                        placeholder="Enter your name"
                        autoFocus value={SignupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input onChange={handlechange} type="email" name="email"
                        placeholder="Enter your email" value={SignupInfo.email}

                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input onChange={handlechange} type="password" name="password"
                        placeholder="Enter your password"
                        value={SignupInfo.password}
                    />
                </div>
                <button>Signup</button><br />
                <span>Already have an account?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
            {/* toast container is used to show notifications */}


        </div>

    )
}

export default Signup
