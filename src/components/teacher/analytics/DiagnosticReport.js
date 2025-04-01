import React from 'react';

function DiagnosticReport({ data }) {
    if (!data) return <div className="loading">טוען נתונים...</div>;

    // לדוגמה בלבד - במערכת אמיתית, נתונים אלו יגיעו מהשרת
    const diagnosticData = {
        commonErrorPatterns: [
            {
                id: 'error-1',
                name: 'אי-הבנת תהליך הפריטה',
                description: 'תלמידים מתקשים בביצוע פריטה בתרגילי חיסור',
                affectedStudents: 12,
                affectedPercentage: 48,
                examples: [
                    '52 - 37 = 25 (במקום 15)',
                    '43 - 28 = 25 (במקום 15)'
                ],
                recommendations: [
                    'שימוש באמצעי המחשה ויזואליים',
                    'תרגול מדורג עם פריטה בעמודה אחת תחילה',
                    'דגש על משמעות הפריטה והקשר לערך המקום'
                ]
            },
            {
                id: 'error-2',
                name: 'בלבול בערך המקום',
                description: 'תלמידים מתקשים בהבנת ערך המקום של ספרות',
                affectedStudents: 8,
                affectedPercentage: 32,
                examples: [
                    '27 + 48 = 615 (במקום 75)',
                    '134 נקרא "מאה שלושים ארבעה" (במקום "מאה שלושים וארבע")'
                ],
                recommendations: [
                    'שימוש בלוח ערך המקום',
                    'המחשה עם קוביות עשר',
                    'פירוק מספרים לערכי מקום'
                ]
            }
        ],
        studentGroups: [
            {
                id: 'group-1',
                name: 'מתקדמים',
                count: 6,
                characteristics: [
                    'הצלחה גבוהה (מעל 85%)',
                    'מהירות פתרון גבוהה',
                    'יכולת התמודדות עם תרגילים מורכבים'
                ],
                recommendations: [
                    'הצגת אתגרים מתקדמים',
                    'העמקה בפתרון בעיות מילוליות',
                    'הרחבה לנושאים נוספים כמו כפל'
                ],
                students: ['מיכל לוי', 'דוד כהן', 'נועה אלון']
            },
            {
                id: 'group-2',
                name: 'ממוצעים',
                count: 11,
                characteristics: [
                    'הצלחה בינונית (60-85%)',
                    'קצב התקדמות סביר',
                    'שליטה טובה במיומנויות בסיסיות'
                ],
                recommendations: [
                    'חיזוק חולשות ספציפיות',
                    'תרגול מגוון של מיומנויות',
                    'עבודה בקבוצות הטרוגניות'
                ],
                students: ['יוסי לוי', 'מור אברהם', 'דן גולן']
            }
        ]
    };

    return (
        <div className="diagnostic-report">
            <h2>דוח אבחוני</h2>

            <div className="error-patterns">
                <h3>דפוסי שגיאות נפוצים</h3>

                {diagnosticData.commonErrorPatterns.map(pattern => (
                    <div key={pattern.id} className="error-pattern-card">
                        <div className="pattern-header">
                            <h4>{pattern.name}</h4>
                            <div className="affected-badge">
                                {pattern.affectedPercentage}% מהתלמידים
                            </div>
                        </div>

                        <div className="pattern-description">{pattern.description}</div>

                        <div className="pattern-details">
                            <div className="pattern-examples">
                                <h5>דוגמאות:</h5>
                                <ul>
                                    {pattern.examples.map((example, idx) => (
                                        <li key={idx}>{example}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pattern-recommendations">
                                <h5>המלצות:</h5>
                                <ul>
                                    {pattern.recommendations.map((rec, idx) => (
                                        <li key={idx}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="student-groups">
                <h3>קבוצות תלמידים</h3>

                <div className="groups-container">
                    {diagnosticData.studentGroups.map(group => (
                        <div key={group.id} className="group-card">
                            <div className="group-header">
                                <h4>{group.name}</h4>
                                <div className="group-count">{group.count} תלמידים</div>
                            </div>

                            <div className="group-characteristics">
                                <h5>מאפיינים:</h5>
                                <ul>
                                    {group.characteristics.map((char, idx) => (
                                        <li key={idx}>{char}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="group-recommendations">
                                <h5>המלצות:</h5>
                                <ul>
                                    {group.recommendations.map((rec, idx) => (
                                        <li key={idx}>{rec}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="group-students">
                                <h5>תלמידים לדוגמה:</h5>
                                <div className="students-tags">
                                    {group.students.map((student, idx) => (
                                        <span key={idx} className="student-tag">{student}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DiagnosticReport;