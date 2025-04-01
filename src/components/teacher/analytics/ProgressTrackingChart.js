import React, { useState, useEffect } from 'react';
import LineChart from '../../charts/LineChart';
import BarChart from '../../charts/BarChart';
import MultiLineChart from '../../charts/MultiLineChart';

function ProgressTrackingChart({ studentId, dateRange = 'semester' }) {
    const [progressData, setProgressData] = useState(null);
    const [viewMode, setViewMode] = useState('general'); // general, topics, error-types
    const [comparisonMode, setComparisonMode] = useState('none'); // none, class, self

    useEffect(() => {
        // קבלת נתוני התקדמות לאורך זמן
        fetchProgressData(studentId, dateRange);
    }, [studentId, dateRange]);

    const fetchProgressData = async (id, range) => {
        // בפרויקט אמיתי, זה יהיה API call
        // כאן נשתמש בנתונים מדומים

        // יצירת נתוני זמן בהתאם לטווח הנבחר
        const timePoints = generateTimePoints(range);

        // נתוני התקדמות כללית
        const generalProgress = timePoints.map((date, idx) => {
            return {
                date,
                successRate: Math.min(95, 50 + idx * 3 + Math.random() * 10),
                exercisesCompleted: 10 + idx * 5,
                averageTime: Math.max(15, 45 - idx * 2),
                streak: idx > 0 ? idx : 0
            };
        });

        // נתוני התקדמות לפי נושאים
        const topicProgress = {
            'addition': timePoints.map((date, idx) => {
                return { date, successRate: Math.min(95, 60 + idx * 2 + Math.random() * 8) };
            }),
            'subtraction': timePoints.map((date, idx) => {
                return { date, successRate: Math.min(95, 40 + idx * 4 + Math.random() * 8) };
            }),
            'place-value': timePoints.map((date, idx) => {
                return { date, successRate: Math.min(95, 55 + idx * 3 + Math.random() * 8) };
            })
        };

        // נתוני שגיאות לאורך זמן
        const errorTypeProgress = {
            'carry-operation': timePoints.map((date, idx) => {
                return { date, frequency: Math.max(5, 40 - idx * 3 - Math.random() * 5) };
            }),
            'borrow-operation': timePoints.map((date, idx) => {
                return { date, frequency: Math.max(5, 35 - idx * 2 - Math.random() * 5) };
            }),
            'place-value': timePoints.map((date, idx) => {
                return { date, frequency: Math.max(5, 30 - idx * 1.5 - Math.random() * 5) };
            })
        };

        // נתוני השוואה לכיתה
        const classComparison = timePoints.map((date, idx) => {
            return {
                date,
                studentRate: Math.min(95, 50 + idx * 3 + Math.random() * 10),
                classAvgRate: Math.min(90, 60 + idx * 1.5 + Math.random() * 5)
            };
        });

        setProgressData({
            general: generalProgress,
            topics: topicProgress,
            errorTypes: errorTypeProgress,
            comparison: classComparison
        });
    };

    const generateTimePoints = (range) => {
        const points = [];
        const today = new Date();
        let interval;
        let count;

        switch (range) {
            case 'week':
                interval = 1; // ימים
                count = 7;
                break;
            case 'month':
                interval = 3; // כל 3 ימים
                count = 10;
                break;
            case 'semester':
                interval = 2; // כל שבועיים (2 שבועות)
                count = 12;
                break;
            case 'year':
                interval = 1; // כל חודש
                count = 12;
                break;
            default:
                interval = 1;
                count = 10;
        }

        for (let i = count - 1; i >= 0; i--) {
            const date = new Date();
            if (range === 'week' || range === 'month') {
                // ימים
                date.setDate(today.getDate() - (i * interval));
            } else if (range === 'semester') {
                // שבועות
                date.setDate(today.getDate() - (i * interval * 7));
            } else {
                // חודשים
                date.setMonth(today.getMonth() - (i * interval));
            }
            points.push(date.toISOString().split('T')[0]);
        }

        return points;
    };

    // החלפת מצב תצוגה
    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    // החלפת מצב השוואה
    const handleComparisonModeChange = (mode) => {
        setComparisonMode(mode);
    };

    if (!progressData) return <div>טוען נתונים...</div>;

    return (
        <div className="progress-tracking">
            <div className="chart-controls">
                <div className="view-mode-buttons">
                    <button
                        className={viewMode === 'general' ? 'active' : ''}
                        onClick={() => handleViewModeChange('general')}
                    >
                        התקדמות כללית
                    </button>
                    <button
                        className={viewMode === 'topics' ? 'active' : ''}
                        onClick={() => handleViewModeChange('topics')}
                    >
                        לפי נושאים
                    </button>
                    <button
                        className={viewMode === 'error-types' ? 'active' : ''}
                        onClick={() => handleViewModeChange('error-types')}
                    >
                        סוגי שגיאות
                    </button>
                </div>

                <div className="comparison-mode-buttons">
                    <button
                        className={comparisonMode === 'none' ? 'active' : ''}
                        onClick={() => handleComparisonModeChange('none')}
                    >
                        ללא השוואה
                    </button>
                    <button
                        className={comparisonMode === 'class' ? 'active' : ''}
                        onClick={() => handleComparisonModeChange('class')}
                    >
                        השוואה לכיתה
                    </button>
                    <button
                        className={comparisonMode === 'self' ? 'active' : ''}
                        onClick={() => handleComparisonModeChange('self')}
                    >
                        השוואה לעצמי
                    </button>
                </div>
            </div>

            <div className="chart-container">
                {viewMode === 'general' && (
                    <div className="general-progress-chart">
                        <h3>התקדמות כללית</h3>
                        <div className="chart">
                            <LineChart
                                data={
                                    comparisonMode === 'class'
                                        ? progressData.comparison
                                        : progressData.general
                                }
                                xKey="date"
                                yKeys={
                                    comparisonMode === 'class'
                                        ? [
                                            { key: 'studentRate', name: 'תלמיד', color: '#4caf50' },
                                            { key: 'classAvgRate', name: 'ממוצע כיתה', color: '#2196f3' }
                                        ]
                                        : [{ key: 'successRate', name: 'אחוז הצלחה', color: '#4caf50' }]
                                }
                            />
                        </div>

                        <div className="additional-metrics">
                            <div className="metric-card">
                                <h4>תרגילים שהושלמו</h4>
                                <div className="metric-chart">
                                    <BarChart
                                        data={progressData.general}
                                        xKey="date"
                                        yKeys={[{ key: 'exercisesCompleted', name: 'מספר תרגילים', color: '#ff9800' }]}
                                    />
                                </div>
                            </div>

                            <div className="metric-card">
                                <h4>זמן ממוצע לתרגיל (שניות)</h4>
                                <div className="metric-chart">
                                    <LineChart
                                        data={progressData.general}
                                        xKey="date"
                                        yKeys={[{ key: 'averageTime', name: 'זמן ממוצע', color: '#9c27b0' }]}
                                    />
                                </div>
                            </div>

                            <div className="metric-card">
                                <h4>רצף תרגילים נכונים</h4>
                                <div className="metric-chart">
                                    <BarChart
                                        data={progressData.general}
                                        xKey="date"
                                        yKeys={[{ key: 'streak', name: 'רצף', color: '#e91e63' }]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {viewMode === 'topics' && (
                    <div className="topic-progress-chart">
                        <h3>התקדמות לפי נושאים</h3>
                        <div className="topics-chart">
                            <MultiLineChart
                                datasets={[
                                    {
                                        data: progressData.topics.addition,
                                        name: 'חיבור',
                                        color: '#4caf50'
                                    },
                                    {
                                        data: progressData.topics.subtraction,
                                        name: 'חיסור',
                                        color: '#2196f3'
                                    },
                                    {
                                        data: progressData.topics['place-value'],
                                        name: 'ערך המקום',
                                        color: '#ff9800'
                                    }
                                ]}
                                xKey="date"
                                yKey="successRate"
                            />
                        </div>

                        <div className="topic-insights">
                            <h4>תובנות עיקריות:</h4>
                            <ul>
                                <li>שיפור משמעותי בנושא <strong>חיסור</strong> - עלייה של 20% בחודשיים האחרונים</li>
                                <li>נושא <strong>ערך המקום</strong> דורש תרגול נוסף - התקדמות איטית מהצפוי</li>
                                <li><strong>חיבור</strong> מציג יציבות גבוהה לאורך זמן - נקודת חוזק של התלמיד</li>
                            </ul>
                        </div>
                    </div>
                )}

                {viewMode === 'error-types' && (
                    <div className="error-types-chart">
                        <h3>שכיחות סוגי שגיאות לאורך זמן</h3>
                        <div className="errors-chart">
                            <MultiLineChart
                                datasets={[
                                    {
                                        data: progressData.errorTypes['carry-operation'],
                                        name: 'שגיאות נשיאה/העברה',
                                        color: '#f44336'
                                    },
                                    {
                                        data: progressData.errorTypes['borrow-operation'],
                                        name: 'שגיאות פריטה/הלוואה',
                                        color: '#ff9800'
                                    },
                                    {
                                        data: progressData.errorTypes['place-value'],
                                        name: 'שגיאות ערך המקום',
                                        color: '#9c27b0'
                                    }
                                ]}
                                xKey="date"
                                yKey="frequency"
                            />
                        </div>

                        <div className="error-improvements">
                            <h4>שיפורים מרכזיים:</h4>
                            <div className="improvement-cards">
                                <div className="improvement-card">
                                    <div className="improvement-header">
                                        <h5>שגיאות נשיאה/העברה</h5>
                                        <div className="improvement-percentage down">-35%</div>
                                    </div>
                                    <p>ירידה משמעותית בשגיאות נשיאה - תוצאה של תרגול ממוקד</p>
                                </div>

                                <div className="improvement-card">
                                    <div className="improvement-header">
                                        <h5>שגיאות פריטה/הלוואה</h5>
                                        <div className="improvement-percentage down">-20%</div>
                                    </div>
                                    <p>ירידה בשגיאות פריטה - עדיין דורש תרגול נוסף</p>
                                </div>

                                <div className="improvement-card">
                                    <div className="improvement-header">
                                        <h5>שגיאות ערך המקום</h5>
                                        <div className="improvement-percentage down">-15%</div>
                                    </div>
                                    <p>שיפור מתון - מומלץ להמשיך בתרגול ודגש על נושא זה</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="progress-insights">
                <h3>תובנות והמלצות</h3>
                <div className="insights-content">
                    <div className="strength-weakness">
                        <div className="strengths">
                            <h4>נקודות חוזק</h4>
                            <ul>
                                <li>
                                    <span className="strength-title">חיבור פשוט</span>
                                    <span className="strength-rate">92% הצלחה</span>
                                </li>
                                <li>
                                    <span className="strength-title">זיהוי מספרים</span>
                                    <span className="strength-rate">95% הצלחה</span>
                                </li>
                                <li>
                                    <span className="strength-title">עקביות בתרגול</span>
                                    <span className="strength-rate">ביצע תרגילים ב-5 ימים רצופים</span>
                                </li>
                            </ul>
                        </div>

                        <div className="weaknesses">
                            <h4>נקודות לשיפור</h4>
                            <ul>
                                <li>
                                    <span className="weakness-title">חיסור עם פריטה כפולה</span>
                                    <span className="weakness-rate">45% הצלחה</span>
                                </li>
                                <li>
                                    <span className="weakness-title">ערך המקום - מאות</span>
                                    <span className="weakness-rate">60% הצלחה</span>
                                </li>
                                <li>
                                    <span className="weakness-title">מהירות פתרון</span>
                                    <span className="weakness-rate">ממוצע: 35 שניות לתרגיל</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="next-steps">
                        <h4>המלצות להמשך</h4>
                        <ol>
                            <li>
                                <strong>תרגול מודרך של חיסור עם פריטה כפולה</strong> -
                                הקצאת 10 דקות ביום לתרגול ממוקד
                            </li>
                            <li>
                                <strong>חיזוק הבנת ערך המקום</strong> -
                                שימוש באמצעי המחשה ויזואליים כמו קוביות עשר
                            </li>
                            <li>
                                <strong>תרגול מהירות</strong> -
                                משחקי זמן קצרים (2 דקות) עם פוקוס על דיוק תחילה, ואז מהירות
                            </li>
                        </ol>

                        <div className="action-buttons">
                            <button className="assign-practice">
                                הקצה תרגילים מותאמים
                            </button>
                            <button className="view-detailed">
                                צפה בדוח מפורט
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressTrackingChart;