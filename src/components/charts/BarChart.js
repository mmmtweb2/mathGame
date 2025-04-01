import React from 'react';
import './charts.css';

function BarChart({ data, xKey, yKeys }) {
    // בדיקת תקינות הנתונים
    if (!data || !data.length || !yKeys || !yKeys.length) {
        return <div className="chart-error">לא ניתן להציג תרשים - חסרים נתונים</div>;
    }

    // מציאת הערך המקסימלי לקביעת סקאלה
    const maxValue = Math.max(
        ...data.flatMap(item =>
            yKeys.map(y => typeof item[y.key] === 'number' ? item[y.key] : 0)
        )
    );

    return (
        <div className="bar-chart">
            <div className="chart-container">
                {/* ציר Y */}
                <div className="y-axis">
                    {[0, 25, 50, 75, 100].map(tick => (
                        <div key={tick} className="y-tick">
                            <span className="tick-label">{tick}</span>
                            <span className="tick-line"></span>
                        </div>
                    ))}
                </div>

                {/* גוף הגרף */}
                <div className="chart-body">
                    {data.map((item, index) => (
                        <div key={index} className="bar-group">
                            {yKeys.map((yKey, yIndex) => {
                                const value = typeof item[yKey.key] === 'number' ? item[yKey.key] : 0;
                                return (
                                    <div key={yIndex} className="bar-wrapper">
                                        <div
                                            className="bar"
                                            style={{
                                                height: `${(value / maxValue) * 100}%`,
                                                backgroundColor: yKey.color || '#4caf50'
                                            }}
                                            title={`${yKey.name || yKey.key}: ${value}`}
                                        >
                                            <span className="bar-value">{value}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="x-label">{item[xKey]}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* מקרא */}
            {yKeys.length > 1 && (
                <div className="chart-legend">
                    {yKeys.map((yKey, index) => (
                        <div key={index} className="legend-item">
                            <span
                                className="legend-color"
                                style={{ backgroundColor: yKey.color || '#4caf50' }}
                            ></span>
                            <span className="legend-label">{yKey.name || yKey.key}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BarChart;