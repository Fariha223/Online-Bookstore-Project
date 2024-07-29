import React from "react";
import Footer from "./Footer";
import Navbar from "../views/NavBar";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) =>{
    return(
        <div>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
                <meta name="author" content={author}/>
                <title>{title}</title>
            </Helmet>
            <Navbar/>
            <main style={{minHeight: "70vh"}}>
                <Toaster/>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

Layout.defaultProps = {
    description: "mern stack project",
    keywords: "mern, react, node, mongodb",
    author: "Fellow Muslima",
};

export default Layout;