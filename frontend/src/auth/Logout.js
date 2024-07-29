import React from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import "../auth/Auth.css";

const Logout = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    return (
        <button className="logout-btn" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
