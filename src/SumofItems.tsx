import { useState } from 'react'
import './SumOfItems.css'
import React from 'react';
import { Product } from './Basket';

function calculatePrice(products:Product[]):{ subtotal: number, shipping: String, total: number, discount: number} {
    const SHIPPING_THRESHOLD = 500;
    let SHIPPING_FEE = "Vil blive beregnet i næste trin";
    let subtotal = 0;
    let total = 0;
    let countOfItems = 0;
    let discount = 0;



    products.map((product)=>{
       subtotal+=product.price * product.quantity;
       if(product.quantity > 0){
       countOfItems += product.quantity
       };
      }
    );
    // Adds 10% discount if subtotal is over 300
    if (subtotal > 300) {
        total = subtotal * 0.9;
        discount = subtotal * 0.1;
    } else {
        total = subtotal;
    }

    // Provides free shipping if subtotal is over 500
    if (subtotal > 500) {
        SHIPPING_FEE = "GRATIS!";
    }

    


        return {
            subtotal: subtotal, 
            shipping: SHIPPING_FEE,
            total: total,
            discount: discount
        };
}

    interface Props {
        dataItems: Product[]
    }


    function SumofItems({dataItems}: Props) {

        const subtotal = calculatePrice(dataItems);

        return (
            <div className="App">
                <div>
                    <h2>Ordreoverblik</h2>
                    <p className='legal'>Din bestilling er først bindende, når vi har bekræftet din ordre.</p>
                </div>
                <div className='orderTotal'>
                    <p>
                        Subtotal
                    </p>
                    <p data-testid = "subtotalTest">
                        {subtotal.subtotal} DKK
                    </p>
                </div>
                <div className='orderTotal'>
                    <p>
                        Rabat
                    </p>
                    <p>
                        -{subtotal.discount} DKK
                    </p>
                </div>
                <div className='orderTotal'>
                    <p>
                        Forsendelse
                    </p>
                    <p className='shipping' data-testid = "shippingTest">
                        
                        {subtotal.shipping}
                    </p>
                </div>
                <div className='orderTotal'>
                    <p>
                        Total
                    </p>
                    <p>
                        {subtotal.total} DKK
                    </p>
                </div>
            </div>
        )
    }

export default SumofItems
