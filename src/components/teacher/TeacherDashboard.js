import React from 'react';
import { Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StudentsList from './StudentsList';
import GameSettings from './GameSettings';
import Analytics from './Analytics';
// ייבוא הקומפוננטות החדשות
import TeacherInsightsPanel from './insights/TeacherInsightsPanel';
import PersonalizedLearningPlan from './planning/PersonalizedLearningPlan';
import TeacherDetailedReport from './TeacherDetailedReport';

import './TeacherStyles.css';

function TeacherDashboard() {
    const { currentUser, logout } = useAuth();
    const location = useLocation();

    return (
        <div className="teacher-dashboard">
            <nav className="sidebar">
                <div className="user-info">
                    <h3>שלום, {currentUser?.username}</h3>
                    <span className="user-type">מורה</span>
                </div>

                <ul className="nav-links">
                    <li>
                        <Link to="/teacher/students">ניהול תלמידים</Link>
                    </li>
                    <li>
                        <Link to="/teacher/settings">הגדרות משחק</Link>
                    </li>
                    <li>
                        <Link to="/teacher/analytics">ניתוח נתונים</Link>
                    </li>
                </ul>

                <button className="logout-button" onClick={logout}>התנתק</button>
            </nav>

            <main className="content">
                <Routes>
                    <Route index element={<WelcomeScreen />} />
                    <Route path="students" element={<StudentsList />} />
                    <Route path="settings" element={<GameSettings />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="analytics/:studentId" element={<TeacherInsightsPanel />} />
                    <Route path="learning-plan/:studentId" element={<PersonalizedLearningPlan />} />
                    <Route path="detailed-report/:studentId" element={<TeacherDetailedReport />} />
                </Routes>
                <Outlet />
            </main>
        </div>
    );
}

// קומפוננטת Welcome
function WelcomeScreen() {
    return (
        <div className="welcome-screen">
            <h2>ברוכים הבאים לממשק המורה</h2>
            <p>בחר אפשרות מהתפריט בצד ימין כדי להתחיל</p>
        </div>
    );
}

export default TeacherDashboard;