// ProtectedRoute.js
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("http://localhost:8080/auth/privateUser", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <div>Access denied. Please login to continue.</div>;
}

