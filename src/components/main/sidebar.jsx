import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faTimes,
    faCogs,
    faTable,
    faList,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../style.css";

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <>

            <div className="sidebar">
                <div className="sidebar-menu">
                    <div className="sidebar-item">
                        <img style={{ width: "100%" }} src="NTK_logo.png" alt="" />
                    </div>
                    <div className="sidebar-item" onClick={() => navigate("/")}>
                        <FontAwesomeIcon icon={faUser} />
                        <span>முகப்பு</span>
                    </div>
                    <div className="sidebar-item" onClick={() => navigate("/lists")}>
                        <FontAwesomeIcon icon={faList} />
                        <span>பணிகள்</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;