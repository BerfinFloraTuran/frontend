import React, {useState} from 'react';
import './Checkout.css'
import { PostalCodeinput } from './InputAssets/PostalCode';
import ShippingOptions from "./ShippingOptions";
import {Product} from "./Basket";

interface Props {
    productList: Product[];
}

function Checkout(props: Props) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleShippingOptionSelect = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div className={"grid"}>
                <header className={'grid-header'}>
                    <h2>Header</h2>
                </header>
                <div className="progress-container">
                    <div className="progress" id="progress"></div>
                    <div className="circle">25%</div>
                    <div className="circle active">50%</div>
                    <div className="circle">75%</div>
                    <div className="circle">100%</div>
                </div>
            <div className={"grid-checkoutForm"}>
                <h3>Leveringsadresse</h3>
                <br/>
                <form className="checkout-form">
                    <div className="form-row">
                        <label htmlFor="firstName">Fornavn</label>
                        <input type="text" id="firstName" name="firstName" required/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="lastName">Efternavn</label>
                        <input type="text" id="lastName" name="lastName" required/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="phone">Telefonnummer</label>
                        <input type="tel" id="phone" name="phone" required/>
                    </div>
                    <div className="form-row">
                        <label>Adresse</label>
                        <PostalCodeinput postalcode='asd'></PostalCodeinput>
                    </div>
                </form>
            </div>
            <div className={"grid-orderView"}>
                <h2>Ordreoverblik</h2>
                    {props.productList.map((product, index) => (
                        <section key={index}>
                                    <ul id={"orderviewlist"}>
                                        <br/>
                                        <li className="product-price">{product.price},- pr. stk. <span className="subtotal">Subtotal: {product.price*product.quantity},-</span></li>
                                        <li>{product.name}</li>
                                        <li>Antal: {product.quantity}</li>
                                        <br/>
                                    </ul>
                        </section>
                    ))}
            </div>
            <div className={"grid-shipping"}>
                <h3>Leveringsmuligheder</h3>
                <br/>
                <ShippingOptions onShippingOptionSelect={handleShippingOptionSelect} />
            </div>
            <div className={"grid-payment"}>
                <h2>Betalingsmuligheder</h2>
            </div>
            </div>
        </>

    );
}

export default Checkout