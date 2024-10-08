import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './UserRecordsPage.css';

const UserRecordsPage = () => {
    const location = useLocation();
    const { userName } = location.state || {}; 
    const [userRecords, setUserRecords] = useState([]);

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

    const groupedRecords = userRecords.reduce((acc, record) => {
        const { recordId, userName, value } = record;

        if (!acc[recordId]) {
            acc[recordId] = { recordId, userName, firstName: '', lastName: '', designation: '', phone: '', address: '' };
        }

        switch (record.fieldId) {
            case 1:
                acc[recordId].firstName = value;
                break;
            case 2:
                acc[recordId].lastName = value;
                break;
            case 3:
                acc[recordId].designation = value;
                break;
            case 4:
                acc[recordId].phone = value;  
                break;
            case 5:
                acc[recordId].address = value; 
                break;
            default:
                break;
        }

        return acc;
    }, {});

    const recordsArray = Object.values(groupedRecords);

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
                            <th>Designation</th>
                            {userName === 'userB' && (
                                <>
                                    <th>Phone</th>
                                    <th>Address</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {recordsArray.map((record) => (
                            <tr key={record.recordId}>
                                <td>{record.recordId}</td>
                                <td>{record.firstName}</td>
                                <td>{record.lastName}</td>
                                <td>{record.designation}</td>
                                {userName === 'userB' && (
                                    <>
                                        <td>{record.phone || 'N/A'}</td>
                                        <td>{record.address || 'N/A'}</td>
                                    </>
                                )}
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
