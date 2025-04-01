import React from 'react';

function ClassOverview({ data }) {
    if (!data) return <div className="loading">טוען נתונים...</div>;

    return (
        <div className="class-overview">
            <h2>סקירה כללית - {data.classInfo.name}</h2>

            <div className="overview-cards">
                <div className="overview-card">
                    <h3>נתונים כלליים</h3>
                    <div className="stat-item">
                        <span className="stat-label">אחוז הצלחה ממוצע:</span>
                        <span className="stat-value">{data.classInfo.averageSuccessRate}%</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">זמן ממוצע לתרגיל:</span>
                        <span className="stat-value">{data.classInfo.averageCompletionTime} שניות</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">מספר תלמידים:</span>
                        <span className="stat-value">{data.classInfo.studentsCount}</span>
                    </div>
                </div>

                <div className="overview-card">
                    <h3>נושאים מאתגרים</h3>
                    <ul className="challenges-list">
                        {data.classInfo.topChallengingTopics.map((topic, index) => (
                            <li key={index} className="challenge-item">{topic}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="students-overview">
                <h3>סקירת תלמידים</h3>
                <div className="students-table-container">
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>שם</th>
                                <th>מספר תרגילים</th>
                                <th>אחוז הצלחה</th>
                                <th>נושא מאתגר</th>
                                <th>פעילות אחרונה</th>
                                <th>סטטוס</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.students.map(student => (
                                <tr key={student.id} className={student.status === 'struggling' ? 'student-struggling' : ''}>
                                    <td>{student.name}</td>
                                    <td>{student.totalExercises}</td>
                                    <td>{student.successRate}%</td>
                                    <td>{student.topChallengingTopic}</td>
                                    <td>{student.lastActivity}</td>
                                    <td>
                                        <span className={`status-badge ${student.status}`}>
                                            {student.status === 'struggling' ? 'מתקשה' :
                                                student.status === 'improving' ? 'משתפר' : 'תקין'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ClassOverview;