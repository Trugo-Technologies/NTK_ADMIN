import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faTimes,
    faCogs,
    faTable,
    faList,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import "../../style.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import State from "../main/State";
import Zone from "../main/Zone";

const Dashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // const [isOpen, setIsOpen] = useState(false);

    // const handleTrigger = () => setIsOpen(!isOpen);

    return (
        <div className="App">
            <div className="page">
                {/* <div className={`content-area ${isCollapsed ? "expanded" : ""}`}>
                    <Tabs
                        defaultActiveKey="profile"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="profile" title="பொறுப்பாளர்கள் தகவல்கள் ">
                            <State />
                        </Tab>
                        <Tab eventKey="home" title="மண்டலம்">
                            <Zone />
                        </Tab>
                        <Tab eventKey="longer-tab" title="கட்சி மாவட்டம்">
                            Tab content for Loooonger Tab
                        </Tab>
                        <Tab eventKey="contact" title="தொகுதி">
                            Tab content for Contact
                        </Tab>
                        <Tab eventKey="contact" title="கிளை">
                            Tab content for Contact
                        </Tab>
                    </Tabs>
                </div> */}
                <div className={`content-area ${isCollapsed ? "expanded" : ""}`}>
                    <State />
                </div>

                <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>

                    <div className="toggle-button" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={isCollapsed ? faBars : faTimes} />
                    </div>

                    <div className="sidebar-menu">
                    <div className="sidebar-item">
                            <img style={{width:"100%"}} src="NTK_logo.png" alt="" />
                        </div>
                        <div className="sidebar-item">
                            <FontAwesomeIcon icon={faUser} />
                            {!isCollapsed && <span>முகப்பு</span>}
                        </div>
                        <div className="sidebar-item">
                            <FontAwesomeIcon icon={faCogs} />
                            {!isCollapsed && <span>அமைப்புகள்</span>}
                        </div>
                        <div className="sidebar-item">
                            <FontAwesomeIcon icon={faTable} />
                            {!isCollapsed && <span>அறிக்கைகள்</span>}
                        </div>
                        <div className="sidebar-item">
                            <FontAwesomeIcon icon={faList} />
                            {!isCollapsed && <span>பணிகள்</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard; // Ensure default export
