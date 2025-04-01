import React, { useState, useEffect } from 'react';
// ייבוא קומפוננטות ניתוח
import ClassOverview from './ClassOverview';
import DetailedAnalysis from './DetailedAnalysis';
import DiagnosticReport from './DiagnosticReport';
import LearningPatterns from './LearningPatterns';
import StudentDetailedModal from './StudentDetailedModal';

function TeacherAnalyticsDashboard({ classId }) {
    const [classData, setClassData] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [dateRange, setDateRange] = useState('month'); // week, month, semester, year
    const [viewMode, setViewMode] = useState('overview'); // overview, detailed, diagnostic, patterns

    useEffect(() => {
        // פונקציה לקבלת נתונים על הכיתה והתלמידים
        fetchClassData(classId, dateRange);
    }, [classId, dateRange]);

    const fetchClassData = async (classId, range) => {
        // בפרויקט אמיתי, זה יהיה API call לקבלת נתונים
        // מדומה לצורך הדוגמה
        const data = {
            classInfo: {
                name: 'כיתה ג׳2',
                averageSuccessRate: 72,
                averageCompletionTime: 45, // שניות
                studentsCount: 25,
                topChallengingTopics: ['חיסור עם פריטה כפולה', 'חיבור עם ערכי מקום'],
            },
            students: [
                {
                    id: 'st101',
                    name: 'דניאל כהן',
                    totalExercises: 124,
                    successRate: 68,
                    topChallengingTopic: 'חיסור עם פריטה',
                    improvement: 5,
                    lastActivity: '2 שעות',
                    streak: 3,
                    status: 'struggling',
                },
                // more students...
            ],
            topics: [
                {
                    id: 'topic1',
                    name: 'חיבור פשוט',
                    classSuccessRate: 84,
                    exerciseCount: 340,
                    difficultyLevel: 'קל',
                },
                // more topics...
            ]
        };

        setClassData(data);
    };

    const fetchStudentDetailedData = async (studentId) => {
        // קבלת נתונים מפורטים על תלמיד ספציפי
        // ...
        setSelectedStudent(/* detailed student data */);
    };

    if (!classData) return <div>טוען נתונים...</div>;

    return (
        <div className="teacher-analytics-dashboard">
            <div className="dashboard-header">
                <h1>נתוני {classData.classInfo.name}</h1>
                <div className="date-range-selector">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                    >
                        <option value="week">שבוע אחרון</option>
                        <option value="month">חודש אחרון</option>
                        <option value="semester">סמסטר נוכחי</option>
                        <option value="year">שנה נוכחית</option>
                    </select>
                </div>
                <div className="view-mode-selector">
                    <button
                        className={viewMode === 'overview' ? 'active' : ''}
                        onClick={() => setViewMode('overview')}
                    >
                        סקירה כללית
                    </button>
                    <button
                        className={viewMode === 'detailed' ? 'active' : ''}
                        onClick={() => setViewMode('detailed')}
                    >
                        ניתוח מפורט
                    </button>
                    <button
                        className={viewMode === 'diagnostic' ? 'active' : ''}
                        onClick={() => setViewMode('diagnostic')}
                    >
                        אבחון קשיים
                    </button>
                    <button
                        className={viewMode === 'patterns' ? 'active' : ''}
                        onClick={() => setViewMode('patterns')}
                    >
                        דפוסי למידה
                    </button>
                </div>
            </div>

            <div className="dashboard-content">
                {viewMode === 'overview' && <ClassOverview data={classData} />}
                {viewMode === 'detailed' && <DetailedAnalysis data={classData} />}
                {viewMode === 'diagnostic' && <DiagnosticReport data={classData} />}
                {viewMode === 'patterns' && <LearningPatterns data={classData} />}
            </div>

            {selectedStudent && (
                <StudentDetailedModal
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                />
            )}
        </div>
    );
}

export default TeacherAnalyticsDashboard;