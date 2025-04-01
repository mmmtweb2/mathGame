import React, { useState, useEffect } from 'react';
import BarChart from '../../charts/BarChart';

function ErrorPatternAnalysis({ studentId, exerciseData }) {
    const [errorCategories, setErrorCategories] = useState([]);
    const [specificPatterns, setSpecificPatterns] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!exerciseData) {
            setError("נתוני תרגילים חסרים");
            setLoading(false);
            return;
        }

        try {
            analyzeErrors(exerciseData);
            setLoading(false);
        } catch (err) {
            setError("שגיאה בניתוח הנתונים: " + err.message);
            setLoading(false);
        }
    }, [exerciseData]);

    const analyzeErrors = (data) => {
        // מדגים סוגי שגיאות שהמערכת מנתחת
        const categories = [
            {
                id: 'place-value',
                name: 'קשיים בהבנת ערך המקום',
                count: 0,
                examples: [],
                description: 'קושי בהבנה שספרה מייצגת ערך שונה בהתאם למיקומה במספר'
            },
            {
                id: 'carry-operation',
                name: 'קשיים בביצוע נשיאה/העברה',
                count: 0,
                examples: [],
                description: 'קושי בזכירה או ביצוע נכון של תהליך הנשיאה בחיבור'
            },
            {
                id: 'borrow-operation',
                name: 'קשיים בביצוע פריטה/הלוואה',
                count: 0,
                examples: [],
                description: 'קושי בהבנה או ביצוע תהליך הפריטה בחיסור'
            },
            {
                id: 'number-facts',
                name: 'שליטה חלקית בעובדות מספריות',
                count: 0,
                examples: [],
                description: 'קושי בזכירה מיידית של תוצאות חיבור/חיסור בסיסיות'
            },
            {
                id: 'operation-confusion',
                name: 'בלבול בין פעולות חשבון',
                count: 0,
                examples: [],
                description: 'ביצוע פעולת חיבור במקום חיסור או להיפך'
            },
            {
                id: 'procedural',
                name: 'קשיים פרוצדורליים',
                count: 0,
                examples: [],
                description: 'קושי בביצוע הליך פתרון מרובה שלבים בסדר הנכון'
            },
            {
                id: 'attention',
                name: 'קשיי קשב וריכוז',
                count: 0,
                examples: [],
                description: 'שגיאות לא עקביות המצביעות על קשיי קשב'
            }
        ];

        // מעבר על תרגילים שגויים וסיווגם
        data.incorrectExercises.forEach(exercise => {
            const patterns = detectErrorPatterns(exercise);

            patterns.forEach(pattern => {
                const category = categories.find(c => c.id === pattern.categoryId);
                if (category) {
                    category.count++;
                    if (category.examples.length < 3) {
                        category.examples.push({
                            problem: exercise.problem,
                            userAnswer: exercise.userAnswer,
                            correctAnswer: exercise.correctAnswer,
                            patternDetails: pattern.details
                        });
                    }
                }
            });
        });

        // מיון הקטגוריות לפי שכיחות
        const sortedCategories = [...categories].sort((a, b) => b.count - a.count);
        setErrorCategories(sortedCategories);

        // זיהוי דפוסים ספציפיים
        const patterns = identifySpecificPatterns(data.incorrectExercises);
        setSpecificPatterns(patterns);

        // המלצות מותאמות אישית
        const recs = generateRecommendations(sortedCategories, patterns);
        setRecommendations(recs);
    };

    const detectErrorPatterns = (exercise) => {
        const { problem, userAnswer, correctAnswer, steps } = exercise;
        const patterns = [];

        // להלן דוגמאות לכמה אלגוריתמים לזיהוי דפוסי שגיאות

        // דוגמה: זיהוי שגיאת נשיאה/העברה
        if (problem.operator === '+') {
            // בדיקה לכל עמודה במספר
            for (let i = 0; i < steps.length; i++) {
                const step = steps[i];

                // האם התלמיד התעלם משארית?
                if (step.requiresCarry && step.userColumnAnswer === (step.correctColumnAnswer - 1) % 10) {
                    patterns.push({
                        categoryId: 'carry-operation',
                        details: 'התעלמות משארית',
                        column: i,
                        expected: step.correctColumnAnswer,
                        given: step.userColumnAnswer
                    });
                }

                // האם התלמיד ציין שיש שארית אבל לא השתמש בה בעמודה הבאה?
                if (step.userCarry && !step.usedCarryCorrectly) {
                    patterns.push({
                        categoryId: 'carry-operation',
                        details: 'שארית לא נלקחה בחשבון בעמודה הבאה',
                        column: i
                    });
                }
            }
        }

        // דוגמה: זיהוי שגיאת פריטה/הלוואה
        if (problem.operator === '-') {
            for (let i = 0; i < steps.length; i++) {
                const step = steps[i];

                // האם התלמיד לא ביצע פריטה כשצריך?
                if (step.requiresBorrow && !step.userBorrow) {
                    // במקרים רבים, תלמידים פשוט הופכים את הסדר (מחסרים את המספר הגדול מהקטן)
                    if (step.userColumnAnswer === step.minuend - step.subtrahend) {
                        patterns.push({
                            categoryId: 'borrow-operation',
                            details: 'היפוך סדר החיסור במקום פריטה',
                            column: i
                        });
                    } else {
                        patterns.push({
                            categoryId: 'borrow-operation',
                            details: 'אי-ביצוע פריטה נדרשת',
                            column: i
                        });
                    }
                }

                // האם התלמיד ביצע פריטה אבל לא הפחית מהעמודה השמאלית?
                if (step.userBorrow && !step.decrementedNextColumn) {
                    patterns.push({
                        categoryId: 'borrow-operation',
                        details: 'פריטה ללא הפחתה מהעמודה השמאלית',
                        column: i
                    });
                }
            }
        }

        // זיהוי בעיות בהבנת ערך המקום
        const userDigits = userAnswer.toString().split('');
        const correctDigits = correctAnswer.toString().split('');

        // בדיקה אם התלמיד הזיז ספרות למקום לא נכון או החליף סדר
        if (userDigits.length === correctDigits.length &&
            userDigits.sort().join('') === correctDigits.sort().join('')) {
            patterns.push({
                categoryId: 'place-value',
                details: 'הספרות נכונות אך במיקום שגוי',
                userAnswer,
                correctAnswer
            });
        }

        // בדיקות נוספות...

        return patterns;
    };

    const identifySpecificPatterns = (exercises) => {
        // זיהוי דפוסים מורכבים יותר שעוברים בין תרגילים שונים
        const patterns = [];

        // דוגמה: בדיקה אם יש עקביות בטעויות בעמודה מסוימת
        const columnErrorCounts = [0, 0, 0]; // אחדות, עשרות, מאות

        exercises.forEach(ex => {
            ex.steps.forEach((step, idx) => {
                if (step.isCorrect === false && idx < 3) {
                    columnErrorCounts[idx]++;
                }
            });
        });

        // בדיקה אם רוב השגיאות הן בעמודה מסוימת
        const totalExercises = exercises.length;
        if (columnErrorCounts[0] > totalExercises * 0.7) {
            patterns.push({
                id: 'consistent-units-errors',
                description: 'שגיאות עקביות בעמודת האחדות',
                count: columnErrorCounts[0],
                percentage: Math.round((columnErrorCounts[0] / totalExercises) * 100)
            });
        }
        if (columnErrorCounts[1] > totalExercises * 0.7) {
            patterns.push({
                id: 'consistent-tens-errors',
                description: 'שגיאות עקביות בעמודת העשרות',
                count: columnErrorCounts[1],
                percentage: Math.round((columnErrorCounts[1] / totalExercises) * 100)
            });
        }

        // דוגמה: בדיקה אם השגיאות קשורות בעיקר למספרים מסוימים
        const problematicDigits = identifyProblematicDigits(exercises);
        if (problematicDigits.length > 0) {
            patterns.push({
                id: 'problematic-digits',
                description: 'קושי עם מספרים מסוימים',
                digits: problematicDigits
            });
        }

        // דוגמה: בדיקה אם השגיאות מתרחשות בעיקר בתרגילים ארוכים
        const longExercisesErrors = exercises.filter(ex =>
            ex.problem.num1.toString().length >= 2 &&
            ex.problem.num2.toString().length >= 2 &&
            ex.isCorrect === false
        ).length;

        if (longExercisesErrors > totalExercises * 0.6) {
            patterns.push({
                id: 'struggles-with-longer-problems',
                description: 'קושי בתרגילים ארוכים יותר',
                percentage: Math.round((longExercisesErrors / totalExercises) * 100)
            });
        }

        return patterns;
    };

    const identifyProblematicDigits = (exercises) => {
        // מזהה אילו ספרות גורמות לקשיים לתלמיד
        const digitErrors = {
            '0': 0, '1': 0, '2': 0, '3': 0, '4': 0,
            '5': 0, '6': 0, '7': 0, '8': 0, '9': 0
        };
        const digitAppearances = { ...digitErrors };

        exercises.forEach(ex => {
            const num1Digits = ex.problem.num1.toString().split('');
            const num2Digits = ex.problem.num2.toString().split('');

            // סופר הופעות של כל ספרה
            [...num1Digits, ...num2Digits].forEach(digit => {
                digitAppearances[digit]++;
            });

            // אם התרגיל שגוי, מוסיף שגיאה לכל הספרות שמופיעות בו
            if (!ex.isCorrect) {
                [...num1Digits, ...num2Digits].forEach(digit => {
                    digitErrors[digit]++;
                });
            }
        });

        // מחשב אחוז שגיאה לכל ספרה ומחזיר את אלה עם אחוז שגיאה גבוה
        const problematicDigits = [];
        for (const digit in digitErrors) {
            if (digitAppearances[digit] >= 5) { // רק אם יש מספיק הופעות לניתוח משמעותי
                const errorRate = digitErrors[digit] / digitAppearances[digit];
                if (errorRate > 0.5) { // אם יותר מ-50% מהמקרים שגויים
                    problematicDigits.push({
                        digit,
                        errorRate: Math.round(errorRate * 100),
                        appearances: digitAppearances[digit]
                    });
                }
            }
        }

        return problematicDigits.sort((a, b) => b.errorRate - a.errorRate);
    };

    const generateRecommendations = (categories, patterns) => {
        // יצירת המלצות מותאמות אישית
        const recommendations = [];

        // נבחר את שלושת הקטגוריות הבעייתיות ביותר
        const topCategories = categories.slice(0, 3).filter(c => c.count > 0);

        // המלצות לכל קטגוריה
        topCategories.forEach(category => {
            switch (category.id) {
                case 'place-value':
                    recommendations.push({
                        id: 'place-value-recommendation',
                        title: 'חיזוק הבנת ערך המקום',
                        description: 'התלמיד מתקשה בהבנת ערך המקום של ספרות במספר',
                        activities: [
                            { type: 'exercise', id: 'pv-1', name: 'פירוק מספרים לערכי מקום' },
                            { type: 'visual', id: 'pv-2', name: 'המחשה ויזואלית של ערכי מקום' },
                            { type: 'game', id: 'pv-3', name: 'משחק התאמת כרטיסים - ערך מקום' }
                        ],
                        resources: [
                            { type: 'worksheet', id: 'ws-1', name: 'דף עבודה - הבנת ערך המקום' },
                            { type: 'video', id: 'vid-1', name: 'סרטון הסבר על ערך המקום' }
                        ],
                        teachingTips: [
                            'השתמש באמצעי המחשה כמו קוביות עשר, מקלות, או אמצעים מוחשיים אחרים',
                            'הדגם כיצד אותה ספרה מייצגת ערכים שונים בהתאם למיקומה',
                            'תרגל פירוק מספרים לערכי מקום: 243 = 200 + 40 + 3'
                        ]
                    });
                    break;

                case 'carry-operation':
                    recommendations.push({
                        id: 'carry-recommendation',
                        title: 'חיזוק הבנת תהליך הנשיאה בחיבור',
                        description: 'התלמיד מתקשה בביצוע נכון של נשיאה/העברה בתרגילי חיבור',
                        activities: [
                            { type: 'exercise', id: 'co-1', name: 'תרגול מודרך של נשיאה צעד אחר צעד' },
                            { type: 'visual', id: 'co-2', name: 'המחשה ויזואלית של תהליך הנשיאה' },
                            { type: 'game', id: 'co-3', name: 'משחק קופסאות ערך מקום' }
                        ],
                        resources: [
                            { type: 'worksheet', id: 'ws-2', name: 'דף עבודה - תרגילי נשיאה' },
                            { type: 'video', id: 'vid-2', name: 'סרטון הסבר על תהליך הנשיאה' }
                        ],
                        teachingTips: [
                            'השתמש במטאפורה של "קופסת ביצים" שמתמלאת ועוברים לקופסה חדשה',
                            'ציין את השארית בצורה ברורה מעל העמודה הבאה',
                            'תרגל תחילה תרגילים עם נשיאה רק בעמודה אחת'
                        ]
                    });
                    break;

                // המלצות נוספות לקטגוריות אחרות...
            }
        });

        // המלצות מותאמות לדפוסים ספציפיים
        patterns.forEach(pattern => {
            switch (pattern.id) {
                case 'consistent-units-errors':
                    recommendations.push({
                        id: 'units-focus',
                        title: 'התמקדות בעמודת האחדות',
                        description: 'התלמיד מתקשה באופן עקבי בעמודת האחדות',
                        activities: [
                            { type: 'exercise', id: 'ue-1', name: 'תרגול ממוקד - חישובים בעמודת האחדות' }
                        ],
                        teachingTips: [
                            'בקש מהתלמיד להקיף את ספרת האחדות בכל מספר לפני הפתרון',
                            'תרגל את החוקיות של עמודת האחדות (תמיד מספר בין 0-9)'
                        ]
                    });
                    break;

                case 'problematic-digits':
                    const digitList = pattern.digits.map(d => d.digit).join(', ');
                    recommendations.push({
                        id: 'digit-specific',
                        title: `חיזוק עבודה עם הספרות ${digitList}`,
                        description: `התלמיד מתקשה במיוחד כשתרגילים כוללים את הספרות: ${digitList}`,
                        activities: [
                            { type: 'exercise', id: 'pd-1', name: `תרגול ממוקד עם הספרות ${digitList}` }
                        ],
                        teachingTips: [
                            'יצירת כרטיסיות של עובדות מספריות עם הספרות הבעייתיות',
                            'תרגול יומי קצר של חישובים עם ספרות אלו'
                        ]
                    });
                    break;

                // המלצות נוספות לדפוסים אחרים...
            }
        });

        if (loading) return <div className="loading-spinner">טוען נתונים...</div>;
        if (error) return <div className="error-message">{error}</div>;
        if (errorCategories.length === 0) return <div>לא נמצאו דפוסי שגיאות.</div>;


        return recommendations;
    };


    return (
        <div className="error-pattern-analysis">
            <h2>ניתוח דפוסי שגיאות</h2>

            <section className="error-categories">
                <h3>קטגוריות שגיאות עיקריות</h3>
                <div className="categories-chart">
                    {/* תצוגה גרפית של התפלגות השגיאות */}
                    <BarChart data={errorCategories} />
                </div>

                <div className="categories-list">
                    {errorCategories.map(category => (
                        <div key={category.id} className="category-card">
                            <div className="category-header">
                                <h4>{category.name}</h4>
                                <div className="category-count">{category.count} שגיאות</div>
                            </div>
                            <p>{category.description}</p>

                            {category.examples.length > 0 && (
                                <div className="category-examples">
                                    <h5>דוגמאות:</h5>
                                    <ul>
                                        {category.examples.map((example, idx) => (
                                            <li key={idx}>
                                                <div className="example-problem">
                                                    {example.problem.num1} {example.problem.operator} {example.problem.num2} = {example.userAnswer} (צריך: {example.correctAnswer})
                                                </div>
                                                {example.patternDetails && (
                                                    <div className="pattern-details">{example.patternDetails}</div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="specific-patterns">
                <h3>דפוסים ספציפיים</h3>
                {specificPatterns.length > 0 ? (
                    <ul className="patterns-list">
                        {specificPatterns.map(pattern => (
                            <li key={pattern.id} className="pattern-item">
                                <div className="pattern-header">
                                    <h4>{pattern.description}</h4>
                                    {pattern.percentage && (
                                        <div className="pattern-percentage">{pattern.percentage}%</div>
                                    )}
                                </div>

                                {pattern.digits && (
                                    <div className="problematic-digits">
                                        <h5>ספרות בעייתיות:</h5>
                                        <ul>
                                            {pattern.digits.map(d => (
                                                <li key={d.digit}>
                                                    ספרה {d.digit}: {d.errorRate}% שגיאות ({d.appearances} הופעות)
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>לא נמצאו דפוסים ספציפיים.</p>
                )}
            </section>

            <section className="recommendations">
                <h3>המלצות פדגוגיות</h3>
                {recommendations.map(rec => (
                    <div key={rec.id} className="recommendation-card">
                        <h4>{rec.title}</h4>
                        <p>{rec.description}</p>

                        <div className="recommendation-content">
                            {rec.activities && (
                                <div className="recommended-activities">
                                    <h5>פעילויות מומלצות:</h5>
                                    <ul>
                                        {rec.activities.map(activity => (
                                            <li key={activity.id}>
                                                <button className="activity-button">
                                                    {activity.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {rec.teachingTips && (
                                <div className="teaching-tips">
                                    <h5>טיפים להוראה:</h5>
                                    <ul>
                                        {rec.teachingTips.map((tip, idx) => (
                                            <li key={idx}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {rec.resources && (
                                <div className="resources">
                                    <h5>חומרי עזר:</h5>
                                    <div className="resources-buttons">
                                        {rec.resources.map(resource => (
                                            <button key={resource.id} className="resource-button">
                                                {resource.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default ErrorPatternAnalysis;