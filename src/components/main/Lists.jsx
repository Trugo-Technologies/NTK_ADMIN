import React, { useState } from "react";
import { Table } from "react-bootstrap";

const Lists = () => {
    const hardcodedData = [
        {
            memberId: "001",
            fullName: "அருண் குமார்",
            voteNumber: "V1234",
            name: "அருண்",
            districtName: "சென்னை",
            photo: "Header.jpg",
        },
        {
            memberId: "002",
            fullName: "முரளி ராஜ்",
            voteNumber: "V5678",
            name: "முரளி",
            districtName: "கோவை",
            photo: "Header.jpg",
        },
    ];

    return (
        <div className="container mt-4">
            <h6 className="mb-3"><b>விவர அட்டை:</b></h6>
            <Table striped bordered hover className="text-center">
                <thead className="table-light">
                    <tr>
                        <th>வ.எண் </th>
                        <th>உறுப்பினர் எண்</th>
                        <th>முழுப் பெயர்</th>
                        <th>வாக்கக எண்</th>
                        <th>பெயர்</th>
                        <th>த/க பெயர்</th>
                        <th>புகைப்படம்</th>
                    </tr>
                </thead>
                <tbody>
                    {hardcodedData.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.memberId}</td>
                            <td>{row.fullName}</td>
                            <td>{row.voteNumber}</td>
                            <td>{row.name}</td>
                            <td>{row.districtName}</td>
                            <td>
                                <img
                                    src={row.photo}
                                    alt="Profile"
                                    className="img-fluid rounded"
                                    style={{ maxWidth: "80px", height: "80px" }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Lists;