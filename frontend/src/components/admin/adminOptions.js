import React from "react";
import { NavLink } from "react-router-dom";
import "./adminOptions.css";

const AdminOptions = () => {
  return (
    <div className="admin_options">
      <h3 className="admin_title">Admin Panel</h3>
      <nav className="admin-nav">
      <NavLink to="/dashboard/admin/profile" className="admin-link" activeClassName="active">
          Admin's Profile
        </NavLink>
        <NavLink to="/dashboard/admin/create-category" className="admin-link" activeClassName="active">
          Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="admin-link" activeClassName="active">
          Create Product
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="admin-link" activeClassName="active">
          Products
        </NavLink>
        <NavLink to="/dashboard/admin/orders" className="admin-link" activeClassName="active">
          Orders
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminOptions;
