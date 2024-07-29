import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome } from 'react-icons/fa';
import "../auth/Auth.css";
import toast from "react-hot-toast";

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/auth/signup', {
        name,
        email,
        password,
        phone,
        address
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="login-signup-form animated fade-down">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="heading">Sign Up</h1>
          <div className="input-container">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={ev => setName(ev.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <FaPhone className="input-icon" />
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={ev => setPhone(ev.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <FaHome className="input-icon" />
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={ev => setAddress(ev.target.value)}
              required
            />
          </div>
          <button className="Button">Submit</button>
          <p className="message">
            Already Registered? <Link to="/login" className="auth-link">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

