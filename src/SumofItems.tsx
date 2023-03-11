import { useState } from 'react'
import './SumOfItems.css'
import React from 'react';
import { Product } from './App';

function calculatePrice(products:Product[]): { total: number; shipping: number; subtotal: number } {
  const SHIPPING_THRESHOLD = 500;
  let SHIPPING_FEE = 49;
  let total = 0;

    const subtotal = products.reduce((sum, product) =>
     sum + product.price * product.quantity, 0);

    if(subtotal>500){
    total = subtotal;
  }else{
    total = subtotal + SHIPPING_FEE;
  total = subtotal;

  if(subtotal>500){
    SHIPPING_FEE = 0;
  }

 return{ subtotal: subtotal, shipping: SHIPPING_FEE,
  total: total};

}

interface Props{
  dataItems:Product[]
}


function SumofItems({dataItems}:Props) {
  
  const subtotal = calculatePrice(dataItems);

  return (
    <div className="App">
      <div>
      <h2>Order Overview</h2>
      <p className='legal'>Your order will not be official until we have confirmed your order.</p>
      </div>
      <div className='orderTotal'>
        <p>
          Subtotal
        </p>
        <p>
        {subtotal.subtotal} DKK
        </p>
      </div>
      <div className='orderTotal'>
        <p>
          Shipping 
        </p>
        <p className='shipping'>
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

export default SumofItems{
    SumofItems
}
