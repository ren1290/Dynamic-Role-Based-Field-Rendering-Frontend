import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage'; 
import FieldsPage from './FieldsPage'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/fields" element={<FieldsPage />} /> {}
            </Routes>
        </Router>
    );
};

export default App;
