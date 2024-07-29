import React from "react";
import './about.css';
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function About() {
    const [auth] = useAuth();

    return (
        <div>
            <Layout title="About Us">
                <div className="back-img" style={{ backgroundImage: "url(/images/shopping-cart.jpg)" }}>
                    <div className="content-container">
                        <h1 className="story">About Us</h1>
                        <p className="par">
                            We are an ecommerce company whose main purpose is to serve our Muslim Brothers and Sisters. <br/>
                            We believe that a fully Islamic related store is required for ease in choosing items for our fellow believers, as well as providing them with high-quality products.
                        </p>
                        {auth.token ? (
                            <Link to="/dashboard" className="dashboard-link">Go to Dashboard</Link>
                        ) : (
                            <p>Login to access dashboard</p>
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    );
}
