// src/components/student/ExerciseSelector.js
import React from 'react';
import './StudentStyles.css';


function ExerciseSelector({ settings, onSelectExercise }) {
    if (!settings) return <div>טוען...</div>;

    const exerciseTypes = [
        { id: 'addition', name: 'חיבור', enabled: settings.addition },
        { id: 'subtraction', name: 'חיסור', enabled: settings.subtraction }
    ];

    const exerciseFormats = [
        { id: 'vertical', name: 'במאונך', enabled: settings.vertical },
        { id: 'horizontal', name: 'במאוזן', enabled: settings.horizontal }
    ];

    return (
        <div className="exercise-selector">
            <h2>בחר תרגיל</h2>

            <div className="exercise-grid">
                {exerciseTypes.map(type => (
                    type.enabled && (
                        <div key={type.id} className="exercise-type-section">
                            <h3>{type.name}</h3>

                            <div className="format-buttons">
                                {exerciseFormats.map(format => (
                                    format.enabled && (
                                        <React.Fragment key={format.id}>
                                            {settings.predefinedExercises && (
                                                <button
                                                    className="exercise-button"
                                                    onClick={() => onSelectExercise(type.id, format.id, false)}
                                                >
                                                    {type.name} {format.name}
                                                </button>
                                            )}

                                            {settings.customExercises && (
                                                <button
                                                    className="exercise-button custom"
                                                    onClick={() => onSelectExercise(type.id, format.id, true)}
                                                >
                                                    צור תרגיל {type.name} {format.name}
                                                </button>
                                            )}
                                        </React.Fragment>
                                    )
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default ExerciseSelector;