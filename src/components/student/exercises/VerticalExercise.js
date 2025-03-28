// src/components/student/exercises/VerticalExercise.js
import React, { useState, useEffect } from 'react';
import '../StudentStyles.css';

function VerticalExercise({ problem, onSubmitAnswer }) {
    const { num1, num2, operator } = problem;

    // המרת המספרים לספרות בודדות (מימין לשמאל כפי שפותרים בחשבון)
    const num1Digits = num1.toString().split('');
    const num2Digits = num2.toString().split('');

    // מציאת האורך המקסימלי
    const maxLength = Math.max(num1Digits.length, num2Digits.length);

    // מילוי באפסים כדי שהאורכים יהיו זהים ושהספרות יהיו מיושרות נכון
    while (num1Digits.length < maxLength) num1Digits.unshift('0');
    while (num2Digits.length < maxLength) num2Digits.unshift('0');

    // מצב התרגיל - מתחילים מהעמודה הימנית ביותר (אחדות)
    const [currentColumnIndex, setCurrentColumnIndex] = useState(maxLength - 1);
    const [hasCarry, setHasCarry] = useState(false);
    const [userAnswers, setUserAnswers] = useState(Array(maxLength).fill(''));
    const [carries, setCarries] = useState(Array(maxLength).fill(false));
    const [isCompleted, setIsCompleted] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [feedbackAnimation, setFeedbackAnimation] = useState(null);
    const [currentStep, setCurrentStep] = useState('readNumbers'); // readNumbers, carryCheck, calculate, carryForward, writeAnswer
    const [consecutiveErrors, setConsecutiveErrors] = useState(0);

    // פונקציה לטיפול בשינוי תשובה
    const handleAnswerChange = (e) => {
        const value = e.target.value;
        // רק מספרים וערך יחיד
        if (/^\d?$/.test(value)) {
            const newAnswers = [...userAnswers];
            newAnswers[currentColumnIndex] = value;
            setUserAnswers(newAnswers);
        }
    };

    // פונקציה לטיפול בשינוי שארית
    const handleCarryChange = (hasCarry) => {
        const newCarries = [...carries];
        newCarries[currentColumnIndex] = hasCarry;
        setCarries(newCarries);
        setHasCarry(hasCarry);
    };

    // פונקציה לפתרון עמודה בצעדים קטנים
    const solveColumn = () => {
        switch (currentStep) {
            case 'readNumbers':
                // 1. קריאת המספרים בעמודה
                setCurrentStep('carryCheck');
                break;

            case 'carryCheck':
                // 2. בדיקה אם יש שארית מהעמודה הקודמת
                setCurrentStep('calculate');
                break;

            case 'calculate':
                // 3. ביצוע החישוב
                setCurrentStep('carryForward');
                break;

            case 'carryForward':
                // 4. האם צריך להעביר שארית לעמודה הבאה?
                setCurrentStep('writeAnswer');
                break;

            case 'writeAnswer':
                // 5. כתיבת התשובה
                // בדוק אם התשובה נכונה
                checkColumnAnswer();
                // המשך לעמודה הבאה
                moveToNextColumn();
                // אפס את שלבי הפתרון לעמודה הבאה
                setCurrentStep('readNumbers');
                break;

            default:
                setCurrentStep('readNumbers');
        }
    };

    // פונקציה להמחשה ויזואלית של שארית והעברה
    const renderCarryVisual = () => {
        // מחשב את הסך הכולל של הקוביות לפי הפעולה
        const digit1 = parseInt(num1Digits[currentColumnIndex]);
        const digit2 = parseInt(num2Digits[currentColumnIndex]);

        let totalBlocks;
        if (operator === '+') {
            // בחיבור, הסך הכולל הוא סכום הספרות + שארית אם יש
            totalBlocks = digit1 + digit2 + (currentColumnIndex < maxLength - 1 && carries[currentColumnIndex + 1] ? 1 : 0);
        } else {
            // בחיסור, אם הספרה העליונה קטנה מהתחתונה, צריך פריטה
            const needsBorrow = digit1 < digit2 || (digit1 === digit2 && currentColumnIndex < maxLength - 1 && carries[currentColumnIndex + 1]);
            totalBlocks = needsBorrow ? (digit1 + 10) : digit1;
        }

        return (
            <div className="carry-visualization">
                <div className="digit-blocks">
                    {/* הצגת הספרות כקוביות/אובייקטים מוחשיים - הספרה הראשונה */}
                    {Array(parseInt(num1Digits[currentColumnIndex]))
                        .fill()
                        .map((_, i) => (
                            <div key={`block1-${i}`} className="digit-block num1-block"></div>
                        ))}
                </div>

                <div className="operator-visual">{operator}</div>

                <div className="digit-blocks">
                    {/* הצגת הספרות כקוביות - הספרה השנייה */}
                    {Array(parseInt(num2Digits[currentColumnIndex]))
                        .fill()
                        .map((_, i) => (
                            <div key={`block2-${i}`} className="digit-block num2-block"></div>
                        ))}
                </div>

                {/* המחשה ויזואלית של שארית - קבוצת 10 קוביות מסומנת בנפרד */}
                {operator === '+' && totalBlocks >= 10 && (
                    <div className="carry-grouping">
                        <p>בקבוצה זו יש 10 קוביות שנעביר לעמודת העשרות</p>
                        <div className="carry-blocks">
                            {Array(10).fill().map((_, i) => (
                                <div key={`carry-${i}`} className="carry-block"></div>
                            ))}
                        </div>
                        <div className="carry-arrow">→</div>
                    </div>
                )}

                {/* המחשה ויזואלית של פריטה */}
                {operator === '-' && (digit1 < digit2 || (digit1 === digit2 && currentColumnIndex < maxLength - 1 && carries[currentColumnIndex + 1])) && (
                    <div className="borrow-visualization">
                        <p>אנחנו צריכים לפרוט 1 מעמודת העשרות ל-10 יחידות</p>
                        <div className="borrow-illustration">
                            <div className="tens-column">1</div>
                            <div className="borrow-arrow">→</div>
                            <div className="units-column">10</div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // מערכת עזרה מדורגת שמתאימה את עצמה לרמת התלמיד
    const getHelpLevel = () => {
        // התאמה דינמית של רמת העזרה
        if (consecutiveErrors > 2) {
            return 'maximum'; // הדרכה מלאה עם הסבר מפורש והמחשה ויזואלית
        } else if (consecutiveErrors > 0) {
            return 'medium';  // רמז ממוקד לבעיה
        } else {
            return 'minimal'; // רק כיוון כללי
        }
    };

    // פונקציה להצגת רמז מותאם לרמת הקושי של התלמיד
    const renderHint = () => {
        const helpLevel = getHelpLevel();

        // מידע בסיסי לרמז
        const digit1 = parseInt(num1Digits[currentColumnIndex]);
        const digit2 = parseInt(num2Digits[currentColumnIndex]);
        const hasPrevCarry = currentColumnIndex < maxLength - 1 && carries[currentColumnIndex + 1];

        // חישוב ערך עבור רמז ספציפי
        const getSpecificHint = () => {
            if (operator === '+') {
                if (hasPrevCarry) {
                    return `שים לב שיש שארית (1) מהעמודה הקודמת, לכן החישוב הוא ${digit1} + ${digit2} + 1 = ${digit1 + digit2 + 1}`;
                } else {
                    return `החישוב הוא ${digit1} + ${digit2} = ${digit1 + digit2}`;
                }
            } else { // חיסור
                if (digit1 < digit2 || (digit1 === digit2 && hasPrevCarry)) {
                    return `הספרה למעלה (${digit1}) קטנה מהספרה למטה (${digit2}), לכן צריך פריטה מהעמודה השמאלית`;
                } else if (hasPrevCarry) {
                    return `יש צורך להפחית 1 מ-${digit1} בגלל הפריטה בעמודה הקודמת`;
                } else {
                    return `החישוב הוא ${digit1} - ${digit2} = ${digit1 - digit2}`;
                }
            }
        };

        // כללים כללים לכל פעולה
        const getGeneralRule = () => {
            if (operator === '+') {
                return "בחיבור, כשסכום הספרות גדול מ-9, רושמים את ספרת האחדות ומעבירים 1 לעמודה השמאלית";
            } else {
                return "בחיסור, כשהספרה העליונה קטנה מהתחתונה, לוקחים 10 מהעמודה השמאלית";
            }
        };

        switch (helpLevel) {
            case 'maximum':
                return (
                    <div className="maximum-help">
                        <div className="step-by-step-guide">
                            <p className="highlight">הנה איך לפתור:</p>
                            {operator === '+' ? (
                                <div className="addition-steps">
                                    {hasPrevCarry && <p>1. שים לב שיש שארית 1 מהעמודה הקודמת</p>}
                                    <p>
                                        {hasPrevCarry ?
                                            `2. חבר ${digit1} + ${digit2} + 1 (שארית) = ${digit1 + digit2 + 1}` :
                                            `1. חבר ${digit1} + ${digit2} = ${digit1 + digit2}`}
                                    </p>
                                    {(digit1 + digit2 + (hasPrevCarry ? 1 : 0)) >= 10 && (
                                        <div>
                                            <p>
                                                {hasPrevCarry ?
                                                    `3. התוצאה ${digit1 + digit2 + 1} גדולה מ-10, לכן רשום ${(digit1 + digit2 + 1) % 10} והעבר שארית 1 לעמודה הבאה` :
                                                    `2. התוצאה ${digit1 + digit2} גדולה מ-10, לכן רשום ${(digit1 + digit2) % 10} והעבר שארית 1 לעמודה הבאה`}
                                            </p>
                                            <div className="carry-illustration">
                                                <div className="carry-arrow-up"></div>
                                                <div className="carry-value">1</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="subtraction-steps">
                                    {digit1 < digit2 || (digit1 === digit2 && hasPrevCarry) ? (
                                        <div>
                                            <p>1. הספרה למעלה ({digit1}) קטנה מהספרה למטה ({digit2}), צריך לפרוט</p>
                                            <p>2. קח 10 מהעמודה השמאלית והוסף ל-{digit1}, כך שיהיה לך {digit1 + 10}</p>
                                            <p>3. חשב {digit1 + 10} - {digit2} = {digit1 + 10 - digit2}</p>
                                            <p>4. אל תשכח לסמן שביצעת פריטה כדי להפחית 1 מהעמודה השמאלית בהמשך</p>
                                        </div>
                                    ) : hasPrevCarry ? (
                                        <div>
                                            <p>1. הפחת 1 מ-{digit1} בגלל הפריטה בעמודה הקודמת. {digit1} - 1 = {digit1 - 1}</p>
                                            <p>2. חשב {digit1 - 1} - {digit2} = {digit1 - 1 - digit2}</p>
                                        </div>
                                    ) : (
                                        <p>חשב {digit1} - {digit2} = {digit1 - digit2}</p>
                                    )}
                                </div>
                            )}
                            {renderCarryVisual()}
                        </div>
                    </div>
                );

            case 'medium':
                return (
                    <div className="focused-hint">
                        <p>שים לב לספרה {num1Digits[currentColumnIndex]}</p>
                        <p>כשאנחנו {operator === '+' ? 'מחברים' : 'מחסירים'} את {num2Digits[currentColumnIndex]},</p>
                        <p className="hint-focus">{getSpecificHint()}</p>
                    </div>
                );

            case 'minimal':
                return (
                    <div className="gentle-reminder">
                        <p>זכור: {getGeneralRule()}</p>
                        <p className="encouragement">נסה בעצמך, אני מאמין בך!</p>
                    </div>
                );

            default:
                return null;
        }
    };

    // פונקציה להצגת רמז
    const toggleHint = () => {
        setShowHint(!showHint);
    };

    // פונקציה לבדיקת תשובה לעמודה ספציפית
    const checkColumnAnswer = () => {
        // חישוב התשובה הנכונה לעמודה הנוכחית
        const correctAnswerForColumn = calculateCorrectAnswerForColumn(currentColumnIndex);
        const isCurrentAnswerCorrect = parseInt(userAnswers[currentColumnIndex]) === correctAnswerForColumn;

        if (isCurrentAnswerCorrect) {
            setConsecutiveErrors(0);
        } else {
            setConsecutiveErrors(prev => prev + 1);
        }

        return isCurrentAnswerCorrect;
    };

    // פונקציה לחישוב התשובה הנכונה לעמודה מסוימת
    const calculateCorrectAnswerForColumn = (colIndex) => {
        const digit1 = parseInt(num1Digits[colIndex]);
        const digit2 = parseInt(num2Digits[colIndex]);
        let result;

        if (operator === '+') {
            result = digit1 + digit2;
            if (colIndex < maxLength - 1 && carries[colIndex + 1]) {
                result += 1; // הוספת שארית מהעמודה הקודמת
            }
            if (result >= 10) {
                result = result % 10; // רק הספרה האחרונה
            }
        } else { // חיסור
            let tempResult = digit1 - digit2;
            if (colIndex < maxLength - 1 && carries[colIndex + 1]) {
                tempResult -= 1; // הורדת שארית מהעמודה הקודמת
            }
            if (tempResult < 0) {
                tempResult += 10; // פריטה
            }
            result = tempResult;
        }

        return result;
    };

    // פונקציה להצגת אנימציית פידבק
    const showFeedbackForColumn = (isCorrect) => {
        if (isCorrect) {
            const successMessages = [
                "נכון מאוד!",
                "מצויין!",
                "כל הכבוד!",
                "יופי!",
                "נהדר!",
                "אלוף/ה!",
                "חזק/ה!",
                "מדהים!"
            ];
            const randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
            setFeedbackAnimation({ type: 'success', message: randomMessage });
        } else {
            const errorMessages = [
                "לא בדיוק...",
                "כמעט!",
                "עוד נסיון...",
                "בוא ננסה שוב",
                "התשובה לא מדויקת"
            ];
            const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
            setFeedbackAnimation({ type: 'error', message: randomMessage });
        }

        // מסיר את האנימציה אחרי 2 שניות
        setTimeout(() => {
            setFeedbackAnimation(null);
        }, 2000);
    };

    // פונקציה למעבר לעמודה הבאה (משמאל)
    const moveToNextColumn = () => {
        // בדיקת תשובה נוכחית
        const isCurrentAnswerCorrect = checkColumnAnswer();

        // הצגת אנימציה של פידבק
        showFeedbackForColumn(isCurrentAnswerCorrect);

        if (currentColumnIndex > 0) {
            // עוברים לעמודה השמאלית יותר (מימין לשמאל)
            setTimeout(() => {
                setCurrentColumnIndex(currentColumnIndex - 1);
                setCurrentStep('readNumbers');
            }, 1000);
        } else {
            // סיימנו את כל העמודות
            setTimeout(() => {
                setIsCompleted(true);

                // חישוב התשובה הסופית
                const finalAnswer = userAnswers.join('');
                onSubmitAnswer(finalAnswer);
            }, 1000);
        }
    };

    useEffect(() => {
        // איפוס האנימציה בעת החלפת עמודה
        return () => {
            setFeedbackAnimation(null);
        };
    }, [currentColumnIndex]);

    return (
        <div className="vertical-exercise">
            <div className="vertical-problem">
                <button
                    className="hint-button"
                    onClick={toggleHint}
                    title="רמז"
                >
                    ?
                </button>

                {showHint && (
                    <div className="hint-content">
                        {renderHint()}
                    </div>
                )}

                {/* שורת שאריות */}
                <div className="carry-row">
                    {carries.map((carry, index) => (
                        <div
                            key={`carry-${index}`}
                            className={`carry-cell ${index === currentColumnIndex ? 'current' : ''} ${carry ? 'has-carry' : ''}`}
                        >
                            {carry ? '1' : ''}
                        </div>
                    ))}
                </div>

                {/* שורת המספר הראשון */}
                <div className="number-row">
                    {num1Digits.map((digit, index) => (
                        <div
                            key={`num1-${index}`}
                            className={`digit-cell ${index === currentColumnIndex ? 'current' : ''}`}
                        >
                            {digit}
                        </div>
                    ))}
                </div>

                {/* שורת סימן הפעולה והמספר השני */}
                <div className="operator-row">
                    <div className="operator-cell">{operator}</div>
                    {num2Digits.map((digit, index) => (
                        <div
                            key={`num2-${index}`}
                            className={`digit-cell ${index === currentColumnIndex ? 'current' : ''}`}
                        >
                            {digit}
                        </div>
                    ))}
                </div>

                {/* קו הפרדה */}
                <div className="separator-line"></div>

                {/* שורת התשובה */}
                <div className="answer-row">
                    {userAnswers.map((answer, index) => (
                        <div
                            key={`answer-${index}`}
                            className={`answer-cell ${index === currentColumnIndex ? 'current' : ''}`}
                        >
                            {index === currentColumnIndex && !isCompleted ? (
                                <input
                                    type="text"
                                    className="answer-input"
                                    value={answer}
                                    onChange={handleAnswerChange}
                                    maxLength="1"
                                    autoFocus
                                />
                            ) : (
                                answer
                            )}
                        </div>
                    ))}
                </div>

                {/* הוראת התמקדות לקוראי מסך */}
                <div className="hidden-instructions" aria-live="polite">
                    {currentColumnIndex === maxLength - 1 ?
                        'התמקד בעמודת האחדות (הימנית ביותר)' :
                        currentColumnIndex === maxLength - 2 ?
                            'התמקד בעמודת העשרות' :
                            'התמקד בעמודה הבאה משמאל'}
                </div>
            </div>

            {!isCompleted && (
                <div className="exercise-controls">
                    <p>האם יש שארית לעמודה הבאה?</p>
                    <div className="carry-buttons">
                        <button
                            className={`carry-button ${hasCarry ? 'selected' : ''}`}
                            onClick={() => handleCarryChange(true)}
                        >
                            יש שארית
                        </button>
                        <button
                            className={`carry-button ${hasCarry === false ? 'selected' : ''}`}
                            onClick={() => handleCarryChange(false)}
                        >
                            אין שארית
                        </button>
                    </div>

                    <button
                        className="next-column-button"
                        onClick={moveToNextColumn}
                        disabled={userAnswers[currentColumnIndex] === ''}
                    >
                        {currentColumnIndex > 0 ? 'עבור לעמודה הבאה' : 'סיים תרגיל'}
                    </button>
                </div>
            )}

            {feedbackAnimation && (
                <div className={`feedback-animation ${feedbackAnimation.type}`}>
                    <div className="feedback-text">{feedbackAnimation.message}</div>
                </div>
            )}
        </div>
    );
}

export default VerticalExercise;