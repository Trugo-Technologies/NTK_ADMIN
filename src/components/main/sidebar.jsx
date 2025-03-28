import React, { useState } from "react";
import State from "../main/State";
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

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>

            <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>

                <div className="toggle-button" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={isCollapsed ? faBars : faTimes} />
                </div>

                <div className="sidebar-menu">
                    <div className="sidebar-item">
                        <img style={{ width: "100%" }} src="NTK_logo.png" alt="" />
                    </div>
                    <Link to="/" className="sidebar-item">
                        <FontAwesomeIcon icon={faUser} />
                        {!isCollapsed && <span>முகப்பு</span>}
                    </Link>
                    <Link to="/lists" className="sidebar-item">
                        <FontAwesomeIcon icon={faList} />
                        {!isCollapsed && <span>பணிகள்</span>}
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Sidebar;