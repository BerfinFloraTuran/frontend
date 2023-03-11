import { useState } from 'react'
import './SumOfItems.css'
import React from 'react';
import { DataItems } from './ListPage';
import { DoNotDisturbOnTotalSilence } from '@mui/icons-material';

function calculatePrice(products:DataItems[]): { subtotal: number, shipping: String, total: number } {
  const SHIPPING_THRESHOLD = 500;
  let SHIPPING_FEE = "Calculated at next step";
  let subtotal = 0;
  let total = 0;
  let countOfItems = 0;
  products.map((product)=>{
    subtotal+=product.price * product.quantity;
    if(product.quantity > 0){
      countOfItems += product.quantity
    };
  } 
  );

  total = subtotal;

  if(subtotal>500){
    SHIPPING_FEE = "FREE";
  }

 return{ subtotal: subtotal, shipping: SHIPPING_FEE,
  total: total};

}

interface Props{
  dataItems:DataItems[]
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

export default SumofItems
