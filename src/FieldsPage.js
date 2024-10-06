import React from 'react';
import { useLocation } from 'react-router-dom'; 
import './FieldsPage.css'; 

const FieldsPage = () => {
    const location = useLocation(); 
    const { fields } = location.state || { fields: [] }; 

    return (
        <div className="fieldsContainer">
            <h1 className="header">Fields</h1>
            {fields.length > 0 ? (
                <form>
                    {fields.map((field) => (
                        <div key={field.fieldId} className="formGroup">
                            <label className="label">{field.fieldName}</label>
                            <input
                                type="text"
                                placeholder={field.fieldName} 
                                className="input" 
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
