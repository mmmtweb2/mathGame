// src/components/teacher/planning/PersonalizedLearningPlan.js
import React, { useState, useEffect } from 'react'; // הוספת הייבוא החסר
import '../TeacherStyles.css';

function PersonalizedLearningPlan({ studentId }) {
    const [student, setStudent] = useState(null);
    const [plan, setPlan] = useState(null);
    const [customizationMode, setCustomizationMode] = useState(false);

    useEffect(() => {
        // קבלת נתוני התלמיד
        fetchStudentData(studentId);
    }, [studentId]);

    const fetchStudentData = async (id) => {
        // בפרויקט אמיתי, API call לקבלת נתוני התלמיד
        // נתונים מדומים לצורך הדוגמה
        const studentData = {
            id,
            name: 'דניאל כהן',
            grade: 'ג',
            learningStyle: 'visual', // visual, auditory, kinesthetic
            strengths: ['שליטה בעובדות בסיסיות', 'חיבור פשוט', 'זיהוי מספרים'],
            weaknesses: ['חיסור עם פריטה', 'ערך המקום', 'פתרון בעיות מילוליות'],
            recentProgress: {
                overallSuccessRate: 68,
                topicRates: {
                    'addition': 85,
                    'subtraction': 55,
                    'place-value': 65
                }
            },
            learningHistory: {
                completedTopics: ['simple-addition', 'number-identification'],
                inProgressTopics: ['subtraction-with-borrowing', 'place-value'],
                notStartedTopics: ['word-problems', 'mental-math-strategies']
            }
        };

        setStudent(studentData);

        // יצירת תוכנית למידה מותאמת אישית
        generateLearningPlan(studentData);
    };

    const generateLearningPlan = (studentData) => {
        // יצירת תוכנית למידה מותאמת
        // קוד להגדרת תוכנית לימודים מפורטת יכול להיות כאן
        setPlan({
            // נתוני תוכנית לדוגמה
            shortTermGoals: [
                {
                    id: 'goal-1',
                    title: 'שיפור חיסור עם פריטה',
                    currentLevel: 2,
                    targetLevel: 4,
                    timeframe: '3 שבועות'
                }
            ]
        });
    };

    if (!student || !plan) return <div>טוען נתונים...</div>;

    return (
        <div className="personalized-learning-plan">
            <h2>תוכנית למידה מותאמת אישית: {student.name}</h2>
            {/* תוכן התוכנית האישית */}
        </div>
    );
}

export default PersonalizedLearningPlan; // הוספת ייצוא ברירת מחדל