// קומפוננטת פידבק עם דגש על צמיחה
function GrowthMindsetFeedback({ result, improvement, streak }) {
    // מסרים עם דגש על תהליך ומאמץ במקום על יכולת מולדת
    const growthMessages = {
        correct: [
            "ראיתי איך התאמצת! זה השתלם!",
            "הפעלת אסטרטגיה חכמה מאוד",
            "כל אימון במתמטיקה מחזק את המוח שלך",
            "יופי! המאמץ שלך משתלם",
            "כשמתמידים, מצליחים!",
            "ראיתי איך חשבת על זה בריכוז - עבודה נהדרת!"
        ],
        incorrect: [
            "עוד לא הצלחת - אבל אתה בדרך!",
            "טעויות עוזרות לנו לגדול חזקים יותר",
            "המוח שלך צומח כשמתמודדים עם אתגרים",
            "כל ניסיון מקרב אותך להצלחה",
            "בוא ננסה דרך שונה ביחד",
            "זה בסדר לטעות - ככה לומדים!"
        ],
        improvement: [
            "וואו! רואים שיפור ברור מהפעם הקודמת!",
            "מדהים איך ההתמדה שלך משתלמת!",
            "אתה מתקדם בקצב מרשים!",
            "שמת לב כמה התקדמת מהתרגיל הקודם?"
        ],
        streak: [
            "רצף של הצלחות! אתה ממש מתמיד!",
            "זה כבר התרגיל ה-{streak} ברצף שאתה פותר נכון!",
            "איזה כיף לראות התמדה כזו!"
        ]
    };

    // בחירת המסר המתאים
    let message;
    if (streak >= 3) {
        message = growthMessages.streak[Math.floor(Math.random() * growthMessages.streak.length)];
        message = message.replace('{streak}', streak);
    } else if (improvement) {
        message = growthMessages.improvement[Math.floor(Math.random() * growthMessages.improvement.length)];
    } else if (result === 'correct') {
        message = growthMessages.correct[Math.floor(Math.random() * growthMessages.correct.length)];
    } else {
        message = growthMessages.incorrect[Math.floor(Math.random() * growthMessages.incorrect.length)];
    }

    return (
        <div className={`mindset-feedback ${result}`}>
            <div className="feedback-icon">
                {result === 'correct' ? '😊' : '🤔'}
            </div>
            <p className="feedback-message">{message}</p>

            {result === 'incorrect' && (
                <div className="encouragement-actions">
                    <button className="try-again-button">
                        נסה שוב - אתה יכול!
                    </button>
                    <button className="strategy-button">
                        בוא נחשוב על אסטרטגיה ביחד
                    </button>
                </div>
            )}
        </div>
    );
}