import React from 'react';

function LearningPatterns({ data }) {
    if (!data) return <div className="loading">טוען נתונים...</div>;

    // לדוגמה בלבד - במערכת אמיתית, נתונים אלו יגיעו מהשרת
    const patternsData = {
        timePatterns: {
            mostActiveDay: 'שלישי',
            mostActiveTime: '10:00-12:00',
            leastActiveDay: 'שישי',
            averageSessionLength: '22 דקות',
        },
        learningStyles: [
            { style: 'ויזואלי', percentage: 45 },
            { style: 'שמיעתי', percentage: 20 },
            { style: 'קינסתטי', percentage: 35 }
        ],
        activityPreferences: [
            { activity: 'תרגול במאונך', popularity: 80 },
            { activity: 'משחקים אינטראקטיביים', popularity: 75 },
            { activity: 'אתגרים מתמטיים', popularity: 65 },
            { activity: 'פתרון בעיות מילוליות', popularity: 40 }
        ],
        challengePatterns: [
            {
                topic: 'חיסור עם פריטה',
                difficultyLevel: 'גבוה',
                completionRate: 62,
                averageAttempts: 2.4
            },
            {
                topic: 'ערך המקום',
                difficultyLevel: 'בינוני',
                completionRate: 78,
                averageAttempts: 1.8
            }
        ]
    };

    return (
        <div className="learning-patterns">
            <h2>דפוסי למידה</h2>

            <div className="patterns-grid">
                <div className="pattern-card time-patterns">
                    <h3>דפוסי זמן</h3>
                    <div className="time-stats">
                        <div className="time-stat">
                            <span className="stat-label">יום פעיל ביותר:</span>
                            <span className="stat-value">{patternsData.timePatterns.mostActiveDay}</span>
                        </div>
                        <div className="time-stat">
                            <span className="stat-label">שעות פעילות עיקריות:</span>
                            <span className="stat-value">{patternsData.timePatterns.mostActiveTime}</span>
                        </div>
                        <div className="time-stat">
                            <span className="stat-label">יום פחות פעיל:</span>
                            <span className="stat-value">{patternsData.timePatterns.leastActiveDay}</span>
                        </div>
                        <div className="time-stat">
                            <span className="stat-label">אורך שיעור ממוצע:</span>
                            <span className="stat-value">{patternsData.timePatterns.averageSessionLength}</span>
                        </div>
                    </div>
                </div>

                <div className="pattern-card learning-styles">
                    <h3>סגנונות למידה</h3>
                    <div className="styles-distribution">
                        {patternsData.learningStyles.map((style, index) => (
                            <div key={index} className="style-item">
                                <div className="style-name">{style.style}</div>
                                <div className="style-bar-container">
                                    <div
                                        className="style-bar"
                                        style={{ width: `${style.percentage}%` }}
                                    ></div>
                                    <span className="style-percentage">{style.percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pattern-card activity-preferences">
                    <h3>פעילויות מועדפות</h3>
                    <div className="activities-list">
                        {patternsData.activityPreferences.map((activity, index) => (
                            <div key={index} className="activity-item">
                                <div className="activity-name">{activity.activity}</div>
                                <div className="activity-bar-container">
                                    <div
                                        className="activity-bar"
                                        style={{
                                            width: `${activity.popularity}%`,
                                            backgroundColor: activity.popularity > 70 ? '#4caf50' :
                                                activity.popularity > 50 ? '#ff9800' : '#f44336'
                                        }}
                                    ></div>
                                    <span className="activity-popularity">{activity.popularity}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pattern-card challenge-patterns">
                    <h3>אתגרים משמעותיים</h3>
                    <div className="challenges-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>נושא</th>
                                    <th>רמת קושי</th>
                                    <th>שיעור השלמה</th>
                                    <th>ממוצע ניסיונות</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patternsData.challengePatterns.map((challenge, index) => (
                                    <tr key={index}>
                                        <td>{challenge.topic}</td>
                                        <td>
                                            <span className={`difficulty-badge ${challenge.difficultyLevel === 'גבוה' ? 'high' : 'medium'}`}>
                                                {challenge.difficultyLevel}
                                            </span>
                                        </td>
                                        <td>{challenge.completionRate}%</td>
                                        <td>{challenge.averageAttempts}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="patterns-insights">
                <h3>תובנות מדפוסי הלמידה</h3>
                <ul className="insights-list">
                    <li>
                        <strong>זמני לימוד אופטימליים:</strong> תפוקת הלמידה הגבוהה ביותר נצפית בימי שלישי
                        בשעות הבוקר. שקלו לתכנן שיעורי מתמטיקה מאתגרים בזמנים אלה.
                    </li>
                    <li>
                        <strong>סגנונות למידה:</strong> רוב התלמידים מגיבים היטב לאמצעי המחשה ויזואליים.
                        שלבו יותר אלמנטים חזותיים בהוראה.
                    </li>
                    <li>
                        <strong>פעילויות:</strong> תרגול במאונך ומשחקים אינטראקטיביים הם הפופולריים ביותר.
                        השתמשו בפורמטים אלה להקניית מושגים חדשים.
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default LearningPatterns;

