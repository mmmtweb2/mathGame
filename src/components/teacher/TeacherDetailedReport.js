// src/components/teacher/TeacherDetailedReport.js
import React, { useState, useEffect } from 'react'; // הוספת הייבוא החסר
import './TeacherStyles.css';

function TeacherDetailedReport({ studentId }) {
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        // בפרויקט אמיתי, זה יהיה API call
        const fetchStudentData = async () => {
            // קבלת נתונים מפורטים על התלמיד
            setReportData({
                // נתונים לדוגמה
                overview: {
                    totalExercises: 45,
                    successRate: 68,
                    averageTime: 35,
                    improvement: 12 // שיפור באחוזים מהחודש הקודם
                },
                errorPatterns: [
                    { type: 'carry-error', frequency: 38, examples: [/*...*/] },
                    { type: 'borrow-comprehension', frequency: 25, examples: [/*...*/] },
                    { type: 'place-value-confusion', frequency: 15, examples: [/*...*/] }
                ],
                recommendations: [
                    { skill: 'מעבר שארית', exercises: ['ex1', 'ex2', 'ex3'] },
                    { skill: 'ערך המקום', exercises: ['ex4', 'ex5'] }
                ],
                learningPath: {
                    currentLevel: 2,
                    nextConcepts: ['חיבור עם 3 ספרות', 'חיסור עם הלוואה כפולה']
                }
            });
        };

        fetchStudentData();
    }, [studentId]);

    // הפונקציה החסרה
    const getPatternTitle = (patternType) => {
        const patternTitles = {
            'carry-error': 'שגיאת נשיאה',
            'borrow-comprehension': 'קושי בהבנת פריטה',
            'place-value-confusion': 'בלבול בערך המקום',
            // ניתן להוסיף עוד סוגי שגיאות כאן
        };

        return patternTitles[patternType] || 'שגיאה לא מזוהה';
    };

    if (!reportData) return <div>טוען נתונים...</div>;

    return (
        <div className="teacher-report">
            <h2>דוח מפורט: {studentId}</h2>

            <section className="report-overview">
                <h3>סקירה כללית</h3>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h4>אחוז הצלחה</h4>
                        <div className="stat-value">{reportData.overview.successRate}%</div>
                        <div className="stat-trend">
                            {reportData.overview.improvement > 0 ? '↑' : '↓'}
                            {Math.abs(reportData.overview.improvement)}%
                        </div>
                    </div>
                    {/* כרטיסים נוספים */}
                </div>
            </section>

            <section className="error-patterns">
                <h3>דפוסי שגיאות</h3>
                <div className="patterns-list">
                    {reportData.errorPatterns.map(pattern => (
                        <div key={pattern.type} className="pattern-card">
                            <h4>{getPatternTitle(pattern.type)}</h4>
                            <div className="pattern-frequency">
                                {pattern.frequency}% מהשגיאות
                            </div>
                            <div className="pattern-examples">
                                <button>הצג דוגמאות</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default TeacherDetailedReport;