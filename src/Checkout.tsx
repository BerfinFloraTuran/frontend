import React, {useState} from 'react';
import './Checkout.css'
import { PostalCodeinput } from './InputAssets/PostalCode';
import ShippingOptions from "./ShippingOptions";
import {Product} from "./Basket";
import Payment from "./Payment"

interface Props {
    productList: Product[];
    onBasket: (productList: Product[]) => void;
}

function Checkout(props: Props) {
    const [selectedOption, setSelectedOption] = useState('');
    const [showBillingAddress, setShowBillingAddress] = useState(false);

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
                    <div className="circle" onClick={() => props.onBasket(props.productList)}>1</div>
                    <div className="circle active">2</div>
                    <div className="circle">3</div>
                    <div className="circle">4</div>
                </div>
            <div className={"grid-checkoutForm"}>
                <h3>Leveringsadresse</h3>
                <br/>
                <form id="form1" className="checkout-form">
                    <div className="form-row">
                        <label data-testid = "firstnameTest" htmlFor="firstName">Fornavn</label>
                        <input type="text" id="firstName" name="firstName" required/>
                    </div>
                    <div className="form-row">
                        <label data-testid = "lastnameTest" htmlFor="lastName">Efternavn</label>
                        <input type="text" id="lastName" name="lastName" required/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="email">Email</label>
                        <input data-testid = "emailTest" type="email" id="email" name="email" required title="Venligst indtast gyldig email adresse"/>
                    </div>
                    <div className="form-row">
                        <label data-testid = "phoneTest" htmlFor="phone">Telefonnummer</label>
                        <input type="tel" id="phone" name="phone" pattern="[0-9]{8}" required title ="Venligst indtast 8 cifret telefonnummer"/>
                    </div>
                    <div className="form-row">
                        <label>Adresse</label>
                        <PostalCodeinput postalcode='asd'></PostalCodeinput>
                    </div>
                </form>
                <br/>
                <button onClick={() => setShowBillingAddress(!showBillingAddress)}>Ret faktureringsadresse</button>
                {showBillingAddress ? (
                        <div className={"grid-billingForm"}>
                            <br/>
                            <h3>Faktureringsadresse</h3>
                            <br/>
                            <form id="form" className="billing-form">
                                <div className="form-row">
                                    <label htmlFor="firstName">Fornavn</label>
                                    <input data-testid = "firstnameTest" type="text" id="firstName" name="firstName" required/>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="lastName">Efternavn</label>
                                    <input data-testid = "lastnameTest" type="text" id="lastName" name="lastName" required/>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="email">Email</label>
                                    <input data-testid = "emailTest" type="email" id="email" name="email" required title="Venligst indtast gyldig email adresse"/>
                                </div>
                                <div className="form-row">
                        <label htmlFor="phone">Telefonnummer</label>
                        <input type="tel" id="phone" name="phone" pattern="[0-9]{8}" required title ="Venligst indtast 8 cifret telefonnummer"/>
                    </div>
                                <div className="form-row">
                                    <label>Adresse</label>
                                    <PostalCodeinput postalcode='asd'></PostalCodeinput>
                                </div>
                            </form>
                        </div>
                ) : (
                    <div></div>
                )}

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
                    <button data-testid = "paymentbuttonTest" type="submit" form="form1" className='checkout'>
                        <p> Gå til betaling </p>
                    </button>
            </div>
            <div className={"grid-shipping"}>
                <h3>Leveringsmuligheder</h3>
                <br/>
                <ShippingOptions onShippingOptionSelect={handleShippingOptionSelect} />
            </div>
            <div className={"grid-payment"}>
                <Payment/>
            </div>
            </div>
        </>

    );
}

export default Checkout