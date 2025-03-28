// src/components/teacher/Analytics.js
import React, { useState, useEffect } from 'react';
import './TeacherStyles.css';


function Analytics() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('all');
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        // בפרויקט אמיתי, כאן תהיה קריאת API לקבלת רשימת תלמידים
        setStudents([
            { id: 1, name: 'יוסי כהן' },
            { id: 2, name: 'מיכל לוי' },
            { id: 3, name: 'דני גולן' }
        ]);

        // טעינת נתונים ראשונית
        loadAnalyticsData('all');
    }, []);

    const loadAnalyticsData = (studentId) => {
        setLoadingData(true);

        // סימולציה של קריאת API
        setTimeout(() => {
            // נתונים לדוגמה - בפרויקט אמיתי אלו יבואו מהשרת
            if (studentId === 'all') {
                setAnalyticsData({
                    successRate: 78,
                    completedExercises: 45,
                    averageTime: 25,
                    challengeAreas: [
                        { name: 'חיסור עם פריטה', successRate: 65 },
                        { name: 'חיבור מספרים גדולים', successRate: 82 }
                    ],
                    progressData: [
                        { week: 1, rate: 60 },
                        { week: 2, rate: 65 },
                        { week: 3, rate: 68 },
                        { week: 4, rate: 75 },
                        { week: 5, rate: 78 }
                    ]
                });
            } else if (studentId === '1') {
                setAnalyticsData({
                    successRate: 70,
                    completedExercises: 35,
                    averageTime: 30,
                    challengeAreas: [
                        { name: 'חיסור עם פריטה', successRate: 55 },
                        { name: 'חיבור מספרים גדולים', successRate: 75 }
                    ],
                    progressData: [
                        { week: 1, rate: 55 },
                        { week: 2, rate: 58 },
                        { week: 3, rate: 63 },
                        { week: 4, rate: 68 },
                        { week: 5, rate: 70 }
                    ]
                });
            } else if (studentId === '2') {
                setAnalyticsData({
                    successRate: 92,
                    completedExercises: 38,
                    averageTime: 18,
                    challengeAreas: [
                        { name: 'חיסור עם פריטה', successRate: 88 },
                        { name: 'חיבור מספרים גדולים', successRate: 95 }
                    ],
                    progressData: [
                        { week: 1, rate: 80 },
                        { week: 2, rate: 85 },
                        { week: 3, rate: 88 },
                        { week: 4, rate: 90 },
                        { week: 5, rate: 92 }
                    ]
                });
            } else {
                setAnalyticsData({
                    successRate: 65,
                    completedExercises: 28,
                    averageTime: 35,
                    challengeAreas: [
                        { name: 'חיסור עם פריטה', successRate: 60 },
                        { name: 'חיבור מספרים גדולים', successRate: 70 }
                    ],
                    progressData: [
                        { week: 1, rate: 50 },
                        { week: 2, rate: 55 },
                        { week: 3, rate: 58 },
                        { week: 4, rate: 62 },
                        { week: 5, rate: 65 }
                    ]
                });
            }

            setLoadingData(false);
        }, 500);
    };

    const handleStudentChange = (e) => {
        const studentId = e.target.value;
        setSelectedStudent(studentId);
        loadAnalyticsData(studentId);
    };

    // פונקציה עזר ליצירת רמת צבע לפי אחוז הצלחה
    const getColorByRate = (rate) => {
        if (rate >= 90) return '#4caf50'; // ירוק כהה
        if (rate >= 75) return '#8bc34a'; // ירוק בינוני
        if (rate >= 60) return '#ffeb3b'; // צהוב
        if (rate >= 40) return '#ff9800'; // כתום
        return '#f44336'; // אדום
    };

    return (
        <div className="analytics">
            <h2>ניתוח נתונים</h2>

            <div className="filter-section">
                <label>בחירת תלמיד:</label>
                <select
                    value={selectedStudent}
                    onChange={handleStudentChange}
                >
                    <option value="all">כל התלמידים</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>

            {loadingData ? (
                <div className="loading">טוען נתונים...</div>
            ) : analyticsData ? (
                <div className="analytics-content">
                    <div className="summary-card">
                        <h3>סיכום ביצועים</h3>
                        <p>אחוז הצלחה כללי: <span className="highlight">{analyticsData.successRate}%</span></p>
                        <p>תרגילים שהושלמו: <span className="highlight">{analyticsData.completedExercises}</span></p>
                        <p>זמן ממוצע לתרגיל: <span className="highlight">{analyticsData.averageTime} שניות</span></p>
                    </div>

                    <div className="challenges-card">
                        <h3>אתגרים נפוצים</h3>
                        <ul>
                            {analyticsData.challengeAreas.map((area, index) => (
                                <li key={index}>
                                    <div className="challenge-item">
                                        <span>{area.name}:</span>
                                        <div className="progress-bar-container">
                                            <div
                                                className="progress-bar"
                                                style={{
                                                    width: `${area.successRate}%`,
                                                    backgroundColor: getColorByRate(area.successRate)
                                                }}
                                            ></div>
                                            <span className="progress-text">{area.successRate}%</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="chart-container">
                        <h3>התקדמות לאורך זמן</h3>
                        <div className="chart">
                            <div className="chart-content">
                                {analyticsData.progressData.map((point, index) => (
                                    <div
                                        key={index}
                                        className="chart-bar"
                                        style={{
                                            height: `${point.rate}%`,
                                            backgroundColor: getColorByRate(point.rate)
                                        }}
                                    >
                                        <div className="chart-tooltip">{point.rate}%</div>
                                        <div className="chart-label">שבוע {point.week}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="recommendations-card">
                        <h3>המלצות</h3>
                        <div className="recommendations-content">
                            {analyticsData.successRate < 70 ? (
                                <div className="recommendation">
                                    <p>יש לתרגל יותר תרגילי {analyticsData.challengeAreas[0].successRate < analyticsData.challengeAreas[1].successRate ? analyticsData.challengeAreas[0].name : analyticsData.challengeAreas[1].name}</p>
                                </div>
                            ) : analyticsData.successRate > 90 ? (
                                <div className="recommendation">
                                    <p>מומלץ להעלות את רמת הקושי ולהציג תרגילים מאתגרים יותר</p>
                                </div>
                            ) : (
                                <div className="recommendation">
                                    <p>ממשיכים בקצב הנוכחי, עם דגש על תרגול {analyticsData.challengeAreas[0].successRate < analyticsData.challengeAreas[1].successRate ? analyticsData.challengeAreas[0].name : analyticsData.challengeAreas[1].name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="no-data">אין נתונים זמינים</div>
            )}
        </div>
    );
}

export default Analytics;