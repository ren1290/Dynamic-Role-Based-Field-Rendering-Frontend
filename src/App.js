import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage'; 
import FieldsPage from './FieldsPage'; 
import UserRecordsPage from './UserRecordsPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/fields" element={<FieldsPage />} />
                <Route path="/user-records" element={<UserRecordsPage />} /> {}
            </Routes>
        </Router>
    );
};

export default App;
