import React, { useRef } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { CiShoppingCart } from "react-icons/ci";
import './navbar.css';
import { NavLink } from 'react-router-dom';
import UserIcon from "../components/user/UserIcon";
import { useAuth } from '../context/AuthContext';
import { Badge } from 'antd';

const NavBar = () => {
    const [auth] = useAuth();

    const navRef = useRef();
    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <div className='navbar'>
            <img src={`../images/e-com logo.png`} alt="Logo" className='logo' />
            <nav ref={navRef}>
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/about" className="nav-link">About Us</NavLink>
                <NavLink to="/bookpage" className="nav-link">Islamic Books</NavLink>
                <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
                <button className='nav-btn close-btn' onClick={showNavBar}>
                    <FaTimes />
                </button>
                {!auth?.user ? (
                    <>
                        <button className='auth-btn'>
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                        </button>
                    </>
                ) : (
                    <>
                        <div className="nav-item">
                            <div className="user-icon-container">
                                <UserIcon username={auth.user.name[0]} role={auth.user.role} />
                            </div>
                        </div>
                        <div className="nav-item">
                            <NavLink to="/cart" className="nav-link">
                                <Badge count={auth.user.cart?.length} showZero offset={[10, -5]}>
                                    <CiShoppingCart />
                                </Badge>
                            </NavLink>
                        </div>
                    </>
                )}
            </nav>
            <button className='nav-btn' onClick={showNavBar}>
                <FaBars />
            </button>
        </div>
    );
}

export default NavBar;


