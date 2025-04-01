// src/components/student/exercises/CustomExerciseCreator.js
import React, { useState, useEffect } from 'react';
import '../StudentStyles.css';

function CustomExerciseCreator({ exerciseType, exerciseFormat, onCreateExercise, onBack, initialValues = null }) {
    const [num1, setNum1] = useState(initialValues?.num1?.toString() || '');
    const [num2, setNum2] = useState(initialValues?.num2?.toString() || '');
    const [error, setError] = useState('');

    useEffect(() => {
        // איפוס השדות אם הערכים ההתחלתיים השתנו
        if (initialValues) {
            setNum1(initialValues.num1.toString());
            setNum2(initialValues.num2.toString());
        }
    }, [initialValues]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // וידוא קלט תקין
        if (!num1 || !num2) {
            setError('יש להזין שני מספרים');
            return;
        }

        const number1 = parseInt(num1);
        const number2 = parseInt(num2);

        if (isNaN(number1) || isNaN(number2)) {
            setError('יש להזין מספרים בלבד');
            return;
        }

        if (number1 <= 0 || number2 <= 0) {
            setError('יש להזין מספרים חיוביים בלבד');
            return;
        }

        if (exerciseType === 'subtraction' && number2 > number1) {
            setError('בתרגיל חיסור, המספר הראשון חייב להיות גדול מהשני');
            return;
        }

        // חישוב התשובה הנכונה
        const correctAnswer = exerciseType === 'addition' ? number1 + number2 : number1 - number2;

        // יצירת התרגיל
        onCreateExercise({
            num1: number1,
            num2: number2,
            operator: exerciseType === 'addition' ? '+' : '-',
            correctAnswer
        });
    };

    const clearFields = () => {
        setNum1('');
        setNum2('');
        setError('');
    };

    return (
        <div className="custom-exercise-creator">
            <h3>צור תרגיל {exerciseType === 'addition' ? 'חיבור' : 'חיסור'} {exerciseFormat === 'vertical' ? 'במאונך' : 'במאוזן'}</h3>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="creator-form">
                <div className="exercise-preview">
                    {exerciseFormat === 'vertical' ? (
                        <div className="vertical-preview">
                            <div className="preview-line">{num1 || '?'}</div>
                            <div className="preview-operator">{exerciseType === 'addition' ? '+' : '-'} {num2 || '?'}</div>
                            <div className="preview-separator">_____</div>
                            <div className="preview-result">?</div>
                        </div>
                    ) : (
                        <div className="horizontal-preview" dir="ltr">
                            <span>{num1 || '?'}</span>
                            <span className="preview-operator">{exerciseType === 'addition' ? '+' : '-'}</span>
                            <span>{num2 || '?'}</span>
                            <span>=</span>
                            <span>?</span>
                        </div>
                    )}
                </div>

                <div className="input-group">
                    <label htmlFor="num1">מספר ראשון:</label>
                    <input
                        type="number"
                        id="num1"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        min="1"
                        max="999"
                        placeholder="הזן מספר"
                        autoFocus
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="num2">מספר שני:</label>
                    <input
                        type="number"
                        id="num2"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        min="1"
                        max="999"
                        placeholder="הזן מספר"
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="create-button">צור תרגיל</button>
                    <button type="button" className="clear-button" onClick={clearFields}>נקה שדות</button>
                </div>
            </form>
        </div>
    );
}

export default CustomExerciseCreator;