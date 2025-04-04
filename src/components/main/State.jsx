import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faTimes,
    faCogs,
    faTable,
    faList,
    faUser,
    faEye
} from "@fortawesome/free-solid-svg-icons";
import "../../style.css";
import Pdf from "../Pdfscreen/pdf";
import axios from "axios";

const State = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOiJBZG1pbkhEIiwiaWF0IjoxNzQzNzQ3MzQ5LCJleHAiOjE3NDQwMDY1NDl9.bjMMr_BUafxUyg5921lxBvjWl0ZtMNqtxdCgq8T90Jg"; // Replace with the actual token

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get(
                    "https://api.naamtamilar.org/api/member/department/list",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Sending token in the header
                        },
                    }
                );
                setDepartments(response.data);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    const [selectedRoles, setSelectedRoles] = useState([]);

    const handleDepartmentChange = (index, field, value) => {
        const department = departments.find(dept => dept._id.toString() === value);
        setSelectedRoles(department ? department.roles : []);

        handleInputChange(index, field, value);
    };


    const [forms, setForms] = useState([{ id: 1, data: {} }]); // Array to store multiple forms
    const [tableForm, setTableForm] = useState([{ id: 1, data: {} }])

    // Function to add a new form
    const addNewForm = () => {
        setForms([...forms, { id: forms.length + 1, data: {} }]);
    };

    const addNewTableForm = () => {
        setTableForm([...tableForm, { id: tableForm.length + 1, data: {} }]);
    }

    const removeForm = (index) => {
        if (forms.length > 1) {
            setForms(forms.filter((_, i) => i !== index));
        }
    };

    const removeTableForm = (index) => {
        if (tableForm.length > 1) {
            setTableForm(tableForm.filter((_, i) => i !== index));
        }
    }

    // Handle form data change
    const fetchMemberData = async (memberNumber) => {
        try {
            const response = await fetch(`https://api.naamtamilar.org/api/base/name/${memberNumber}`);
            if (!response.ok) throw new Error('Data not found');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    };

    // Handle form data change
    const handleInputChange = async (index, field, value, isTableForm = false) => {

        if (field === "memberNumber") {
            const memberData = await fetchMemberData(value);

            const mappedData = memberData
                ? {
                    memberNumber: value,
                    name: memberData.name,
                    fatherName: memberData.sname,
                    voteNumber: memberData.boothId,
                    fullName: `${memberData.name} ${memberData.sname}`,
                    image: `http://join.naamtamilar.org/${value}.jpg`

                }
                : { memberNumber: value };

            if (isTableForm) {
                setTableForm(prev => {
                    const updated = [...prev];
                    updated[index].data = mappedData;
                    return updated;
                });
            } else {
                setForms(prev => {
                    const updated = [...prev];
                    updated[index].data = mappedData;
                    return updated;
                });
            }
        } else {
            if (isTableForm) {
                setTableForm(prev => {
                    const updated = [...prev];
                    updated[index].data[field] = value;
                    return updated;
                });
            } else {
                setForms(prev => {
                    const updated = [...prev];
                    updated[index].data[field] = value;
                    return updated;
                });
            }
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", forms);
        alert("Form data submitted! Check console.");
    };

    return (
        <div className="tab-content">
            <div
                className="d-flex justify-content-between align-items-center mb-4 mt-4 bg-white p-3 shadow-sm sticky-top"
                style={{ top: "0", zIndex: "1020" }}
            >
                <h6 className="text-start mb-0"><b>பொறுப்பாளர்கள் தகவல்கள்</b></h6>

                <div className="d-flex align-items-center gap-3">
                    {/* Display Count */}
                    <span className="fw-bold">புதிய பொறுப்பாளர் தகவல்களின்  எண்ணிக்கை : {forms.length}</span>

                    {/* Add Button */}
                    <Button className="flex-shrink-0" style={{ backgroundColor: "#FAE818", color: "#000", border: "none" }} onClick={addNewForm}>+ Add</Button>
                </div>
            </div>
            <div className="scrollable-form">
                <Form onSubmit={handleSubmit}>
                    {forms.map((form, index) => (
                        <div key={form.id} className="mb-4 border p-3 rounded shadow-sm form-area">
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
                                            type="number"
                                            onChange={(e) => handleInputChange(index, "number", e.target.value)}
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            {/* Second Row */}
                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group className="mb-3">
                                        <Form.Label>கட்சிப்பொறுப்பு நிலை</Form.Label>
                                        <Form.Select onChange={(e) => handleInputChange(index, "party_responsibility_status", e.target.value)}>
                                            <option>தேர்ந்தெடு</option>
                                            <option value="state">மாநிலம் </option>
                                            <option value="zone">மண்டலம்</option>
                                            <option value="party_district">கட்சி மாவட்டம்</option>
                                            <option value="vol">தொகுதி</option>
                                            <option value="branch">கிளை</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3">
                                        <Form.Label>பொறுப்பு</Form.Label>
                                        <Form.Select onChange={(e) => handleDepartmentChange(index, "responsibility", e.target.value)}>
                                            <option>தேர்ந்தெடு</option>
                                            {departments.map((dept) => (
                                                <option key={dept._id} value={dept._id}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>

                            {/* Input Field to Show Selected Value */}
                            {/* */}

                            {((forms[index].data.party_responsibility_status === "state" || forms[index].data.party_responsibility_status === "zone" || forms[index].data.party_responsibility_status === "party_district")) && (
                                <div className="mb-4 p-3 mt-4" style={{ border: "1px solid black" }}>

                                    {/* First Row: Showing Appointment */}
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <Form.Group>
                                                <Form.Label>தேர்ந்தெடுக்கப்பட்ட பொ.நியமனம்</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="choosen_appointment"
                                                    value={forms[index].data.appointment || ""}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </div>

                                        {/* Add Button Aligned to Right */}
                                        <div className="col-md-8 d-flex justify-content-end align-items-end">
                                            <Button className="flex-shrink-0" style={{ backgroundColor: "#FAE818", color: "#000", border: "none" }} onClick={addNewTableForm}>
                                                <b>+</b>
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Table for Other Details */}
                                    <table className="table table-bordered text-center">
                                        <thead className="table-light">
                                            <tr style={{ width: "100%" }}>
                                                <th style={{ width: "20%" }}>பொறுப்பு</th>
                                                <th style={{ width: "20%" }}>உறுப்பினர் எண்</th>
                                                <th style={{ width: "20%" }}>முழுப் பெயர்</th>
                                                <th style={{ width: "10%" }}>வாக்கக எண்</th>
                                                <th style={{ width: "15%" }}>பெயர்</th>
                                                <th style={{ width: "15%" }}>த/க பெயர்</th>
                                                <th style={{ width: "10%" }}>புகைப்படம்</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        {tableForm.map((form, index) => (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>
                                                        <Form.Select
                                                            value={form.data?.role || ""}
                                                            onChange={(e) => handleInputChange(index, "role", e.target.value)}
                                                        >
                                                            <option>தேர்ந்தெடு</option>
                                                            {selectedRoles.map((role) => (
                                                                <option key={role.id} value={role.id}>
                                                                    {role.name}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            value={form.data.memberNumber || ""}
                                                            onBlur={(e) => handleInputChange(index, "memberNumber", e.target.value, true)}
                                                            onChange={(e) => {
                                                                const updated = [...tableForm];
                                                                updated[index].data.memberNumber = e.target.value;
                                                                setTableForm(updated);
                                                            }}
                                                        />

                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            value={form.data.fullName || ""}
                                                            onChange={(e) => handleInputChange(index, "fullName", e.target.value, true)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            value={form.data.voteNumber || ""}
                                                            onChange={(e) => handleInputChange(index, "voteNumber", e.target.value, true)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            value={form.data.name || ""}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            value={form.data.fatherName || ""}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>
                                                        {form.data.image ? (
                                                            <img
                                                                src={form.data.image}
                                                                alt="Member"
                                                                className="img-fluid"
                                                                style={{
                                                                    width: "50px",
                                                                    height: "50px",
                                                                    borderRadius: "50%",
                                                                    objectFit: "cover",
                                                                    alignContent: "center"
                                                                }}
                                                            />
                                                        ) : (
                                                            <i
                                                                className="fa fa-user"
                                                                style={{
                                                                    fontSize: "24px",
                                                                    width: "50px",
                                                                    height: "50px",
                                                                    borderRadius: "50%",
                                                                    display: "flex",
                                                                    alignContent: "center",
                                                                    justifyContent: "center",
                                                                    backgroundColor: "#e0e0e0"
                                                                }}
                                                                aria-hidden="true"
                                                            ></i>
                                                        )}
                                                    </td>

                                                    <td>
                                                        <FontAwesomeIcon
                                                            style={{
                                                                border: "none",
                                                                backgroundColor: "#EE1B24",
                                                                borderRadius: "5px",
                                                                padding: "10px",
                                                                cursor: "pointer",
                                                                marginTop: "20px"
                                                            }}
                                                            icon={faTimes}
                                                            onClick={() => removeTableForm(index)}
                                                            disabled={tableForm.length === 1}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}

                                    </table>
                                </div>
                            )}

                            {/* Modal */}
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={() => setModalIsOpen(false)}
                                style={{
                                    content: {
                                        width: "60%", // Adjust width as needed
                                        maxHeight: "80vh", // Limits the modal height
                                        margin: "auto",
                                        borderRadius: "10px",
                                        overflowY: "auto", // Enables scrolling inside the modal
                                        padding: "20px",
                                        zIndex: "1050", // Ensures modal is above sticky header
                                    },
                                    overlay: {
                                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                                        zIndex: "1040",
                                    },
                                }}
                            >
                                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                    <button
                                        onClick={() => setModalIsOpen(false)}
                                        style={{
                                            alignSelf: "flex-end",
                                            marginBottom: "10px",
                                            padding: "5px 10px",
                                            background: "red",
                                            color: "white",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Close
                                    </button>
                                    <div style={{ overflowY: "auto", maxHeight: "70vh", paddingRight: "10px" }}>
                                        <Pdf />
                                    </div>
                                </div>
                            </Modal>

                            {/* Remove Button */}
                            <div className="text-end">
                                <Button style={{ backgroundColor: "#EE1B24", border: "none", color: "#000" }} onClick={() => removeForm(index)} disabled={forms.length === 1}>
                                    அகற்று
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Submit All Forms Button */}
                    <div className="text-center">
                        <Button className="button" style={{ backgroundColor: "#FAE818", color: "#000", border: "none" }} onClick={() => setModalIsOpen(true)}>
                            <FontAwesomeIcon icon={faEye} />
                        </Button>
                        <Button className="button" style={{ backgroundColor: "#FAE818", color: "#000", border: "none", marginLeft: "20px" }} type="submit">
                            <b>சேமி</b>
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default State; // Ensure default export
