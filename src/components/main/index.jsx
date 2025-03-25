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
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const Dashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleTrigger = () => setIsOpen(!isOpen);
    const [forms, setForms] = useState([{ id: 1, data: {} }]); // Array to store multiple forms

    // Function to add a new form
    const addNewForm = () => {
        setForms([...forms, { id: forms.length + 1, data: {} }]);
    };

    const removeForm = (index) => {
        if (forms.length > 1) {
            setForms(forms.filter((_, i) => i !== index));
        }
    };

    // Handle form data change
    const handleInputChange = (index, field, value) => {
        const updatedForms = [...forms];
        updatedForms[index].data[field] = value;

        // Reset "appointment" if "responsibility" changes
        if (field === "responsibility") {
            updatedForms[index].data.appointment = ""; // Reset selection
        }

        setForms(updatedForms);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", forms);
        alert("Form data submitted! Check console.");
    };

    return (
        <div className="App">
            <div className="page">
                <div className={`content-area ${isCollapsed ? "expanded" : ""}`}>
                    <Tabs
                        defaultActiveKey="profile"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="profile" title="மாநிலம்">
                            <div className="tab-content">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-start w-100">Profile Information</h4>
                                    <Button className="col-sm-1" variant="success" onClick={addNewForm}>+ Add</Button>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    {forms.map((form, index) => (
                                        <div key={form.id} className="mb-4 border p-3 rounded shadow-sm">
                                            {/* First Row */}
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>மாவட்டம்</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            onChange={(e) => handleInputChange(index, "district", e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>தொகுதி</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            onChange={(e) => handleInputChange(index, "zone", e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>வாக்கக எண்</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            onChange={(e) => handleInputChange(index, "email", e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </div>

                                            {/* Second Row */}
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>பொறுப்பு</Form.Label>
                                                        <Form.Select onChange={(e) => handleInputChange(index, "responsibility", e.target.value)}>
                                                            <option>தேர்ந்தெடு</option>
                                                            <option value="party">கட்சி</option>
                                                            <option value="pasarai">பாசறை</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>பொறுப்பு நியமனம்</Form.Label>
                                                        <Form.Select value={forms[index].data.appointment || ""} onChange={(e) => handleInputChange(index, "appointment", e.target.value)}>
                                                            <option value="">தேர்ந்தெடு</option>

                                                            {/* Show only if "responsibility" is "party" */}
                                                            {forms[index].data.responsibility === "party" && (
                                                                <>
                                                                    <option value="மாநில ஒருங்கிணைப்பாளர்">மாநில ஒருங்கிணைப்பாளர்</option>
                                                                    {/* <option value="district-leader">மாவட்ட தலைவர்</option> */}
                                                                </>
                                                            )}

                                                            {/* Show only if "responsibility" is "pasarai" */}
                                                            {forms[index].data.responsibility === "pasarai" && (
                                                                <>
                                                                    <option value="பாசறை மாநில ஒருங்கிணைப்பாளர்">பாசறை மாநில ஒருங்கிணைப்பாளர்</option>
                                                                    <option value="மாவட்ட மாநில ஒருங்கிணைப்பாளர்">மாவட்ட மாநில ஒருங்கிணைப்பாளர்</option>
                                                                </>
                                                            )}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </div>
                                            </div>

                                            {/* Input Field to Show Selected Value */}
                                            {forms[index].data.appointment && (
                                                <div className="row mb-4 border p-3 rounded shadow-sm mt-4">
                                                    <div className="col-md-3">
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>தேர்ந்தெடுக்கப்பட்ட பொ.நியமனம்</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                value={forms[index].data.appointment || ""}
                                                                readOnly
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>உறுப்பினர் எண்</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>முழுப் பெயர்</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>வாக்கக எண்</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Remove Button */}
                                            <div className="text-end">
                                                <Button variant="danger" onClick={() => removeForm(index)} disabled={forms.length === 1}>
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Submit All Forms Button */}
                                    <div className="text-center">
                                        <Button className="button" variant="primary" type="submit">
                                            சேமி
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Tab>
                        <Tab eventKey="home" title="மண்டலம்">
                            Tab content for Home
                        </Tab>
                        <Tab eventKey="longer-tab" title="கட்சி மாவட்டம்">
                            Tab content for Loooonger Tab
                        </Tab>
                        <Tab eventKey="contact" title="தொகுதி">
                            Tab content for Contact
                        </Tab>
                        <Tab eventKey="contact" title="கிளை ">
                            Tab content for Contact
                        </Tab>
                    </Tabs>
                </div>

                <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
                    <div className="toggle-button" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={isCollapsed ? faBars : faTimes} />
                    </div>

                    <div className="sidebar-menu">
                        <div className="sidebar-item">
                            <FontAwesomeIcon icon={faUser} />
                            {!isCollapsed && <span>Home</span>}
                        </div>
                        <div className="sidebar-item">
                            <FontAwesomeIcon icon={faCogs} />
                            {!isCollapsed && <span>Settings</span>}
                        </div>
                        <div className="sidebar-item">
                            <FontAwesomeIcon icon={faTable} />
                            {!isCollapsed && <span>Reports</span>}
                        </div>
                        <div className="sidebar-item">
                            <FontAwesomeIcon icon={faList} />
                            {!isCollapsed && <span>Tasks</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard; // Ensure default export
