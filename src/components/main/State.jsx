import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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

const State = () => {
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
    const handleInputChange = (index, field, value, isTableForm = false) => {
        if (isTableForm) {
            // Update the tableForm data
            setTableForm(prevTableForms => {
                const updatedTableForms = [...prevTableForms];
                updatedTableForms[index] = {
                    ...updatedTableForms[index],
                    data: {
                        ...updatedTableForms[index].data,
                        [field]: value, // Update the field in the table form
                    },
                };
                return updatedTableForms;
            });
        } else {
            // Update the main form data
            setForms(prevForms => {
                const updatedForms = [...prevForms];
                updatedForms[index] = {
                    ...updatedForms[index],
                    data: {
                        ...updatedForms[index].data,
                        [field]: value, // Update the field in the form
                    },
                };

                // Reset "appointment" if "responsibility" changes
                if (field === "responsibility") {
                    updatedForms[index].data.appointment = "";
                }

                return updatedForms;
            });
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
                    <Button className="flex-shrink-0" style={{backgroundColor:"#FAE818",color:"#000",border:"none"}} onClick={addNewForm}>+ Add</Button>
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
                        {(forms[index].data.appointment && (forms[index].data.party_responsibility_status === "state" || forms[index].data.party_responsibility_status === "zone")) && (
                            <div className="mb-4 p-3 mt-4" style={{border:"1px solid black", borderRadius:"5px"}}>

                                {/* First Row: Showing Appointment */}
                                <div className="mb-3 col-md-4">
                                    <Form.Group>
                                        <Form.Label>தேர்ந்தெடுக்கப்பட்ட
                                            பொ.நியமனம்</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={forms[index].data.appointment || ""}
                                            readOnly
                                        />
                                    </Form.Group>
                                </div>

                                {/* Table for Other Details */}
                                <table className="table table-bordered text-center">
                                    <thead className="table-light">
                                        <tr style={{ width: "100%" }}>
                                            <th style={{ width: "25%" }}>உறுப்பினர் எண்</th>
                                            <th style={{ width: "25%" }}>முழுப் பெயர்</th>
                                            <th style={{ width: "10%" }}>வாக்கக எண்</th>
                                            <th style={{ width: "15%" }}>பெயர்</th>
                                            <th style={{ width: "15%" }}>த/க பெயர்</th>
                                            <th style={{ width: "10%" }}>புகைப்படம்</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Form.Control type="text" />
                                            </td>
                                            <td>
                                                <Form.Control type="text" />
                                            </td>
                                            <td>
                                                <Form.Control type="text" />
                                            </td>
                                            <td>
                                                <Form.Control type="text" readOnly />
                                            </td>
                                            <td>
                                                <Form.Control type="text" readOnly />
                                            </td>
                                            <td>
                                                <img
                                                    src="Header.jpg"
                                                    alt="Description"
                                                    className="img-fluid rounded"
                                                    style={{ maxWidth: "80px", height: "80px" }}
                                                    readOnly
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        )}

                        {(forms[index].data.appointment && (forms[index].data.party_responsibility_status === "party_district" || forms[index].data.party_responsibility_status === "vol" || forms[index].data.party_responsibility_status === "branch")) && (
                            <div className="mb-4 p-3 mt-4" style={{border:"1px solid black"}}>

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
                                        <Button className="flex-shrink-0" style={{backgroundColor:"#FAE818",color:"#000",border:"none"}} onClick={addNewTableForm}>
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
                                        </tr>
                                    </thead>
                                    {tableForm.map((form, index) => (
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Form.Select onChange={(e) => handleInputChange(index, "role", e.target.value)}>
                                                        <option>தேர்ந்தெடு</option>
                                                        <option value="party">கட்சி</option>
                                                        <option value="pasarai">பாசறை</option>
                                                    </Form.Select>
                                                </td>
                                                <td>
                                                    <Form.Control type="text" />
                                                </td>
                                                <td>
                                                    <Form.Control type="text" />
                                                </td>
                                                <td>
                                                    <Form.Control type="text" />
                                                </td>
                                                <td>
                                                    <Form.Control type="text" readOnly />
                                                </td>
                                                <td>
                                                    <Form.Control type="text" readOnly />
                                                </td>
                                                <td>
                                                    <img
                                                        src="Header.jpg"
                                                        alt="Description"
                                                        className="img-fluid rounded"
                                                        style={{ maxWidth: "80px", height: "80px" }}
                                                        readOnly
                                                    />
                                                </td>
                                                <td>
                                                    {/* <Button variant="danger" onClick={() => removeTableForm(index)} disabled={tableForm.length === 1}> */}
                                                        <FontAwesomeIcon style={{border:"none",backgroundColor:"#EE1B24",borderRadius:"5px",padding:"10px",cursor:"pointer"}} icon={faTimes} onClick={() => removeTableForm(index)} disabled={tableForm.length === 1}/>
                                                    {/* </Button> */}
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>

                            </div>
                        )}


                        {/* Remove Button */}
                        <div className="text-end">
                            <Button style={{backgroundColor:"#EE1B24",border:"none",color:"#000"}} onClick={() => removeForm(index)} disabled={forms.length === 1}>
                                - Remove
                            </Button>
                        </div>
                    </div>
                ))}

                {/* Submit All Forms Button */}
                <div className="text-center">
                    <Button className="button" style={{backgroundColor:"#FAE818",color:"#000",border:"none"}} type="submit">
                        <b>சேமி</b>
                    </Button>
                </div>
            </Form>
            </div>
        </div>
    );
}

export default State; // Ensure default export
