import React, { useState } from "react";
import UserOptions from "./UserOptions";
import Layout from "../Layout";
import { useAuth } from "../../context/AuthContext";
import "./UserProfile.css"; 
import axios from "axios";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [auth, setAuth] = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: auth?.user?.name || "",
    email: auth?.user?.email || "",
    password: "",
    address: auth?.user?.address || "",
    phone: auth?.user?.phone || "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const { password, ...otherData } = formData;
      const updateData = password ? formData : otherData;

      const response = await axios.put(
        "http://localhost:8080/auth/user-profile",
        updateData
      );
      setAuth({
        ...auth,
        user: response.data.user,
      });
      setIsEditing(false);
      toast.success("User Information Updated Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed To Update User Information.");
    }
  };

  return (
    <Layout>
      <div className="user_dash"> 
        <div className="user-container"> 
          <UserOptions />
          <div className="user_dash-list"> 
            <h3>User's Profile Settings</h3>
            <form className="user-account-options">
              <h4>
                Username:{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleOnChange}
                  />
                ) : (
                  formData.name
                )}
              </h4>
              <h4>
                Email:{" "}
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                  />
                ) : (
                  formData.email
                )}
              </h4>
              <h4>
                New Password:{" "}
                {isEditing ? (
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Enter new password"
                  />
                ) : (
                  "********"
                )}
              </h4>
              <h4>
                Address:{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleOnChange}
                  />
                ) : (
                  formData.address
                )}
              </h4>
              <h4>
                Contact:{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleOnChange}
                  />
                ) : (
                  formData.phone
                )}
              </h4>
              <div className="user-account"> 
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={handleEditToggle}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleEditToggle}
                  >
                    Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
