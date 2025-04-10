import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { Spinner } from "react-bootstrap";
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
import axiosInstance from "../axios";
import Pdf1 from "../Pdfscreen/pdf1";

const State = () => {

    const navigate = useNavigate();

    const responsibilityLabels = {
        state: "மாநிலம்",
        zone: "மண்டலம்",
        party_district: "கட்சி மாவட்டம்",
        vol: "தொகுதி",
        branch: "கிளை",
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [district, setDistricts] = useState([]);
    const [constituency, setConstituency] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [zones, setZones] = useState([]);
    const [forms, setForms] = useState([{ id: 1, data: {}, tableForm: [{ id: 1, data: {} }] }]);

    const emptyTableForm = {
        data: {
            memberNumber: "",
            name: "",
            fatherName: "",
            voteNumber: "",
            fullName: "",
            image: "",
            // add other fields if you have more
        },
        loading: false
    };

    const handleDepartmentChange = (formIndex, field, value) => {
        const department = departments.find(dept => dept._id.toString() === value);
        setSelectedRoles(department ? department.roles : []);


        if (department) {
            handleInputChange(formIndex, null, "appointment", department.name);
        } else {
            handleInputChange(formIndex, null, "appointment", "");
        }
    };

    const handleDistrictChange = async (formIndex, field, value) => {
        const selectedDistrict = district.find(dis => dis._id.toString() === value);


        handleInputChange(formIndex, null, "district_name", selectedDistrict?.name || "");

        // Fetch zones under selected district
        try {
            const response = await axiosInstance.get(
                `https://api.naamtamilar.org/api/location/district/constituency/list/${value}`
            );
            setZones(response.data);
        } catch (error) {
            console.error("Error fetching zones:", error);
            setZones([]);
        }
    };

    const handleZoneChange = (formIndex, field, value) => {
        const selectedZone = zones.find(zone => zone._id.toString() === value);
        handleInputChange(formIndex, null, "zone_name", selectedZone?.name || "");
    };

    const addNewForm = () => {
        setForms(prev => [...prev, { id: prev.length + 1, data: {}, tableForm: [{ id: 1, data: {} }] }]);
    };

    const addNewTableForm = (formIndex) => {
        setForms((prev) =>
            prev.map((form, index) =>
                index === formIndex
                    ? {
                          ...form,
                          tableForm: [
                              ...form.tableForm,
                              { id: form.tableForm.length + 1, data: {} }, // Add new row
                          ],
                      }
                    : form
            )
        );
    };

    const removeForm = (index) => {
        if (forms.length > 1) {
            setForms(forms.filter((_, i) => i !== index));
        }
    };

    const removeTableForm = (formIndex, tableIndex) => {
        setForms(prev => {
            const updated = [...prev];
            const tableForms = updated[formIndex].tableForm;
            if (tableForms.length > 1) {
                updated[formIndex].tableForm = tableForms.filter((_, i) => i !== tableIndex);
            }
            return updated;
        });
    };

    const getAvailableRoles = (formIndex, currentIndex) => {
        const selectedRoleIds = forms[formIndex].tableForm
            .filter((_, idx) => idx !== currentIndex)
            .map(entry => String(entry?.data?.roleId))
            .filter(Boolean);

        return selectedRoles.filter(role => !selectedRoleIds.includes(String(role.id)));
    };

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
    const handleInputChange = async (formIndex, tableIndex, field, value, isTableForm = false) => {
        if (field === "memberNumber") {
            // Show loading spinner
            setForms((prev) => {
                const updated = [...prev];
                const form = { ...updated[formIndex] };
                const tableForm = [...form.tableForm];
                const row = { ...tableForm[tableIndex], loading: true };

                tableForm[tableIndex] = row;
                form.tableForm = tableForm;
                updated[formIndex] = form;
                return updated;
            });

            try {
                const memberData = await fetchMemberData(value);

                const mappedData = memberData
                    ? {
                        memberNumber: value,
                        name: memberData.name,
                        fatherName: memberData.sname,
                        voteNumber: memberData.boothId,
                        fullName: `${memberData.name} ${memberData.sname}`,
                        image: `http://join.naamtamilar.org/${value}.jpg`,
                    }
                    : { memberNumber: value };

                // Set mapped data
                setForms((prev) => {
                    const updated = [...prev];
                    const form = { ...updated[formIndex] };
                    const tableForm = [...form.tableForm];
                    const row = {
                        ...tableForm[tableIndex],
                        data: {
                            ...tableForm[tableIndex].data,
                            ...mappedData,
                        },
                        loading: false,
                    };

                    tableForm[tableIndex] = row;
                    form.tableForm = tableForm;
                    updated[formIndex] = form;
                    return updated;
                });
            } catch (error) {
                console.error("Error fetching member data:", error);

                // Reset loading state in case of error
                setForms((prev) => {
                    const updated = [...prev];
                    const form = { ...updated[formIndex] };
                    const tableForm = [...form.tableForm];
                    const row = { ...tableForm[tableIndex], loading: false };

                    tableForm[tableIndex] = row;
                    form.tableForm = tableForm;
                    updated[formIndex] = form;
                    return updated;
                });
            }
        } else {
            setForms((prev) => {
                const updated = [...prev];
                const form = { ...updated[formIndex] };

                if (isTableForm) {
                    const tableForm = [...form.tableForm];
                    const row = {
                        ...tableForm[tableIndex],
                        data: {
                            ...tableForm[tableIndex].data,
                            [field]: value,
                        },
                    };
                    tableForm[tableIndex] = row;
                    form.tableForm = tableForm;
                } else {
                    form.data = {
                        ...form.data,
                        [field]: value,
                    };
                }

                updated[formIndex] = form;
                return updated;
            });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form Submitted Successfully!");
        console.log("Submitted Data:", forms.map((item) => item.data));

    };

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axiosInstance.get(
                    "https://api.naamtamilar.org/api/member/department/list",

                );
                setDepartments(response.data);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();

        const fetchDistrict = async () => {
            try {
                const response = await axiosInstance.get(
                    "https://api.naamtamilar.org/api/location/district/list/5ae6c7deab123c41f43bb368",

                );
                setDistricts(response.data);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDistrict();

        const fetchConstituency = async () => {
            try {
                const response = await axiosInstance.get(
                    "https://api.naamtamilar.org/api/location/arealist/hlevel/5ae5f4aeab123c41f43bb349",

                );
                setConstituency(response.data);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchConstituency();
    }, []);

    localStorage.setItem("forms", JSON.stringify(forms));

    return (
        <div className="tab-content">
            <div
                className="d-flex justify-content-between align-items-center mb-4 mt-4 bg-white p-3 shadow-sm sticky-top"
                style={{ top: "0", zIndex: "1020" }}>

                <span className="text-start mb-0"><b>பொறுப்பாளர்கள் தகவல்கள்</b></span>

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
                                <h5 className="mb-3">
                                    <b>பொறுப்பாளர் தகவல் #{index + 1}</b>
                                </h5>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3">
                                        <Form.Label>கட்சிப்பொறுப்பு நிலை</Form.Label>
                                        <Form.Select onChange={(e) => {
                                            const value = e.target.value;
                                            const label = responsibilityLabels[value];
                                            handleInputChange(index, null, "party_responsibility_status", { value, label });
                                        }}>
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

                            {(forms[index]?.data?.party_responsibility_status?.value === "state" || forms[index]?.data?.party_responsibility_status?.value === "zone") && (
                                <div className="row">
                                    {/* District Select */}
                                    <div className="col-md-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label>மாவட்டம்</Form.Label>
                                            <Form.Select
                                                onChange={(e) =>
                                                    handleDistrictChange(index, "district", e.target.value)
                                                }

                                            >
                                                <option>தேர்ந்தெடு</option>
                                                {district.map((dis) => (
                                                    <option key={dis._id} value={dis._id}>
                                                        {dis.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </div>

                                    {/* Zone Select */}
                                    <div className="col-md-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label>தொகுதி</Form.Label>
                                            <Form.Select
                                                onChange={(e) =>
                                                    handleZoneChange(index, "zone", e.target.value)
                                                }

                                            >
                                                <option>தேர்ந்தெடு</option>
                                                {zones.map((zone) => (
                                                    <option key={zone._id} value={zone._id}>
                                                        {zone.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </div>

                                    {/* Vote Number Input */}
                                    <div className="col-md-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label>வாக்கக எண்</Form.Label>
                                            <Form.Control
                                                type="number"

                                                onChange={(e) =>
                                                    handleInputChange(index, null, "number", e.target.value)
                                                }
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            )}

                            {((forms[index].data.party_responsibility_status?.value === "party_district")) && (
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
                            )}

                            {form.tableForm.map((tableForm, formIndex) => {

                                console.log(form);

                                return (
                                    (
                                        form.data.party_responsibility_status?.value === "state" ||
                                        form.data.party_responsibility_status?.value === "zone" ||
                                        form.data.party_responsibility_status?.value === "party_district"
                                    ) &&
                                    (
                                        <div key={formIndex} className="mb-4 p-3 mt-4" style={{ border: "1px solid black" }}>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <Form.Group>
                                                        <Form.Label>தேர்ந்தெடுக்கப்பட்ட பொ.நியமனம்</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="choosen_appointment"
                                                            value={form.data.appointment || ""}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className="col-md-8 d-flex justify-content-end align-items-end">
                                                    <Button
                                                        className="flex-shrink-0"
                                                        style={{ backgroundColor: "#FAE818", color: "#000", border: "none" }}
                                                        onClick={() => addNewTableForm(index)} // Use `index` instead of `formIndex`
                                                    >
                                                        <b>+</b>
                                                    </Button>
                                                </div>
                                            </div>

                                            <table className="table table-bordered text-center">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>பொறுப்பு</th>
                                                        <th>உறுப்பினர் எண்</th>
                                                        <th>முழுப் பெயர்</th>
                                                        <th>வாக்கக எண்</th>
                                                        <th>பெயர்</th>
                                                        <th>த/க பெயர்</th>
                                                        <th>புகைப்படம்</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {form.tableForm.map((tableForm, tableIndex) => (
                                                        <tr key={tableIndex}>
                                                            <td>
                                                                <Form.Select
                                                                    value={tableForm.data.roleId || ""}
                                                                    onChange={(e) =>
                                                                        handleInputChange(index, tableIndex, "roleId", e.target.value, true)
                                                                    }
                                                                >
                                                                    <option value="">தேர்ந்தெடு</option>
                                                                    {getAvailableRoles(index, tableIndex).map((role) => (
                                                                        <option key={role.id} value={String(role.name)}>
                                                                            {role.name}
                                                                        </option>
                                                                    ))}
                                                                </Form.Select>
                                                            </td>
                                                            <td>
                                                                <Form.Group>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={tableForm.data.memberNumber || ""}
                                                                        onBlur={(e) =>
                                                                            handleInputChange(index, tableIndex, "memberNumber", e.target.value, true)
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleInputChange(index, tableIndex, "memberNumber", e.target.value, true)
                                                                        }
                                                                    />
                                                                    {tableForm?.loading && <Spinner animation="border" size="sm" />}
                                                                </Form.Group>
                                                            </td>
                                                            <td>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={tableForm.data.fullName || ""}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={tableForm.data.voteNumber || ""}
                                                                    onChange={(e) =>
                                                                        handleInputChange(index, tableIndex, "voteNumber", e.target.value, true)
                                                                    }
                                                                />
                                                            </td>
                                                            <td>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={tableForm.data.name || ""}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={tableForm.data.fatherName || ""}
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                {tableForm.data.image ? (
                                                                    <img
                                                                        src={tableForm.data.image}
                                                                        alt="Member"
                                                                        style={{
                                                                            width: 50,
                                                                            height: 50,
                                                                            borderRadius: "50%",
                                                                            objectFit: "cover",
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <i
                                                                        className="fa fa-user"
                                                                        style={{
                                                                            fontSize: 24,
                                                                            width: 50,
                                                                            height: 50,
                                                                            borderRadius: "50%",
                                                                            backgroundColor: "#e0e0e0",
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                            alignItems: "center",
                                                                        }}
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
                                                                        marginTop: "20px",
                                                                    }}
                                                                    icon={faTimes}
                                                                    onClick={() => removeTableForm(index, tableIndex)}
                                                                    disabled={form.tableForm.length === 1}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                )
                            })}
                            {/* Modal */}
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={() => setModalIsOpen(false)}
                                style={{
                                    content: {
                                        width: "60%",
                                        maxHeight: "80vh",
                                        margin: "auto",
                                        borderRadius: "10px",
                                        overflowY: "auto",
                                        padding: "20px",
                                        zIndex: "1050",
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
                                        {Array.isArray(forms) && forms.length > 0 ? (
                                            forms[index]?.tableForm?.length > 1 ? (
                                                <Pdf1 formData={forms} />
                                            ) : (
                                                <Pdf formData={forms} />
                                            )
                                        ) : (
                                            <div>No data available</div>
                                        )}
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
                        <Button type="submit" className="button" style={{ backgroundColor: "#FAE818", color: "#000", border: "none", marginLeft: "20px" }}>
                            <b>சேமி</b>
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default State; // Ensure default export
