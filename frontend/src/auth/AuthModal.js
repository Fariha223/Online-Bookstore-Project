import React from "react";
import SignUp from "./Signup";
import Login from "./Login";

const AuthModal = ({ formIsOpen, handleClose, selectForm}) => {
    return(
        <div className={`model ${formIsOpen? "open" : ""}`}>
            <div className="modal-content">
                <button className="close-button" onClick={handleClose}>Close</button>
                {selectForm === "signup" ? (
                    <SignUp/>
                ):(
                    <Login/>
                )}
            </div>
        </div>
    )
}

export default AuthModal;