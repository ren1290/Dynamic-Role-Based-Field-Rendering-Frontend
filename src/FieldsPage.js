import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom'; 
import './FieldsPage.css'; 

const FieldsPage = () => {
    const location = useLocation(); 
    const { fields = [], userName = '' } = location.state || {}; 

    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (fieldId, event) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [fieldId]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = Object.entries(inputValues).map(([fieldId, value]) => ({
            userName,              
            fieldId: parseInt(fieldId), 
            value,                    
        }));
    
        try {
            const response = await axios.post('http://localhost:8080/user-inputs', data);
    
            if (response.status === 200) {
                alert('Data submitted successfully!');
            } else {
                alert('Failed to submit data.');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const fieldOptions = {
        3: [ 
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
        ],
        6: [ 
            { value: 'USA', label: 'USA' },
            { value: 'Canada', label: 'Canada' },
            { value: 'UK', label: 'UK' },
        ],
    };

    return (
        <div className="fieldsContainer">
            <h1 className="header">Fields</h1>
            {fields.length > 0 ? (
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div key={field.fieldId} className="formGroup">
                            <label className="label">{field.fieldName}</label>
                            {field.fieldType === 'text' && (
                                <input
                                    type="text"
                                    placeholder={field.fieldName} 
                                    className="input" 
                                    onChange={(event) => handleInputChange(field.fieldId, event)} 
                                />
                            )}
                            {field.fieldType === 'radio' && fieldOptions[field.fieldId].map((option) => (
                                <label key={option.value}>
                                    <input
                                        type="radio"
                                        value={option.value}
                                        name={`gender-${field.fieldId}`}
                                        onChange={(event) => handleInputChange(field.fieldId, event)}
                                    />
                                    {option.label}
                                </label>
                            ))}
                            {field.fieldType === 'dropdown' && (
                                <select
                                    className="input"
                                    onChange={(event) => handleInputChange(field.fieldId, event)}
                                >
                                    <option value="">Select {field.fieldName}</option>
                                    {fieldOptions[field.fieldId].map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ))}
                    <button type="submit" className="button">Submit</button>
                </form>
            ) : (
                <p>No fields available</p>
            )}
            <Link to="/user-records" state={{ userName }} className="link">View User Records</Link>
        </div>
    );
};

export default FieldsPage;
