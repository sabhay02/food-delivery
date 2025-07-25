import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const {url,setToken}=useContext(StoreContext)

    const [data,setData] = useState({
    name:"",
    email:"",
    password:""
})

const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
}

const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    
    if (currState === "Login") {
        newUrl += "/api/user/login";
    } else {
        newUrl += "/api/user/register";
    }

    try {
        const response = await axios.post(newUrl, data);
        
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error("API Error:", error);
        alert(error.response?.data?.message || "An error occurred");
    }
};

    return (
        <div className="login-popup">
            <form onSubmit={onLogin}className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img 
                        onClick={() => setShowLogin(false)} 
                        src={assets.cross_icon} 
                        alt="Close" 
                    />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && 
                        <input onChange={onChangeHandler} value={data.name} name='name' type="text" placeholder="Your name" required />
                    }
                    <input type="email" onChange={onChangeHandler} value={data.email} name='email' placeholder="Your email" required />
                    <input  name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
                </div>
                <button type='submit'>
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" 
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    );
};

export default LoginPopup;