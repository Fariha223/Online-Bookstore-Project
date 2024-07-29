import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
    return(
        <div className="footer">
            <h2>All Right Reserved &copy; Muslima Authority</h2>
            <p>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact Us</Link>
            </p>
        </div>
    )
}
export default Footer;
