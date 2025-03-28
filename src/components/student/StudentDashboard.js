// src/components/student/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ExerciseSelector from './ExerciseSelector';
import ExerciseArea from './ExerciseArea';
import './StudentStyles.css';


function StudentDashboard() {
    const { currentUser, logout } = useAuth();
    const [settings, setSettings] = useState(null);
    const [currentExercise, setCurrentExercise] = useState(null);

    useEffect(() => {
        // כאן תהיה קריאת API לקבלת ההגדרות של התלמיד
        setSettings({
            addition: true,
            subtraction: true,
            vertical: true,
            horizontal: true,
            predefinedExercises: true,
            customExercises: true
        });
    }, []);

    const startExercise = (type, format, isCustom) => {
        setCurrentExercise({ type, format, isCustom });
    };

    const resetExercise = () => {
        setCurrentExercise(null);
    };

    return (
        <div className="student-dashboard">
            <header className="dashboard-header">
                <h1>לומדים מתמטיקה</h1>
                <div className="user-controls">
                    <span className="welcome-text">שלום, {currentUser?.username}</span>
                    <button className="logout-button" onClick={logout}>התנתק</button>
                </div>
            </header>

            <main className="dashboard-content">
                {!currentExercise ? (
                    <ExerciseSelector
                        settings={settings}
                        onSelectExercise={startExercise}
                    />
                ) : (
                    <ExerciseArea
                        exercise={currentExercise}
                        onBack={resetExercise}
                    />
                )}
            </main>
        </div>
    );
}

export default StudentDashboard;