// src/components/student/exercises/CustomExerciseCreator.js
import React, { useState } from 'react';
import '../StudentStyles.css';


function CustomExerciseCreator({ exerciseType, exerciseFormat, onCreateExercise, onBack }) {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [error, setError] = useState('');

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

    return (
        <div className="custom-exercise-creator">
            <div className="creator-header">
                <button className="back-button" onClick={onBack}>חזרה לבחירת תרגיל</button>
                <h2>יצירת תרגיל {exerciseType === 'addition' ? 'חיבור' : 'חיסור'} {exerciseFormat === 'vertical' ? 'במאונך' : 'במאוזן'}</h2>
            </div>

            <form onSubmit={handleSubmit} className="creator-form">
                {error && <div className="error-message">{error}</div>}

                <div className="input-group">
                    <label>מספר ראשון:</label>
                    <input
                        type="number"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        min="1"
                        max="999"
                    />
                </div>

                <div className="input-group">
                    <label>מספר שני:</label>
                    <input
                        type="number"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        min="1"
                        max="999"
                    />
                </div>

                <button type="submit" className="create-button">צור תרגיל</button>
            </form>
        </div>
    );
}

export default CustomExerciseCreator;   