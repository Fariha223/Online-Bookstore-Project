import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Link, useNavigate } from "react-router-dom";
import "./home&book-page.css";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function HomePage() {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const handleOnClick = (e) => {
    e.preventDefault(); 
    if (!auth.user) {
      navigate(`/signup`);
    } else {
      navigate(`/dashboard/bookpage`);
    }
  };

  return (
    <Layout title="Home">
      <div className="home-body">
        <div className="background-img" style={{ backgroundImage: "url(/images/books.jpeg)" }}></div>
        <div className="main-context">
          <h1 className="main-heading">
            Welcome to our Islamic Shop, Dear Mu'minuns.
          </h1>
          <h2 className="sub-heading">
            The Perfect online bookstore for our Muslim Brothers and Sisters.
          </h2>
          <p className="intro-text">
            <TypeAnimation
              sequence={[
                "Check out our listed categories down below.",
                2000,
                "Register for more access and purchases.",
                2000,
                "Discover a variety of Islamic literature!",
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{ display: "inline-block" }}
            />
          </p>
          <h3 className="highlight">Find all the latest Islamic books from our Bookshop!</h3>
          <div className="category-btn-container">
            <button className="category-btn" onClick={handleOnClick}>
              Find Books
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
