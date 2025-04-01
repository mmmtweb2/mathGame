
import React from 'react';

function StudentDetailedModal({ student, onClose }) {
    if (!student) return null;

    return (
        <div className="modal-overlay">
            <div className="student-detailed-modal">
                <div className="modal-header">
                    <h2>{student.name} - ניתוח מפורט</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="student-stats">
                        <div className="stat-item">
                            <span className="stat-label">אחוז הצלחה:</span>
                            <span className="stat-value">{student.successRate}%</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">תרגילים שהושלמו:</span>
                            <span className="stat-value">{student.totalExercises}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">רצף ימי תרגול:</span>
                            <span className="stat-value">{student.streak} ימים</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">פעילות אחרונה:</span>
                            <span className="stat-value">{student.lastActivity}</span>
                        </div>
                    </div>

                    <div className="performance-analysis">
                        <h3>ניתוח ביצועים</h3>

                        <div className="strengths-weaknesses">
                            <div className="strengths">
                                <h4>נקודות חוזק</h4>
                                <ul>
                                    <li>חיבור מספרים קטנים (0-20)</li>
                                    <li>זיהוי מספרים</li>
                                </ul>
                            </div>

                            <div className="weaknesses">
                                <h4>נקודות לשיפור</h4>
                                <ul>
                                    <li>{student.topChallengingTopic}</li>
                                    <li>התמדה בתרגול</li>
                                </ul>
                            </div>
                        </div>

                        <div className="recommendations">
                            <h4>המלצות</h4>
                            <ul>
                                <li>תרגול ממוקד בנושא {student.topChallengingTopic}</li>
                                <li>שימוש באמצעי המחשה ויזואליים</li>
                                <li>חלוקת התרגול ליחידות קצרות יותר</li>
                            </ul>

                            <div className="action-buttons">
                                <button className="assign-exercises">הקצה תרגילים מותאמים</button>
                                <button className="view-detailed-report">צפה בדוח מלא</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDetailedModal;