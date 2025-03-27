import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Zone = () => {
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
        <div className="tab-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-start w-100"></h4>
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
                            <div className="mb-4 border p-3 rounded shadow-sm mt-4">

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
    );
}

export default Zone; // Ensure default export
