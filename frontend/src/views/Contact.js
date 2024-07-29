import React from "react";
import Layout from "../components/Layout";
import { FaEnvelope, FaPhone, FaFacebook } from "react-icons/fa";
import "./contactUs.css";

export default function Contact() {
    const Email = ({ email }) => {
        return (
            <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
                {email}
            </a>
        );
    };

    const mail_address = "fariha.hasan.tonima@g.bracu.ac.bd";

    const contactStyle = {
        backgroundImage: "url('/images/contactUs-back.jpg')",
    };

    return (
        <Layout title={"Contact Us"}>
            <div className="contact" style={contactStyle}>
                <h1 className="contact-heading">CONTACT US</h1>
                <p className="contact-para">
                    For any queries, contact us using the following <br /> details. We are available from 9am-9pm BST.
                </p>
                <div className="sidebyside-components">
                    <FaEnvelope />
                    <span>Email: <Email email={mail_address} /></span>
                </div>
                <div className="sidebyside-components">
                    <FaPhone />
                    <p>Phone: +880-1376-489342</p>
                </div>
                <div className="sidebyside-components">
                    <FaFacebook />
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><b>Facebook</b></a>
                </div>
            </div>
        </Layout>
    );
}
