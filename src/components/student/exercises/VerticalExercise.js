// src/components/student/exercises/VerticalExercise.js
import React, { useState } from 'react';
import '../StudentStyles.css';

function VerticalExercise({ problem, onSubmitAnswer }) {
    const { num1, num2, operator } = problem;

    // המרת המספרים לספרות בודדות
    const num1Str = num1.toString();
    const num2Str = num2.toString();

    // מציאת האורך המקסימלי בין שני המספרים
    const maxLength = Math.max(num1Str.length, num2Str.length);

    // מילוי ברווחים משמאל כדי שהמספרים יהיו באותו אורך
    const paddedNum1 = num1Str.padStart(maxLength, ' ');
    const paddedNum2 = num2Str.padStart(maxLength, ' ');

    // מערך הספרות לתצוגה
    const num1Digits = paddedNum1.split('');
    const num2Digits = paddedNum2.split('');

    // התוצאה הצפויה (למספר העמודות בתוצאה)
    const expectedResult = operator === '+' ? num1 + num2 : num1 - num2;
    const resultLength = expectedResult.toString().length;

    // תיבות קלט לתשובה - מערך באורך הנדרש
    const [answers, setAnswers] = useState(Array(resultLength).fill(''));

    // ספרות שארית/נשיאה - מערך באורך של מספר העמודות
    const [carries, setCarries] = useState(Array(maxLength).fill(''));

    // העמודה הנוכחית (מתחילים מימין - אחדות)
    const [currentCol, setCurrentCol] = useState(maxLength - 1);

    // האם התרגיל הושלם
    const [isCompleted, setIsCompleted] = useState(false);

    // טיפול בשינוי תשובה
    const handleAnswerChange = (e) => {
        const value = e.target.value;
        // מקבל רק ספרה אחת
        if (/^\d?$/.test(value)) {
            const newAnswers = [...answers];
            // אם אנחנו בעמודת האחדות, ההכנסה היא לתא הימני ביותר של התשובה
            const answerIndex = resultLength - (maxLength - currentCol);

            if (answerIndex >= 0 && answerIndex < resultLength) {
                newAnswers[answerIndex] = value;
                setAnswers(newAnswers);
            }
        }
    };

    // טיפול בשינוי שארית
    const handleCarryChange = (e) => {
        const value = e.target.value;
        // מקבל רק 0 או 1 לשאריות
        if (/^[01]?$/.test(value)) {
            const newCarries = [...carries];
            newCarries[currentCol - 1] = value; // שארית הולכת לעמודה שמשמאל
            setCarries(newCarries);
        }
    };

    // מעבר לעמודה הבאה
    const moveToNextColumn = () => {
        // אם עוד יש עמודות לפתור
        if (currentCol > 0) {
            setCurrentCol(currentCol - 1);
        } else {
            // סיום התרגיל
            setIsCompleted(true);
            // שליחת התשובה בפורמט מספר
            onSubmitAnswer(answers.join(''));
        }
    };

    // בדיקה אם יש ערך בעמודה הנוכחית (כדי לאפשר מעבר לעמודה הבאה)
    const hasCurrentAnswer = () => {
        const answerIndex = resultLength - (maxLength - currentCol);
        return answerIndex >= 0 && answers[answerIndex] !== '';
    };

    return (
        <div className="vertical-exercise-container">
            <div className="vertical-exercise">
                {/* הנחיות ברורות */}
                <div className="exercise-instructions">
                    {isCompleted ?
                        "סיימת את התרגיל!" :
                        `כעת פתור את עמודת ה${currentCol === 0 ? "מאות" : currentCol === 1 ? "עשרות" : "אחדות"}`
                    }
                </div>

                {/* שורת שאריות/נשיאה */}
                <div className="carry-row">
                    {num1Digits.map((_, index) => (
                        <div key={`carry-${index}`} className="carry-cell">
                            {index === currentCol - 1 && !isCompleted ? (
                                <input
                                    type="text"
                                    className="carry-input"
                                    value={carries[index]}
                                    onChange={handleCarryChange}
                                    maxLength="1"
                                    placeholder="?"
                                />
                            ) : (
                                carries[index]
                            )}
                        </div>
                    ))}
                </div>

                {/* שורת המספר הראשון */}
                <div className="number-row top-number">
                    {num1Digits.map((digit, index) => (
                        <div
                            key={`num1-${index}`}
                            className={`digit-cell ${index === currentCol ? 'current-column' : ''}`}
                        >
                            {digit}
                        </div>
                    ))}
                </div>

                {/* שורת הפעולה והמספר השני */}
                <div className="number-row">
                    <div className="operator-cell">{operator}</div>
                    {num2Digits.map((digit, index) => (
                        <div
                            key={`num2-${index}`}
                            className={`digit-cell ${index === currentCol ? 'current-column' : ''}`}
                        >
                            {digit}
                        </div>
                    ))}
                </div>

                {/* קו הפרדה */}
                <div className="separator-line"></div>

                {/* שורת התשובה */}
                <div className="answer-row">
                    {Array(resultLength).fill().map((_, index) => {
                        // בודק אם העמודה שייכת לעמודה הנוכחית בתרגיל
                        const isCurrentAnswerColumn = index === resultLength - (maxLength - currentCol);

                        return (
                            <div
                                key={`answer-${index}`}
                                className={`answer-cell ${isCurrentAnswerColumn ? 'current-column' : ''}`}
                            >
                                {isCurrentAnswerColumn && !isCompleted ? (
                                    <input
                                        type="text"
                                        className="answer-input"
                                        value={answers[index]}
                                        onChange={handleAnswerChange}
                                        maxLength="1"
                                        autoFocus
                                    />
                                ) : (
                                    answers[index]
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {!isCompleted && (
                <div className="exercise-controls">
                    <div className="carry-question">
                        <div className="question-text">
                            {currentCol > 0 ? "האם יש שארית לעמודה הבאה?" : "האם סיימת את התרגיל?"}
                        </div>
                    </div>

                    <button
                        className="next-column-button"
                        onClick={moveToNextColumn}
                        disabled={!hasCurrentAnswer()}
                    >
                        {currentCol > 0 ? "המשך לעמודה הבאה" : "סיים תרגיל"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default VerticalExercise;