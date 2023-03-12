import React, { useState } from 'react';
import './ShippingOptions.css';

function ShippingOptions(props: {
    onShippingOptionSelect: (option: string) => void;
}) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        props.onShippingOptionSelect(option);
    };

    return (
        <div className="shipping-options-container">
            <div className="shipping-option">
                <div
                    className={`shipping-option-radio ${
                        selectedOption === 'Standard' ? 'selected' : ''
                    }`}
                    onClick={() => handleOptionSelect('Standard')}
                >
                    <div className="shipping-option-radio-dot" />
                </div>
                <div className="shipping-option-info">
                    <div className="shipping-option-title">Standard</div>
                    <div className="shipping-option-desc">
                        7-14 hverdage. Gratis levering
                    </div>
                </div>
            </div>
            <div className="shipping-option">
                <div
                    className={`shipping-option-radio ${
                        selectedOption === 'Express' ? 'selected' : ''
                    }`}
                    onClick={() => handleOptionSelect('Express')}
                >
                    <div className="shipping-option-radio-dot" />
                </div>
                <div className="shipping-option-info">
                    <div className="shipping-option-title">Ekspres</div>
                    <div className="shipping-option-desc">
                        4-7 hverdage. 49,- Levering
                    </div>
                </div>
            </div>
            <div className="shipping-option">
                <div
                    className={`shipping-option-radio ${
                        selectedOption === 'Next Day' ? 'selected' : ''
                    }`}
                    onClick={() => handleOptionSelect('Next Day')}
                >
                    <div className="shipping-option-radio-dot" />
                </div>
                <div className="shipping-option-info">
                    <div className="shipping-option-title">Næste dag</div>
                    <div className="shipping-option-desc">
                        Næste hverdag. 79,- Levering
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShippingOptions;
