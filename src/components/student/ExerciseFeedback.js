// src/components/student/ExerciseFeedback.js
import React, { useEffect } from 'react';
import './StudentStyles.css';

function ExerciseFeedback({ isCorrect, explanation, correctAnswer, problem, onNext, nextButtonText = "לתרגיל הבא" }) {
    // מאגר תגובות חיוביות
    const praises = [
        'כל הכבוד! אתה אלוף/ה!',
        'מצוין! עבודה נהדרת!',
        'וואו! זה היה מדהים!',
        'יופי של עבודה!',
        'תותח/ית! ממש מרשים!',
        'איזה יופי! אתה/את ממש מוכשר/ת בחשבון!',
        'מעולה! אתה/את ממש מצליח/ה!',
        'נכון מאוד! המשך/המשיכי כך!',
        'סחתיין! תשובה מושלמת!',
        'מדהים! הצלחת לפתור את התרגיל בצורה מושלמת!'
    ];

    // מאגר תגובות עידוד
    const encouragements = [
        'כמעט! הייתה לך מחשבה טובה',
        'אל דאגה, נסיון הוא חלק מהלמידה!',
        'עוד מעט תצליח/י, המשך/המשיכי להתאמן!',
        'טעויות עוזרות לנו ללמוד, נסה/י שוב בתרגיל הבא!',
        'אופס, לא בדיוק... אבל אתה/את בכיוון הנכון!',
        'היית קרוב/ה מאוד! בתרגיל הבא תצליח/י!',
        'אל תתייאש/י! תרגול מוביל לשיפור!',
        'לא נורא, זו הזדמנות ללמוד משהו חדש!',
        'גם אני טועה לפעמים, זה חלק מהדרך להצלחה!',
        'קשה לפעמים, אבל אני בטוח/ה שתשתפר/י בהמשך!'
    ];

    // בחירה אקראית
    const feedbackTitle = isCorrect
        ? praises[Math.floor(Math.random() * praises.length)]
        : encouragements[Math.floor(Math.random() * encouragements.length)];

    // הצגת הסבר מפורט עם המחשה ויזואלית
    const renderDetailedExplanation = () => {
        if (!problem) return explanation;

        const { num1, num2, operator } = problem;
        let detailedExplanation = '';

        if (operator === '+') {
            // הסבר לחיבור
            const num1Digits = num1.toString().split('').reverse();
            const num2Digits = num2.toString().split('').reverse();
            const maxLength = Math.max(num1Digits.length, num2Digits.length);

            detailedExplanation = `
        <div class="explanation-details">
          <p>כאשר מחברים ${num1} ו-${num2}, עובדים מימין לשמאל (מספרת האחדות):</p>
          
          <div class="explanation-steps">
      `;

            let carry = 0;
            for (let i = 0; i < maxLength; i++) {
                const digit1 = i < num1Digits.length ? parseInt(num1Digits[i]) : 0;
                const digit2 = i < num2Digits.length ? parseInt(num2Digits[i]) : 0;
                const sum = digit1 + digit2 + carry;
                const resultDigit = sum % 10;
                const newCarry = Math.floor(sum / 10);

                detailedExplanation += `
          <div class="step">
            <div class="step-header">עמודה ${i === 0 ? 'ראשונה (אחדות)' : i === 1 ? 'שנייה (עשרות)' : i === 2 ? 'שלישית (מאות)' : (i + 1)}</div>
            <div class="step-content">
              ${carry > 0 ? `<div class="carry-note">שארית מהעמודה הקודמת: ${carry}</div>` : ''}
              <div class="calculation">${digit1} + ${digit2} ${carry > 0 ? `+ ${carry} (שארית)` : ''} = ${sum}</div>
              ${sum >= 10 ? `<div class="carry-result">רושמים ${resultDigit} ומעבירים שארית ${newCarry} לעמודה הבאה</div>` : ''}
            </div>
          </div>
        `;

                carry = newCarry;
            }

            // אם נשארה שארית בסוף
            if (carry > 0) {
                detailedExplanation += `
          <div class="step">
            <div class="step-header">עמודה אחרונה</div>
            <div class="step-content">
              <div class="carry-note">שארית מהעמודה הקודמת: ${carry}</div>
              <div class="calculation">רושמים ${carry}</div>
            </div>
          </div>
        `;
            }

            detailedExplanation += `
          </div>
          <p class="final-result">לכן, ${num1} + ${num2} = ${correctAnswer}</p>
        </div>
      `;
        } else {
            // הסבר לחיסור
            const num1Digits = num1.toString().split('').reverse();
            const num2Digits = num2.toString().split('').reverse();
            const maxLength = Math.max(num1Digits.length, num2Digits.length);

            detailedExplanation = `
        <div class="explanation-details">
          <p>כאשר מחסרים ${num2} מ-${num1}, עובדים מימין לשמאל (מספרת האחדות):</p>
          
          <div class="explanation-steps">
      `;

            let borrow = 0;
            for (let i = 0; i < maxLength; i++) {
                let digit1 = i < num1Digits.length ? parseInt(num1Digits[i]) : 0;
                const digit2 = i < num2Digits.length ? parseInt(num2Digits[i]) : 0;

                digit1 = digit1 - borrow;
                borrow = 0;

                let diff;
                let needBorrow = false;

                if (digit1 < digit2) {
                    diff = digit1 + 10 - digit2;
                    needBorrow = true;
                    borrow = 1;
                } else {
                    diff = digit1 - digit2;
                }

                detailedExplanation += `
          <div class="step">
            <div class="step-header">עמודה ${i === 0 ? 'ראשונה (אחדות)' : i === 1 ? 'שנייה (עשרות)' : i === 2 ? 'שלישית (מאות)' : (i + 1)}</div>
            <div class="step-content">
              ${needBorrow ? `<div class="borrow-note">צריך פריטה! מוסיפים 10 לספרה ${digit1} ולוקחים 1 מהעמודה הבאה</div>` : ''}
              <div class="calculation">${needBorrow ? `(${digit1} + 10)` : digit1} - ${digit2} = ${diff}</div>
            </div>
          </div>
        `;
            }

            detailedExplanation += `
          </div>
          <p class="final-result">לכן, ${num1} - ${num2} = ${correctAnswer}</p>
        </div>
      `;
        }

        return detailedExplanation;
    };

    // נוסיף פונקציה שיוצרת קונפטי בעת תשובה נכונה
    useEffect(() => {
        if (isCorrect) {
            const confettiContainer = document.querySelector('.confetti-animation');
            if (confettiContainer) {
                // יצירת 50 חתיכות קונפטי
                for (let i = 0; i < 50; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti-piece';

                    // צבעים אקראיים
                    const colors = ['#4caf50', '#1976d2', '#ff9800', '#e91e63', '#9c27b0', '#ffeb3b'];
                    const color = colors[Math.floor(Math.random() * colors.length)];

                    // מיקום אקראי
                    const left = Math.floor(Math.random() * 100);

                    // זמני אנימציה אקראיים
                    const fallDuration = 3 + Math.random() * 2; // 3-5 שניות
                    const fallDelay = Math.random() * 3; // 0-3 שניות

                    // הגדרת סגנון
                    confetti.style.setProperty('--color', color);
                    confetti.style.setProperty('--fall-duration', `${fallDuration}s`);
                    confetti.style.setProperty('--fall-delay', `${fallDelay}s`);
                    confetti.style.left = `${left}%`;

                    confettiContainer.appendChild(confetti);
                }

                // ניקוי הקונפטי אחרי כמה שניות
                setTimeout(() => {
                    if (confettiContainer) {
                        confettiContainer.innerHTML = '';
                    }
                }, 8000);
            }
        }
    }, [isCorrect]);

    return (
        <div className={`exercise-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-header">
                <div className={`feedback-icon ${isCorrect ? 'success-icon' : 'error-icon'}`}>
                    {isCorrect ? '✓' : '✗'}
                </div>
                <h3>{feedbackTitle}</h3>
            </div>

            {isCorrect ? (
                <div className="success-content">
                    <p className="celebration-text">התשובה שלך: {correctAnswer} - נכונה!</p>
                    <div className="confetti-animation"></div>
                </div>
            ) : (
                <div className="error-content">
                    <p className="correction-text">התשובה הנכונה היא: <span className="correct-answer">{correctAnswer}</span></p>
                    <div
                        className="explanation-container"
                        dangerouslySetInnerHTML={{ __html: renderDetailedExplanation() }}
                    />
                </div>
            )}

            <button onClick={onNext} className="next-button">
                {nextButtonText} <span className="arrow-icon">→</span>
            </button>
        </div>
    );
}

export default ExerciseFeedback;