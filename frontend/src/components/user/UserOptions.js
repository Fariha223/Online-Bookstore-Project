import React from "react";
import { NavLink } from "react-router-dom";
import "./UserOptions.css";

const UserOptions = () => {

    return (
        <div className="user-options">
            <h4 className="user_title">User's Dashboard</h4>
            <nav className="user_nav">
                <NavLink to="/dashboard/user/profile" className="user-link" activeClassName="active">
                    User's Profile
                </NavLink>
                <NavLink to="/dashboard/user/orders" className="user-link" activeClassName="active">
                    Orders
                </NavLink>
            </nav>
        </div>
    );
};

export default UserOptions;