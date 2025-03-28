// src/components/student/exercises/HorizontalExercise.js
import React from 'react';
import '../StudentStyles.css';


function HorizontalExercise({ problem, userAnswer, onAnswerChange }) {
    const { num1, num2, operator } = problem;

    return (
        <div className="horizontal-exercise">
            <div className="horizontal-problem">
                <span className="number">{num1}</span>
                <span className="operator">{operator}</span>
                <span className="number">{num2}</span>
                <span className="equals">=</span>
                <input
                    type="text"
                    className="answer-input"
                    value={userAnswer}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    placeholder="?"
                />
            </div>
        </div>
    );
}

export default HorizontalExercise;