import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginStyles.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password || !userType) {
            setError('אנא מלא את כל השדות');
            return;
        }

        auth.login(username, userType);
        navigate(userType === 'teacher' ? '/teacher' : '/student');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>ברוכים הבאים לאפליקציית לימוד מתמטיקה</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>שם משתמש:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>סיסמה:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>סוג משתמש:</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="teacher"
                                    onChange={() => setUserType('teacher')}
                                />
                                מורה
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="student"
                                    onChange={() => setUserType('student')}
                                />
                                תלמיד
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="login-button">התחבר</button>
                </form>
            </div>
        </div>
    );
}

export default Login;