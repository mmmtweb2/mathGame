import React from 'react';
import './charts.css';

function MultiLineChart({ datasets, xKey, yKey }) {
    if (!datasets || !datasets.length) {
        return <div className="chart-error">לא ניתן להציג תרשים - חסרים נתונים</div>;
    }

    // איסוף כל הנקודות לציר X משותף
    const allXValues = datasets
        .flatMap(dataset => dataset.data.map(item => item[xKey]))
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();

    // מציאת הערך המקסימלי לקביעת סקאלה
    const maxValue = Math.max(
        ...datasets.flatMap(dataset =>
            dataset.data.map(item => typeof item[yKey] === 'number' ? item[yKey] : 0)
        )
    );

    const chartHeight = 200;
    const chartWidth = allXValues.length > 1 ? (allXValues.length - 1) * 80 : 200;

    const getPointY = (value) => {
        const calculatedY = chartHeight - (value / maxValue * chartHeight);
        return isNaN(calculatedY) ? 0 : calculatedY;
    };

    return (
        <div className="multi-line-chart">
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
                        {datasets.map((dataset, datasetIndex) => {
                            // יצירת נקודות לכל סט נתונים
                            const points = dataset.data.map(item => {
                                const xIndex = allXValues.indexOf(item[xKey]);
                                const x = xIndex * (chartWidth / (allXValues.length - 1));
                                const y = getPointY(item[yKey]);
                                return { x, y };
                            }).sort((a, b) => a.x - b.x);

                            // יצירת נתיב הקו
                            const pathData = points.map((point, idx) =>
                                `${idx === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
                            ).join(' ');

                            return (
                                <g key={datasetIndex}>
                                    <path
                                        d={pathData}
                                        fill="none"
                                        stroke={dataset.color || '#4caf50'}
                                        strokeWidth="2"
                                    />

                                    {points.map((point, pointIndex) => (
                                        <circle
                                            key={pointIndex}
                                            cx={point.x}
                                            cy={point.y}
                                            r="4"
                                            fill={dataset.color || '#4caf50'}
                                            stroke="white"
                                            strokeWidth="1"
                                            title={`${dataset.name}: ${dataset.data[pointIndex][yKey]}`}
                                        />
                                    ))}
                                </g>
                            );
                        })}
                    </svg>

                    {/* תוויות ציר X */}
                    <div className="x-labels">
                        {allXValues.map((value, index) => (
                            <div
                                key={index}
                                className="x-label"
                                style={{ left: `${index * (100 / (allXValues.length - 1))}%` }}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* מקרא */}
            <div className="chart-legend">
                {datasets.map((dataset, index) => (
                    <div key={index} className="legend-item">
                        <span
                            className="legend-color"
                            style={{ backgroundColor: dataset.color || '#4caf50' }}
                        ></span>
                        <span className="legend-label">{dataset.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MultiLineChart;