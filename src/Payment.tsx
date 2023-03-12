import { useState } from 'react';
import './Payment.css';

import mobilepayImg from './assets/mobilepay.jpg';
import netsImg from './assets/nets.jpg';
import applepayImg from './assets/applepay.svg';
import googlepayImg from './assets/googlepay.png';

type PaymentOptions = {
    [key: string]: string;
};

const paymentOptions: PaymentOptions = {
    NETS: netsImg,
    MobilePay: mobilepayImg,
    GooglePay: googlepayImg,
    ApplePay: applepayImg,
};

const Payment = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <div className="payment-options-container">
            <h2 className="title">Betalingsmuligheder</h2>
            <div className="options-container">
                {Object.keys(paymentOptions).map((option) => {
                    const isOptionSelected = selectedOption === option;
                    const optionClasses = `option ${isOptionSelected ? "selected" : ""}`;
                    const optionImage = paymentOptions[option];
                    const optionLabel = option;

                    return (
                        <div
                            key={option}
                            className={optionClasses}
                            onClick={() => handleOptionClick(option)}>
                            <img src={optionImage} alt={optionLabel}/>
                            <span className="label">{optionLabel}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

    export default Payment;