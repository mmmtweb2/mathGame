import React, { useState, useEffect } from 'react'; // הוספת הייבוא החסר
import '../TeacherStyles.css';


function TeacherInsightsPanel({ studentId }) {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudentInsights(studentId);
    }, [studentId]);

    const fetchStudentInsights = async (id) => {
        setLoading(true);

        // בפרויקט אמיתי, זה יהיה API call
        // נדמה נתונים לצורך הדוגמה
        setTimeout(() => {
            const insightData = {
                // מידע בסיסי
                studentInfo: {
                    name: 'דניאל כהן',
                    grade: 'ג\'2',
                    totalExercises: 126,
                    activeWeeks: 8,
                    averageSuccessRate: 72,
                    learningStyle: 'ויזואלי',
                    lastActivity: '2 שעות'
                },

                // זיהוי קשיים עיקריים
                mainChallenges: [
                    {
                        title: 'קושי בהבנת תהליך הפריטה בחיסור',
                        severity: 'גבוה',
                        pattern: 'שגיאה עקבית כשהספרה העליונה קטנה מהתחתונה',
                        examples: [
                            { problem: '43 - 28', userAnswer: '25', correctAnswer: '15', explanation: 'התלמיד לא פרט ספרה מעמודת העשרות' },
                            { problem: '52 - 37', userAnswer: '25', correctAnswer: '15', explanation: 'חישב 5-3=2 ו-2-7=-5 והפך ל-5' }
                        ],
                        improvement: -5, // אחוז שיפור שלילי מסמל הידרדרות
                        recommendedActivities: [
                            { id: 'act1', title: 'המחשה ויזואלית של תהליך הפריטה', type: 'video' },
                            { id: 'act2', title: 'תרגול מודרך עם צעדים מפורטים', type: 'exercise' },
                            { id: 'act3', title: 'כרטיסיות עם עזרה של מורה', type: 'hands-on' }
                        ]
                    },
                    {
                        title: 'חוסר הבנה של ערך המקום',
                        severity: 'בינוני',
                        pattern: 'טעויות הקשורות להחלפת ספרות או הבנת המשמעות של מיקום הספרה',
                        examples: [
                            { problem: '27 + 48', userAnswer: '615', correctAnswer: '75', explanation: 'חיבר אחדות+עשרות ועשרות+אחדות' },
                            { problem: '134', userAnswer: '431', correctAnswer: '134', explanation: 'קרא את המספר הפוך בתרגיל של זיהוי מספרים' }
                        ],
                        improvement: 10, // אחוז שיפור חיובי
                        recommendedActivities: [
                            { id: 'act4', title: 'משחק התאמת ערך המקום', type: 'game' },
                            { id: 'act5', title: 'פירוק מספרים לערכים שונים', type: 'exercise' }
                        ]
                    }
                ],

                // זיהוי נקודות חוזק
                strengths: [
                    {
                        title: 'שליטה טובה בעובדות חיבור בסיסיות',
                        evidence: '92% הצלחה בתרגילי חיבור פשוטים',
                        consistency: 'עקבי מאוד לאורך זמן',
                        recommendedLeverage: 'להשתמש בחוזק זה כבסיס ללימוד חיסור ותרגילים מורכבים יותר'
                    },
                    {
                        title: 'התמדה בתרגול',
                        evidence: 'מתרגל באופן קבוע 4-5 פעמים בשבוע',
                        consistency: 'נצפתה עלייה ביוזמה לתרגול בחודש האחרון',
                        recommendedLeverage: 'לתגמל את המאמץ וההתמדה, ולהציע תרגול מאתגר יותר עם אותה תדירות'
                    }
                ],

                // פרופיל למידה
                learningProfile: {
                    preferredTimes: ['בוקר', 'צהריים מוקדמים'],
                    attentionSpan: '15-20 דקות',
                    preferredActivities: ['משחקים', 'פעילויות אינטראקטיביות'],
                    challengingActivities: ['תרגילי טקסט ארוכים', 'משימות מרובות שלבים'],
                    motivators: ['הצלחה מיידית', 'תגמולים ויזואליים', 'הכרה בהישגים'],
                    frustrationTriggers: ['כישלון חוזר', 'משימות שנתפסות כקשות מדי']
                },

                // מסלול התקדמות מומלץ
                progressionPath: {
                    currentTopics: [
                        { name: 'חיסור עם פריטה', status: 'בעבודה', progress: 55 },
                        { name: 'ערך המקום עד מאות', status: 'בעבודה', progress: 65 }
                    ],
                    nextTopics: [
                        { name: 'חיסור עם פריטה כפולה', prerequisites: ['חיסור עם פריטה'], readiness: 'נמוך' },
                        { name: 'פתרון בעיות מילוליות פשוטות', prerequisites: ['חיבור', 'חיסור'], readiness: 'בינוני' }
                    ],
                    longTermGoals: [
                        'שליטה בארבע פעולות חשבון עד 1000',
                        'יכולת פתרון בעיות מילוליות מורכבות',
                        'שליטה בעובדות מספריות בפעולות חיבור וחיסור'
                    ]
                },

                // אסטרטגיות הוראה מותאמות
                teachingStrategies: {
                    effectiveApproaches: [
                        {
                            title: 'המחשה ויזואלית',
                            description: 'התלמיד מגיב היטב למצגים ויזואליים ודיאגרמות',
                            examples: ['שימוש בקוביות צבעוניות', 'דיאגרמות של ערך מקום', 'קווי מספרים']
                        },
                        {
                            title: 'למידה אקטיבית',
                            description: 'מעורבות פעילה משפרת ריכוז והבנה',
                            examples: ['משחקים אינטראקטיביים', 'עבודה בזוגות', 'פתרון בקול רם']
                        }
                    ],
                    lessEffectiveApproaches: [
                        {
                            title: 'הסבר מילולי ממושך',
                            description: 'מתקשה לעקוב אחרי הסברים ארוכים ללא תמיכה ויזואלית',
                            alternatives: ['הסברים קצרים עם חיזוק ויזואלי', 'פירוק לצעדים קטנים']
                        }
                    ],
                    adaptationsForLearningStyle: {
                        visual: [
                            'שימוש בצבעים לסימון ערכי מקום',
                            'כרטיסיות פלאש צבעוניות',
                            'סרטוני אנימציה של פעולות חשבון'
                        ],
                        handson: [
                            'שימוש באביזרי מניפולציה',
                            'פעילויות תנועה להמחשת מושגים מתמטיים',
                            'משחקי מספרים עם חפצים פיזיים'
                        ]
                    }
                },

                // לוח זמנים מומלץ
                recommendedSchedule: {
                    optimal: {
                        frequency: '4-5 פעמים בשבוע',
                        sessionLength: '15-20 דקות',
                        timeOfDay: 'בוקר או צהריים מוקדמים',
                        pacing: 'התחלה עם תרגול קל להצלחה, התקדמות הדרגתית לנושאים מאתגרים'
                    },
                    suggestedStructure: [
                        { minutes: '0-3', activity: 'רענון מהיר של מושגים קודמים' },
                        { minutes: '3-10', activity: 'תרגול מודרך של מיומנות חדשה' },
                        { minutes: '10-15', activity: 'תרגול עצמאי' },
                        { minutes: '15-20', activity: 'משחק או פעילות מסכמת' }
                    ]
                },

                // היסטוריית התערבויות
                interventionHistory: [
                    {
                        date: '15.02.2025',
                        intervention: 'תרגול נוסף בפריטה בחיסור',
                        outcome: 'שיפור קל, ממשיך להתקשות במקרים מורכבים',
                        followup: 'להוסיף המחשה ויזואלית'
                    },
                    {
                        date: '01.03.2025',
                        intervention: 'שימוש בתרשימים להמחשת ערך המקום',
                        outcome: 'שיפור ניכר בהבנת המושג',
                        followup: 'המשך שימוש באמצעים ויזואליים'
                    }
                ]
            };

            setInsights(insightData);
            setLoading(false);
        }, 1000);
    };

    if (loading) return <div className="loading">טוען נתונים...</div>;
    if (!insights) return <div className="error">לא ניתן לטעון נתונים</div>;

    return (
        <div className="teacher-insights-panel">
            <div className="insights-header">
                <h2>תובנות פדגוגיות: {insights.studentInfo.name}</h2>
                <div className="student-quick-stats">
                    <div className="stat-item">
                        <span className="stat-label">כיתה:</span>
                        <span className="stat-value">{insights.studentInfo.grade}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">תרגילים:</span>
                        <span className="stat-value">{insights.studentInfo.totalExercises}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">אחוז הצלחה:</span>
                        <span className="stat-value">{insights.studentInfo.averageSuccessRate}%</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">פעילות אחרונה:</span>
                        <span className="stat-value">{insights.studentInfo.lastActivity}</span>
                    </div>
                </div>
            </div>

            <div className="insights-grid">
                <div className="challenges-section insights-card">
                    <h3>אתגרים מרכזיים</h3>

                    {insights.mainChallenges.map((challenge, idx) => (
                        <div key={idx} className="challenge-item">
                            <div className="challenge-header">
                                <h4>{challenge.title}</h4>
                                <div className={`severity-badge ${challenge.severity === 'גבוה' ? 'high' : 'medium'}`}>
                                    {challenge.severity}
                                </div>
                            </div>

                            <p className="pattern-description">{challenge.pattern}</p>

                            <div className="challenge-examples">
                                <h5>דוגמאות:</h5>
                                <ul>
                                    {challenge.examples.map((example, exIdx) => (
                                        <li key={exIdx}>
                                            <div className="example-item">
                                                <div className="example-problem">{example.problem}</div>
                                                <div className="example-answer">
                                                    תשובת התלמיד: <span className="wrong-answer">{example.userAnswer}</span>
                                                </div>
                                                <div className="example-correct">
                                                    תשובה נכונה: <span className="correct-answer">{example.correctAnswer}</span>
                                                </div>
                                                <div className="example-explanation">{example.explanation}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="challenge-improvement">
                                <span className="improvement-label">שיפור בחודש האחרון:</span>
                                <span className={`improvement-value ${challenge.improvement >= 0 ? 'positive' : 'negative'}`}>
                                    {challenge.improvement >= 0 ? '+' : ''}{challenge.improvement}%
                                </span>
                            </div>

                            <div className="recommended-activities">
                                <h5>פעילויות מומלצות:</h5>
                                <div className="activities-buttons">
                                    {challenge.recommendedActivities.map(activity => (
                                        <button key={activity.id} className={`activity-button ${activity.type}`}>
                                            {activity.title}
                                            <span className="activity-type-badge">{
                                                activity.type === 'video' ? 'סרטון' :
                                                    activity.type === 'exercise' ? 'תרגול' :
                                                        'פעילות מעשית'
                                            }</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="strengths-section insights-card">
                    <h3>נקודות חוזק</h3>

                    {insights.strengths.map((strength, idx) => (
                        <div key={idx} className="strength-item">
                            <h4>{strength.title}</h4>
                            <div className="strength-details">
                                <div className="evidence">
                                    <span className="detail-label">עדות:</span>
                                    <span className="detail-value">{strength.evidence}</span>
                                </div>
                                <div className="consistency">
                                    <span className="detail-label">עקביות:</span>
                                    <span className="detail-value">{strength.consistency}</span>
                                </div>
                            </div>
                            <div className="leverage-recommendation">
                                <h5>כיצד לנצל:</h5>
                                <p>{strength.recommendedLeverage}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="learning-profile insights-card">
                    <h3>פרופיל למידה</h3>

                    <div className="profile-grid">
                        <div className="profile-item">
                            <h5>זמני למידה מועדפים:</h5>
                            <div className="profile-tags">
                                {insights.learningProfile.preferredTimes.map((time, idx) => (
                                    <span key={idx} className="profile-tag">{time}</span>
                                ))}
                            </div>
                        </div>

                        <div className="profile-item">
                            <h5>טווח קשב:</h5>
                            <div className="profile-value">{insights.learningProfile.attentionSpan}</div>
                        </div>

                        <div className="profile-item">
                            <h5>פעילויות מועדפות:</h5>
                            <div className="profile-tags">
                                {insights.learningProfile.preferredActivities.map((activity, idx) => (
                                    <span key={idx} className="profile-tag preferred">{activity}</span>
                                ))}
                            </div>
                        </div>

                        <div className="profile-item">
                            <h5>פעילויות מאתגרות:</h5>
                            <div className="profile-tags">
                                {insights.learningProfile.challengingActivities.map((activity, idx) => (
                                    <span key={idx} className="profile-tag challenging">{activity}</span>
                                ))}
                            </div>
                        </div>

                        <div className="profile-item">
                            <h5>גורמי הנעה:</h5>
                            <ul className="profile-list">
                                {insights.learningProfile.motivators.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="profile-item">
                            <h5>גורמי תסכול:</h5>
                            <ul className="profile-list caution">
                                {insights.learningProfile.frustrationTriggers.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="teaching-strategies insights-card">
                    <h3>אסטרטגיות הוראה מותאמות</h3>

                    <div className="effective-approaches">
                        <h4>גישות יעילות</h4>

                        {insights.teachingStrategies.effectiveApproaches.map((approach, idx) => (
                            <div key={idx} className="approach-item effective">
                                <h5>{approach.title}</h5>
                                <p>{approach.description}</p>
                                <div className="approach-examples">
                                    <span className="examples-label">דוגמאות:</span>
                                    <ul>
                                        {approach.examples.map((example, exIdx) => (
                                            <li key={exIdx}>{example}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="less-effective-approaches">
                        <h4>גישות פחות יעילות</h4>

                        {insights.teachingStrategies.lessEffectiveApproaches.map((approach, idx) => (
                            <div key={idx} className="approach-item less-effective">
                                <h5>{approach.title}</h5>
                                <p>{approach.description}</p>
                                <div className="approach-alternatives">
                                    <span className="alternatives-label">חלופות מומלצות:</span>
                                    <ul>
                                        {approach.alternatives.map((alternative, altIdx) => (
                                            <li key={altIdx}>{alternative}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="learning-style-adaptations">
                        <h4>התאמות לסגנון למידה {insights.studentInfo.learningStyle}</h4>

                        <div className="adaptations-list">
                            {insights.teachingStrategies.adaptationsForLearningStyle.visual.map((adaptation, idx) => (
                                <div key={idx} className="adaptation-item">
                                    <span className="adaptation-bullet">•</span>
                                    <span className="adaptation-text">{adaptation}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="progression-path insights-card">
                    <h3>מסלול התקדמות מומלץ</h3>

                    <div className="current-topics">
                        <h4>נושאים נוכחיים</h4>

                        {insights.progressionPath.currentTopics.map((topic, idx) => (
                            <div key={idx} className="topic-progress-item">
                                <div className="topic-info">
                                    <span className="topic-name">{topic.name}</span>
                                    <span className={`topic-status ${topic.status === 'בעבודה' ? 'in-progress' : 'completed'}`}>
                                        {topic.status}
                                    </span>
                                </div>
                                <div className="topic-progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${topic.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="next-topics">
                        <h4>נושאים הבאים</h4>

                        {insights.progressionPath.nextTopics.map((topic, idx) => (
                            <div key={idx} className="next-topic-item">
                                <div className="topic-name">{topic.name}</div>
                                <div className="topic-prerequisites">
                                    <span className="prereq-label">דרישות קדם:</span>
                                    <div className="prereq-tags">
                                        {topic.prerequisites.map((prereq, preIdx) => (
                                            <span key={preIdx} className="prereq-tag">{prereq}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="topic-readiness">
                                    <span className="readiness-label">מוכנות:</span>
                                    <span className={`readiness-value ${topic.readiness === 'גבוה' ? 'high' :
                                        topic.readiness === 'בינוני' ? 'medium' : 'low'
                                        }`}>
                                        {topic.readiness}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="long-term-goals">
                        <h4>יעדים לטווח ארוך</h4>
                        <ul className="goals-list">
                            {insights.progressionPath.longTermGoals.map((goal, idx) => (
                                <li key={idx}>{goal}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="recommended-schedule insights-card">
                    <h3>לוח זמנים מומלץ</h3>

                    <div className="optimal-schedule">
                        <h4>זמני למידה אופטימליים</h4>
                        <div className="schedule-details">
                            <div className="schedule-item">
                                <span className="schedule-label">תדירות:</span>
                                <span className="schedule-value">{insights.recommendedSchedule.optimal.frequency}</span>
                            </div>
                            <div className="schedule-item">
                                <span className="schedule-label">משך שיעור:</span>
                                <span className="schedule-value">{insights.recommendedSchedule.optimal.sessionLength}</span>
                            </div>
                            <div className="schedule-item">
                                <span className="schedule-label">זמן יום:</span>
                                <span className="schedule-value">{insights.recommendedSchedule.optimal.timeOfDay}</span>
                            </div>
                            <div className="schedule-item">
                                <span className="schedule-label">קצב:</span>
                                <span className="schedule-value">{insights.recommendedSchedule.optimal.pacing}</span>
                            </div>
                        </div>
                    </div>

                    <div className="session-structure">
                        <h4>מבנה שיעור מומלץ</h4>
                        <div className="structure-timeline">
                            {insights.recommendedSchedule.suggestedStructure.map((segment, idx) => (
                                <div key={idx} className="timeline-segment">
                                    <div className="time-marker">{segment.minutes} דקות</div>
                                    <div className="segment-activity">{segment.activity}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="action-button create-plan">יצירת תוכנית שבועית</button>
                    <button className="action-button assign-exercises">הקצאת תרגילים</button>
                    <button className="action-button schedule-meeting">תיאום פגישה עם התלמיד</button>
                    <button className="action-button print-report">הדפסת דוח</button>
                </div>
            </div>
        </div>
    );
}

export default TeacherInsightsPanel; // הוספת ייצוא ברירת מחדל