import React, { useState} from "react";
import AdminOptions from "./adminOptions";
import Layout from "../Layout";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import "./adminProfile.css";

const AdminProfile= () => {

    const [auth, setAuth] = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: auth?.user?.name || "",
        email: auth?.user?.email || "",
        phone: auth?.user?.phone || "",
    });

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
    };

    const handleSave = async () => {
        try{
            const response = await axios.put("http://localhost:8080/auth/admin-profile", formData);
            setAuth({
                ...auth,
                user: response.data.user,
            });
            setIsEditing(false);
            toast.success("Admin Information Updated Successfully!");
        } catch(error){
            console.error(error);
            toast.error("Failed To Update Admin Information.");
        }
    };

    return(
        <Layout title="Dashboard - Admin's Profile">
            <div className="admin-container">
                <AdminOptions />
                <div className="admin_dash">
                    <div className="admin_dash-list">
                        <h3>Admin Profile Settings</h3> 
                        <form className="admin-account-options">
                        <h4>Admin Name: {" "} {isEditing ? (<input type= "text" name= "name" value={formData.name} onChange={handleOnChange}/> ) : (formData.name)}</h4>
                        <h4>Admin Email: {" "} {isEditing ? (<input type= "email" name= "email" value={formData.email} onChange={handleOnChange}/> ) : (formData.email)}</h4>
                        <h4>Admin Contact: {" "} {isEditing ? (<input type= "text" name= "phone" value={formData.phone} onChange={handleOnChange}/> ) : (formData.phone)}</h4>
                        <div className="admin-account">{isEditing? ( <><button type="button" className="btn btn-primary" onClick={handleSave}>Update</button>
                                <button type="button" className="btn btn-warning" onClick={handleEditToggle}>Cancel</button></> ) : (
                                <button type="button" className="btn btn-warning" onClick= {handleEditToggle}>Edit</button>
                        )}</div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default AdminProfile;
