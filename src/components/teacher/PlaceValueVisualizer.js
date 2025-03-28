// קומפוננטת המחשה ויזואלית לערך המקום
function PlaceValueVisualizer({ number }) {
    // פירוק המספר לספרות ולערכי מקום
    const digits = number.toString().split('');
    const placeValues = digits.map((digit, index) =>
        parseInt(digit) * Math.pow(10, digits.length - index - 1)
    );

    return (
        <div className="place-value-container">
            <h4>ערך המקום של {number}</h4>

            <div className="number-breakdown">
                {digits.map((digit, index) => (
                    <div key={index} className="place-block">
                        <div className="digit-display">{digit}</div>
                        <div className="place-name">
                            {index === digits.length - 1 ? 'יחידות' :
                                index === digits.length - 2 ? 'עשרות' :
                                    index === digits.length - 3 ? 'מאות' : 'אלפים'}
                        </div>
                        <div className="actual-value">{placeValues[index]}</div>
                    </div>
                ))}
            </div>

            <div className="expanded-form">
                <h5>צורה מורחבת:</h5>
                <div className="expanded-equation">
                    {placeValues.map((value, index) => (
                        <span key={index}>
                            {value}{index < placeValues.length - 1 ? ' + ' : ' = '}{index === placeValues.length - 1 ? number : ''}
                        </span>
                    ))}
                </div>
            </div>

            <div className="visual-blocks">
                {placeValues.map((value, index) => (
                    <div key={index} className="value-blocks">
                        {Array(parseInt(digits[index]))
                            .fill()
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className={`block ${index === digits.length - 1 ? 'units' :
                                            index === digits.length - 2 ? 'tens' :
                                                index === digits.length - 3 ? 'hundreds' : 'thousands'
                                        }`}
                                    style={{
                                        width: index === digits.length - 1 ? '10px' :
                                            index === digits.length - 2 ? '20px' :
                                                index === digits.length - 3 ? '30px' : '40px',
                                        height: index === digits.length - 1 ? '10px' :
                                            index === digits.length - 2 ? '20px' :
                                                index === digits.length - 3 ? '30px' : '40px'
                                    }}
                                />
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}