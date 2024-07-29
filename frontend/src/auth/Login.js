import React, { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaUnlock } from 'react-icons/fa';
import "../auth/Auth.css";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    async function onSubmit(ev){
        ev.preventDefault();
        try{
            const res = await axios.post('http://localhost:8080/auth/login', {
                email,
                password,
            });
            if (res && res.data.success){
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="login-signup-form animated fadedown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="heading">Log In</h1>
                    <div className="input-container">
                    <FaEnvelope className="input-icon"/>    
                    <input type="email" placeholder="Enter Email" value={email} onChange={ev => setEmail(ev.target.value)} />
                    </div>
                    <div className="input-container">
                    <FaUnlock className="input-icon"/>
                    <input  type="password" placeholder="Enter Password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                    </div>
                    <button className="Button">Login</button>
                    <p className="message"> Not Registered? <Link to ="/signup" className="auth-link">Create an account</Link></p>
                </form>
            </div>
        </div>
    )
};

export default Login;

