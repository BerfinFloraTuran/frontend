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
                        3-5 business days. Free shipping
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
                    <div className="shipping-option-title">Express</div>
                    <div className="shipping-option-desc">
                        1-2 business days. $5.00 shipping fee
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
                    <div className="shipping-option-title">Next Day</div>
                    <div className="shipping-option-desc">
                        Next business day. $10.00 shipping fee
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShippingOptions;
