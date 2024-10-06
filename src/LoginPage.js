import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setUserNameError('');
        setPasswordError('');
        let isValid = true;

        if (userName.trim() === '') {
            setUserNameError('Username is required');
            isValid = false;
        }

        if (password.trim() === '') {
            setPasswordError('Password is required');
            isValid = false;
        }

        if (!isValid) return;

        try {
            const response = await axios.post('http://localhost:8080/login', {
                userName,
                password,
            });

            if (response.status === 200) {
                navigate('/fields', { state: { fields: response.data } });
                setError('');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    const handleUserNameFocus = () => {
        setUserNameError(''); 
    };

    const handlePasswordFocus = () => {
        setPasswordError(''); 
    };

    return (
        <div className="container">
            <h1 className="header">Login</h1>
            <form onSubmit={handleLogin} className="form" noValidate>
                <div className="formGroup">
                    <label className="label">
                        Username:
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onFocus={handleUserNameFocus} 
                            className={`input ${userNameError ? 'errorInput' : ''}`}
                        />
                    </label>
                    {}
                    {userNameError && <p className="inputError">{userNameError}</p>}
                </div>

                <div className="formGroup">
                    <label className="label">
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={handlePasswordFocus} 
                            className={`input ${passwordError ? 'errorInput' : ''}`}
                        />
                    </label>
                    {}
                    {passwordError && <p className="inputError">{passwordError}</p>}
                </div>

                <button type="submit" className="button">Login</button>
            </form>
            {}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LoginPage;
