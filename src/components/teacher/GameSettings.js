// src/components/teacher/GameSettings.js
import React, { useState, useEffect } from 'react';
import './TeacherStyles.css';


function GameSettings() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [settings, setSettings] = useState({
        addition: true,
        subtraction: true,
        vertical: true,
        horizontal: true,
        predefinedExercises: true,
        customExercises: true
    });
    const [saveStatus, setSaveStatus] = useState(null);

    useEffect(() => {
        // בפרויקט אמיתי, כאן תהיה קריאת API לקבלת רשימת תלמידים
        setStudents([
            { id: 1, name: 'יוסי כהן' },
            { id: 2, name: 'מיכל לוי' },
            { id: 3, name: 'דני גולן' }
        ]);
    }, []);

    const handleSettingChange = (setting) => {
        setSettings({
            ...settings,
            [setting]: !settings[setting]
        });
        setSaveStatus(null);
    };

    const handleStudentChange = (e) => {
        const studentId = e.target.value;
        setSelectedStudent(studentId);
        setSaveStatus(null);

        if (studentId) {
            // בפרויקט אמיתי, כאן תהיה קריאת API לקבלת הגדרות התלמיד
            // כרגע נשתמש בהגדרות ברירת מחדל
            setSettings({
                addition: true,
                subtraction: true,
                vertical: true,
                horizontal: true,
                predefinedExercises: true,
                customExercises: true
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedStudent) {
            alert('אנא בחר תלמיד');
            return;
        }

        // בפרויקט אמיתי, כאן תהיה קריאת API לשמירת ההגדרות
        console.log('Saving settings for student', selectedStudent, settings);
        setSaveStatus('success');

        // בהצלחה יופעל טיימר לאיפוס הודעת ההצלחה
        setTimeout(() => {
            setSaveStatus(null);
        }, 3000);
    };

    return (
        <div className="game-settings">
            <h2>הגדרת תרגילים לתלמיד</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>בחירת תלמיד:</label>
                    <select
                        value={selectedStudent}
                        onChange={handleStudentChange}
                    >
                        <option value="">בחר תלמיד</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="settings-group">
                    <h3>סוג תרגילים:</h3>
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.addition}
                                onChange={() => handleSettingChange('addition')}
                            />
                            חיבור
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.subtraction}
                                onChange={() => handleSettingChange('subtraction')}
                            />
                            חיסור
                        </label>
                    </div>
                </div>

                <div className="settings-group">
                    <h3>אופן הצגה:</h3>
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.vertical}
                                onChange={() => handleSettingChange('vertical')}
                            />
                            תרגילים במאונך
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.horizontal}
                                onChange={() => handleSettingChange('horizontal')}
                            />
                            תרגילים במאוזן
                        </label>
                    </div>
                </div>

                <div className="settings-group">
                    <h3>אפשרויות נוספות:</h3>
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.predefinedExercises}
                                onChange={() => handleSettingChange('predefinedExercises')}
                            />
                            תרגילים מוגדרים מראש
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.customExercises}
                                onChange={() => handleSettingChange('customExercises')}
                            />
                            יצירת תרגילים עצמאית
                        </label>
                    </div>
                </div>

                {saveStatus === 'success' && (
                    <div className="success-message">ההגדרות נשמרו בהצלחה</div>
                )}

                <button type="submit" className="save-button" disabled={!selectedStudent}>
                    שמור הגדרות
                </button>
            </form>
        </div>
    );
}

export default GameSettings;