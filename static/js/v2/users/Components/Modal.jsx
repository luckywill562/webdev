import React from "react";
import { useNavigate } from "react-router-dom";

export const Modal = ({children}) => {
    const navigate = useNavigate();
    return (
        <div className="fade modal show" style={{display:"block"}}>
            <div className="fade modal-backdrop show"></div>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button onClick={() => navigate(-1)}>Close</button>
                    {children}
                </div>
            </div>
        </div>
    );
};
