// src/components/student/ExerciseArea.js
import React, { useState, useEffect } from 'react';
import './StudentStyles.css';
import VerticalExercise from './exercises/VerticalExercise';
import HorizontalExercise from './exercises/HorizontalExercise';
import CustomExerciseCreator from './exercises/CustomExerciseCreator';
import ExerciseFeedback from './ExerciseFeedback';

function ExerciseArea({ exercise, onBack }) {
    const [currentProblem, setCurrentProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [explanation, setExplanation] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [creatingNewCustomExercise, setCreatingNewCustomExercise] = useState(false);
    const [lastCustomExercise, setLastCustomExercise] = useState(null);

    useEffect(() => {
        // איפוס כאשר סוג התרגיל משתנה
        setCurrentProblem(null);
        setUserAnswer('');
        setIsCorrect(null);
        setShowFeedback(false);
        setCreatingNewCustomExercise(false);

        // יצירת תרגיל חדש אם לא מדובר בתרגיל מותאם אישית
        if (!exercise.isCustom) {
            generateNewExercise();
        }
    }, [exercise.type, exercise.format, exercise.isCustom]);

    // וידוא שיש תרגיל מוכן בטעינה ראשונית של קומפוננטת תרגיל רגיל
    useEffect(() => {
        if (!exercise.isCustom && !currentProblem && !showFeedback) {
            generateNewExercise();
        } else if (exercise.isCustom && !currentProblem && !creatingNewCustomExercise) {
            // אם זה תרגיל מותאם אישית ואין תרגיל נוכחי, מעבר למצב יצירה
            setCreatingNewCustomExercise(true);
        }
    }, [exercise.isCustom, currentProblem, showFeedback, creatingNewCustomExercise]);

    const generateNewExercise = () => {
        // לוגיקה פשוטה ליצירת תרגילים
        let num1, num2, correctAnswer;

        if (exercise.type === 'addition') {
            num1 = Math.floor(Math.random() * 50) + 10;
            num2 = Math.floor(Math.random() * 40) + 10;
            correctAnswer = num1 + num2;
        } else {
            num1 = Math.floor(Math.random() * 50) + 30;
            num2 = Math.floor(Math.random() * 20) + 10;
            correctAnswer = num1 - num2;
        }

        setCurrentProblem({
            num1,
            num2,
            operator: exercise.type === 'addition' ? '+' : '-',
            correctAnswer
        });

        setUserAnswer('');
        setIsCorrect(null);
        setShowFeedback(false);
        setCreatingNewCustomExercise(false);
    };

    const handleCustomExercise = (problem) => {
        setCurrentProblem(problem);
        setLastCustomExercise(problem); // שמירת התרגיל האחרון שנוצר
        setUserAnswer('');
        setIsCorrect(null);
        setShowFeedback(false);
        setCreatingNewCustomExercise(false);
    };

    const handleAnswerChange = (value) => {
        setUserAnswer(value);
    };

    // ניתוח סוגי שגיאות - פונקציה שימושית למתן משוב מדויק
    const analyzeError = (userAnswer, correctAnswer, problem) => {
        const userDigit = parseInt(userAnswer);
        const correctDigit = parseInt(correctAnswer);
        const operator = problem.operator;

        // טעות של החלפת סדר הספרות במספרים דו-ספרתיים
        if (Math.abs(userDigit - correctDigit) === 9) {
            return {
                type: 'digit-reversal',
                message: 'נראה שהחלפת את סדר הספרות. זכור שהספרה הימנית היא יחידות והשמאלית היא עשרות.'
            };
        }

        // טעות של התעלמות משארית
        if (operator === '+' && userDigit === (correctDigit - 1) % 10) {
            return {
                type: 'carry-ignored',
                message: 'שכחת להוסיף את השארית מהעמודה הקודמת.'
            };
        }

        // טעות של אי-ביצוע פריטה בחיסור
        if (operator === '-' && userDigit === correctDigit - 10) {
            return {
                type: 'borrow-error',
                message: 'כאשר המספר למעלה קטן מהמספר למטה, צריך לבצע פריטה מהעמודה השמאלית.'
            };
        }

        return {
            type: 'general-error',
            message: 'בדוק שוב את החישוב שלך.'
        };
    };

    const handleSubmitAnswer = (answer) => {
        const correct = parseInt(answer) === currentProblem.correctAnswer;
        setIsCorrect(correct);

        if (!correct) {
            // אנליזת השגיאה
            const errorAnalysis = analyzeError(answer, currentProblem.correctAnswer.toString(), currentProblem);

            // הכנת הסבר לטעות
            if (exercise.type === 'addition') {
                setExplanation(`
                כאשר מחברים ${currentProblem.num1} ו-${currentProblem.num2}, 
                התשובה הנכונה היא ${currentProblem.correctAnswer}. 
                ${errorAnalysis.message}
                שים לב לפעולת החיבור מימין לשמאל ולנשיאת הספרות במידת הצורך.
                `);
            } else {
                setExplanation(`
                כאשר מחסרים ${currentProblem.num2} מ-${currentProblem.num1}, 
                התשובה הנכונה היא ${currentProblem.correctAnswer}. 
                ${errorAnalysis.message}
                שים לב לפעולת החיסור מימין לשמאל ולפריטה במידת הצורך.
                `);
            }
        }

        setShowFeedback(true);
    };

    const checkAnswer = () => {
        const correct = parseInt(userAnswer) === currentProblem.correctAnswer;
        setIsCorrect(correct);

        if (!correct) {
            // אנליזת השגיאה
            const errorAnalysis = analyzeError(userAnswer, currentProblem.correctAnswer.toString(), currentProblem);

            // הכנת הסבר לטעות
            if (exercise.type === 'addition') {
                setExplanation(`
                כאשר מחברים ${currentProblem.num1} ו-${currentProblem.num2}, 
                התשובה הנכונה היא ${currentProblem.correctAnswer}. 
                ${errorAnalysis.message}
                שים לב לפעולת החיבור מימין לשמאל ולנשיאת הספרות במידת הצורך.
                `);
            } else {
                setExplanation(`
                כאשר מחסרים ${currentProblem.num2} מ-${currentProblem.num1}, 
                התשובה הנכונה היא ${currentProblem.correctAnswer}. 
                ${errorAnalysis.message}
                שים לב לפעולת החיסור מימין לשמאל ולפריטה במידת הצורך.
                `);
            }
        }

        setShowFeedback(true);
    };

    const nextExercise = () => {
        if (exercise.isCustom) {
            // עבור לטופס יצירת תרגיל חדש
            setCreatingNewCustomExercise(true);
            setCurrentProblem(null);
            setShowFeedback(false);
        } else {
            generateNewExercise();
        }
    };

    // אם במצב יצירת תרגיל מותאם אישית
    if (exercise.isCustom && (creatingNewCustomExercise || !currentProblem)) {
        return (
            <div className="exercise-area">
                <div className="exercise-header">
                    <button className="back-button" onClick={onBack}>חזרה לבחירת תרגיל</button>
                    <h2>
                        {showFeedback ? 'יצירת תרגיל חדש' : 'יצירת תרגיל'}
                        {` ${exercise.type === 'addition' ? 'חיבור' : 'חיסור'} ${exercise.format === 'vertical' ? 'במאונך' : 'במאוזן'}`}
                    </h2>
                </div>

                <CustomExerciseCreator
                    exerciseType={exercise.type}
                    exerciseFormat={exercise.format}
                    onCreateExercise={handleCustomExercise}
                    onBack={onBack}
                    initialValues={lastCustomExercise} // העברת הערכים האחרונים כערכי התחלה
                />
            </div>
        );
    }

    // אם אין תרגיל נוכחי ואנחנו לא במצב משוב, נציג הודעת טעינה
    if (!currentProblem && !showFeedback) {
        return (
            <div className="exercise-area">
                <div className="exercise-header">
                    <button className="back-button" onClick={onBack}>חזרה לבחירת תרגיל</button>
                    <h2>
                        {exercise.type === 'addition' ? 'תרגיל חיבור' : 'תרגיל חיסור'}
                        {exercise.format === 'vertical' ? ' במאונך' : ' במאוזן'}
                    </h2>
                </div>
                <div className="loading-container">
                    <p>טוען תרגיל...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="exercise-area">
            <div className="exercise-header">
                <button className="back-button" onClick={onBack}>חזרה לבחירת תרגיל</button>
                <h2>
                    {exercise.type === 'addition' ? 'תרגיל חיבור' : 'תרגיל חיסור'}
                    {exercise.format === 'vertical' ? ' במאונך' : ' במאוזן'}
                </h2>
            </div>

            {currentProblem && !showFeedback && (
                <div className="problem-container">
                    {exercise.format === 'vertical' ? (
                        <VerticalExercise
                            problem={currentProblem}
                            onSubmitAnswer={handleSubmitAnswer}
                        />
                    ) : (
                        <div dir="ltr"> {/* הוספת דירקטיב LTR לתרגילים במאוזן */}
                            <HorizontalExercise
                                problem={currentProblem}
                                userAnswer={userAnswer}
                                onAnswerChange={handleAnswerChange}
                            />
                        </div>
                    )}

                    {exercise.format !== 'vertical' && (
                        <button
                            className="check-button"
                            onClick={checkAnswer}
                            disabled={!userAnswer}
                        >
                            בדוק תשובה
                        </button>
                    )}
                </div>
            )}

            {showFeedback && (
                <ExerciseFeedback
                    isCorrect={isCorrect}
                    explanation={explanation}
                    correctAnswer={currentProblem.correctAnswer}
                    problem={currentProblem}
                    onNext={nextExercise}
                    nextButtonText={exercise.isCustom ? "צור תרגיל חדש" : "לתרגיל הבא"}
                />
            )}
        </div>
    );
}

export default ExerciseArea;