import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import axios from "axios";

const AdminRoutes = () => {
  const [auth] = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      if (!auth.token) {
        setIsAdmin(false);
        return;
      }
      try {
        const res = await axios.get('http://localhost:8080/auth/admin-auth', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (res.data.ok) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Admin check failed:", error);
        setIsAdmin(false);
      }
    };

    authCheck();
  }, [auth]);

  return isAdmin ? <Outlet /> : " ";
};

export default AdminRoutes;
