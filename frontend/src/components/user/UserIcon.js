import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './UserIcon.css';
import Logout from '../../auth/Logout';

const UserIcon = ({ username, role }) => {
    const [dropDownMenuOpen, setDropDownMenuOpen] = useState(false);
    const [bgColor, setBgColor] = useState('#000');

    const colors = ['#fd5959', '#ff9c6d', '#fcff82', '#afc5ff'];

    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    useEffect(() => {
        setBgColor(getRandomColor());
    }, []);

    useEffect(() => {
        console.log("User role:", role);
    }, [role]);

    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    const toggleDown = () => {
        setDropDownMenuOpen(!dropDownMenuOpen);
    };


    return (
        <div className="user-icon-container" onClick={toggleDown}>
            {username ? (
                <>
                    <div className="user-icon" style={{ backgroundColor: bgColor }}>
                        <div className="user-icon-letter">{getInitial(username)}</div>
                    </div>
                    {dropDownMenuOpen && (
                        <div className="dropdown-menu">
                            {role === 1 ? (
                                <>
                                    <NavLink to="/dashboard/admin/profile" className="dashboard-items">
                                        Admin Profile Setting
                                    </NavLink>
                                    <NavLink to="/dashboard/admin/create-category" className="dashboard-items">
                                        Create Category
                                    </NavLink>
                                    <NavLink to="/dashboard/admin/create-product" className="dashboard-items">
                                        Create Product
                                    </NavLink>
                                    <NavLink to="/dashboard/admin/products" className="dashboard-items">
                                        Products
                                    </NavLink>
                                    <NavLink to="/dashboard/admin/orders" className="dashboard-items">
                                        Orders
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/dashboard/user/profile" className="dashboard-items">
                                        User Profile Setting
                                    </NavLink>
                                    <NavLink to="/dashboard/user/orders" className="dashboard-items">
                                        Orders
                                    </NavLink>
                                </>
                            )}
                            <Logout />
                        </div>
                    )}
                </>
            ) : null}
        </div>
    );
};

export default UserIcon;
