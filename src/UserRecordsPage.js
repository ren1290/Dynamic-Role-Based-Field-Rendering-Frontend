import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './UserRecordsPage.css';

const UserRecordsPage = () => {
    const location = useLocation();
    const { userName } = location.state || {}; // Get userName from location state
    const [userRecords, setUserRecords] = useState([]);
    const [editRecordId, setEditRecordId] = useState(null); // Track which record is being edited
    const [editedValues, setEditedValues] = useState({});   // Track the edited values

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ];

    const countryOptions = [
        { value: 'usa', label: 'United States' },
        { value: 'canada', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' }
    ];

    useEffect(() => {
        const fetchUserRecords = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user-inputs/${userName}`);
                setUserRecords(response.data);
            } catch (error) {
                console.error('Error fetching user records:', error);
            }
        };
        fetchUserRecords();
    }, [userName]);

    // Grouping the records by recordId
    const groupedRecords = userRecords.reduce((acc, record) => {
        const { recordId, value } = record;
        if (!acc[recordId]) {
            acc[recordId] = { recordId, firstName: '', lastName: '', gender: '', designation: '', phone: '', country: '', address: '' };
        }

        switch (record.fieldId) {
            case 1:
                acc[recordId].firstName = value;
                break;
            case 2:
                acc[recordId].lastName = value;
                break;
            case 3:
                acc[recordId].gender = value;
                break;
            case 4:
                acc[recordId].designation = value;
                break;
            case 5:
                acc[recordId].phone = value;
                break;
            case 6:
                acc[recordId].country = value;
                break;
            case 7:
                acc[recordId].address = value;
                break;
            default:
                break;
        }
        return acc;
    }, {});

    const recordsArray = Object.values(groupedRecords);

    const handleInputChange = (recordId, fieldName, value) => {
        setEditedValues({
            ...editedValues,
            [recordId]: { ...editedValues[recordId], [fieldName]: value }
        });
    };

    const saveChanges = async (record) => {
        const updatedRecord = editedValues[record.recordId];
        const fieldIdMapping = {
            firstName: 1,
            lastName: 2,
            gender: 3,
            designation: 4,
            phone: 5,
            country: 6,
            address: 7
        };

        const updatedFields = {};
        for (let field in updatedRecord) {
            const fieldId = fieldIdMapping[field];
            updatedFields[fieldId] = updatedRecord[field];
        }

        try {
            await axios.put(`http://localhost:8080/${userName}/${record.recordId}/update`, updatedFields);
            alert("Record updated successfully");

            // Fetch the updated user records after saving changes
            const response = await axios.get(`http://localhost:8080/user-inputs/${userName}`);
            setUserRecords(response.data); // Update the state with the new records
        } catch (error) {
            console.error('Error updating record:', error);
            alert("Error updating record");
        }
        setEditRecordId(null); // Exit edit mode
    };

    return (
        <div className="recordsContainer">
            <h1 className="header">User Records</h1>
            {recordsArray.length > 0 ? (
                <table className="recordsTable">
                    <thead>
                        <tr>
                            <th>Record ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Designation</th>
                            {userName === 'userB' && (
                                <>
                                    <th>Phone</th>
                                    <th>Country</th>
                                    <th>Address</th>
                                </>
                            )}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordsArray.map((record) => (
                            <tr key={record.recordId}>
                                <td>{record.recordId}</td>
                                <td>
                                    {editRecordId === record.recordId ? (
                                        <input
                                            type="text"
                                            value={editedValues[record.recordId]?.firstName || record.firstName}
                                            onChange={(e) => handleInputChange(record.recordId, 'firstName', e.target.value)}
                                        />
                                    ) : (
                                        record.firstName
                                    )}
                                </td>
                                <td>
                                    {editRecordId === record.recordId ? (
                                        <input
                                            type="text"
                                            value={editedValues[record.recordId]?.lastName || record.lastName}
                                            onChange={(e) => handleInputChange(record.recordId, 'lastName', e.target.value)}
                                        />
                                    ) : (
                                        record.lastName
                                    )}
                                </td>
                                <td>
                                    {editRecordId === record.recordId ? (
                                        <select
                                            value={editedValues[record.recordId]?.gender || record.gender}
                                            onChange={(e) => handleInputChange(record.recordId, 'gender', e.target.value)}
                                        >
                                            {genderOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        record.gender
                                    )}
                                </td>
                                <td>
                                    {editRecordId === record.recordId ? (
                                        <input
                                            type="text"
                                            value={editedValues[record.recordId]?.designation || record.designation}
                                            onChange={(e) => handleInputChange(record.recordId, 'designation', e.target.value)}
                                        />
                                    ) : (
                                        record.designation
                                    )}
                                </td>
                                {userName === 'userB' && (
                                    <>
                                        <td>
                                            {editRecordId === record.recordId ? (
                                                <input
                                                    type="text"
                                                    value={editedValues[record.recordId]?.phone || record.phone}
                                                    onChange={(e) => handleInputChange(record.recordId, 'phone', e.target.value)}
                                                />
                                            ) : (
                                                record.phone || 'N/A'
                                            )}
                                        </td>
                                        <td>
                                            {editRecordId === record.recordId ? (
                                                <select
                                                    value={editedValues[record.recordId]?.country || record.country}
                                                    onChange={(e) => handleInputChange(record.recordId, 'country', e.target.value)}
                                                >
                                                    {countryOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                record.country || 'N/A'
                                            )}
                                        </td>
                                        <td>
                                            {editRecordId === record.recordId ? (
                                                <input
                                                    type="text"
                                                    value={editedValues[record.recordId]?.address || record.address}
                                                    onChange={(e) => handleInputChange(record.recordId, 'address', e.target.value)}
                                                />
                                            ) : (
                                                record.address || 'N/A'
                                            )}
                                        </td>
                                    </>
                                )}
                                <td>
                                    {editRecordId === record.recordId ? (
                                        <button onClick={() => saveChanges(record)}>Save</button>
                                    ) : (
                                        <button onClick={() => setEditRecordId(record.recordId)}>Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No records found.</p>
            )}
        </div>
    );
};

export default UserRecordsPage;
