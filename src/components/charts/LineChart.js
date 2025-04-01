import React from 'react';
import './charts.css';

function LineChart({ data, xKey, yKeys }) {
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

    const chartHeight = 200;
    const chartWidth = data.length > 1 ? (data.length - 1) * 80 : 200;

    const getPointY = (value) => {
        const calculatedY = chartHeight - (value / maxValue * chartHeight);
        return isNaN(calculatedY) ? 0 : calculatedY;
    };

    return (
        <div className="line-chart">
            <div className="chart-container">
                {/* ציר Y */}
                <div className="y-axis">
                    {[0, 25, 50, 75, 100].map(tick => (
                        <div key={tick} className="y-tick" style={{ bottom: `${tick}%` }}>
                            <span className="tick-label">{tick}</span>
                            <span className="tick-line"></span>
                        </div>
                    ))}
                </div>

                {/* גוף הגרף */}
                <div className="chart-body">
                    <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                        {yKeys.map((yKey, lineIndex) => {
                            const linePoints = data.map((item, index) => {
                                const x = index * (chartWidth / (data.length - 1));
                                const y = getPointY(item[yKey.key]);
                                return { x, y };
                            });

                            // יצירת נתיב הקו
                            const pathData = linePoints.map((point, idx) =>
                                `${idx === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
                            ).join(' ');

                            return (
                                <g key={lineIndex}>
                                    {/* קו */}
                                    <path
                                        d={pathData}
                                        fill="none"
                                        stroke={yKey.color || '#4caf50'}
                                        strokeWidth="2"
                                    />

                                    {/* נקודות */}
                                    {linePoints.map((point, pointIndex) => (
                                        <circle
                                            key={pointIndex}
                                            cx={point.x}
                                            cy={point.y}
                                            r="4"
                                            fill={yKey.color || '#4caf50'}
                                            stroke="white"
                                            strokeWidth="1"
                                        />
                                    ))}
                                </g>
                            );
                        })}
                    </svg>

                    {/* תוויות ציר X */}
                    <div className="x-labels">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className="x-label"
                                style={{ left: `${index * (100 / (data.length - 1))}%` }}
                            >
                                {item[xKey]}
                            </div>
                        ))}
                    </div>
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

export default LineChart;