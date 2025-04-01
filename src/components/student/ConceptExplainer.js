import React from 'react';
import './StudentStyles.css';

// קומפוננטה להסבר מושגים דרך מטאפורות מחיי היומיום
function ConceptExplainer({ concept }) {
    const explanations = {
        'carry': {
            title: 'שארית/העברה (Carry)',
            metaphor: 'קופסת ביצים',
            explanation: 'חשוב על קופסת ביצים שיכולה להכיל רק 10 ביצים. אם יש לך 14 ביצים, הקופסה הראשונה תהיה מלאה עם 10 ביצים, ותצטרך קופסה נוספת עבור 4 הביצים הנותרות. ה-10 הביצים שהעברת לקופסה החדשה הן ה"שארית" או ה"נשיאה".',
            visualAid: '/images/egg-carton-carry.gif',
            interactiveDemo: true
        },
        'borrow': {
            title: 'פריטה/הלוואה (Borrow)',
            metaphor: 'פריטת שטר לפרוטות',
            explanation: 'דמיין שאתה צריך לשלם 7 שקלים אבל יש לך רק שטר של 10 שקלים. אתה "פורט" את השטר ל-10 מטבעות של שקל אחד, משתמש ב-7 מטבעות, ונשארים לך 3 מטבעות. כך גם במתמטיקה - אנחנו "פורטים" עשרת אחת ל-10 יחידות כשצריך.',
            visualAid: '/images/money-borrow.gif',
            interactiveDemo: true
        },
        'placeValue': {
            title: 'ערך המקום (Place Value)',
            metaphor: 'קופסאות אחסון',
            explanation: 'דמיין שיש לך קופסאות אחסון בגדלים שונים. בקופסה הקטנה ביותר נכנס פריט אחד בלבד (יחידות). בקופסה הבאה בגודל נכנסות 10 קופסאות קטנות (עשרות). בקופסה הגדולה יותר נכנסות 10 קופסאות בינוניות (מאות). המיקום של כל ספרה במספר קובע איזה גודל של קופסה היא מייצגת.',
            visualAid: '/images/storage-boxes.gif',
            interactiveDemo: true
        }
    };

    const conceptData = explanations[concept] || {
        title: 'מושג לא מוכר',
        metaphor: '',
        explanation: 'מידע לא נמצא',
        visualAid: '',
        interactiveDemo: false
    };

    return (
        <div className="concept-explainer">
            <h3>{conceptData.title}</h3>

            <div className="metaphor-section">
                <h4>מטאפורה: {conceptData.metaphor}</h4>
                <p>{conceptData.explanation}</p>
            </div>

            {conceptData.visualAid && (
                <div className="visual-explainer">
                    <img src={conceptData.visualAid} alt={`המחשה ויזואלית של ${conceptData.title}`} />
                </div>
            )}

            {conceptData.interactiveDemo && (
                <button className="try-it-button">
                    נסה/י בעצמך
                </button>
            )}
        </div>
    );
}

export default ConceptExplainer;