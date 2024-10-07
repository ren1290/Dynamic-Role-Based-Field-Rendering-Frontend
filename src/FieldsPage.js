import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 
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

    return (
        <div className="fieldsContainer">
            <h1 className="header">Fields</h1>
            {fields.length > 0 ? (
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div key={field.fieldId} className="formGroup">
                            <label className="label">{field.fieldName}</label>
                            <input
                                type="text"
                                placeholder={field.fieldName} 
                                className="input" 
                                onChange={(event) => handleInputChange(field.fieldId, event)} 
                            />
                        </div>
                    ))}
                    <button type="submit" className="button">Submit</button>
                </form>
            ) : (
                <p>No fields available</p>
            )}
        </div>
    );
};

export default FieldsPage;
