import React, { useState } from 'react';
import BarChart from '../../charts/BarChart';

function DetailedAnalysis({ data }) {
    const [selectedTopic, setSelectedTopic] = useState(data?.topics?.[0]?.id || '');

    if (!data) return <div className="loading">טוען נתונים...</div>;

    // נתונים לגרף
    const chartData = data.topics.map(topic => ({
        name: topic.name,
        successRate: topic.classSuccessRate,
        exercises: topic.exerciseCount
    }));

    return (
        <div className="detailed-analysis">
            <h2>ניתוח מפורט</h2>

            <div className="topics-overview">
                <h3>סקירת נושאים</h3>

                <div className="chart-container">
                    <BarChart
                        data={chartData}
                        xKey="name"
                        yKeys={[
                            { key: 'successRate', name: 'אחוז הצלחה', color: '#4caf50' }
                        ]}
                    />
                </div>

                <div className="topics-selector">
                    <label htmlFor="topic-select">בחר נושא לניתוח מעמיק:</label>
                    <select
                        id="topic-select"
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                    >
                        {data.topics.map(topic => (
                            <option key={topic.id} value={topic.id}>{topic.name}</option>
                        ))}
                    </select>
                </div>

                {selectedTopic && (
                    <div className="topic-details">
                        <h4>{data.topics.find(t => t.id === selectedTopic)?.name}</h4>

                        <div className="topic-stats">
                            <div className="topic-stat">
                                <span className="stat-label">אחוז הצלחה כיתתי:</span>
                                <span className="stat-value">
                                    {data.topics.find(t => t.id === selectedTopic)?.classSuccessRate}%
                                </span>
                            </div>
                            <div className="topic-stat">
                                <span className="stat-label">מספר תרגילים:</span>
                                <span className="stat-value">
                                    {data.topics.find(t => t.id === selectedTopic)?.exerciseCount}
                                </span>
                            </div>
                            <div className="topic-stat">
                                <span className="stat-label">רמת קושי:</span>
                                <span className="stat-value">
                                    {data.topics.find(t => t.id === selectedTopic)?.difficultyLevel}
                                </span>
                            </div>
                        </div>

                        <div className="topic-recommendations">
                            <h5>המלצות:</h5>
                            <ul>
                                <li>תרגול נוסף בקבוצות קטנות</li>
                                <li>שימוש באמצעי המחשה ויזואליים</li>
                                <li>חזרה על מושגי בסיס הקשורים לנושא</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailedAnalysis;