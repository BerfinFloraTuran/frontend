import { useState } from 'react'
import './App.css'
import React from 'react';
import { Product } from './App';

function calculatePrice(products:Product[]): { subtotal: number, total: number } {
  const SHIPPING_THRESHOLD = 500;
  const SHIPPING_FEE = 10;
  let total = 0;

    const subtotal = products.reduce((sum, product) =>
     sum + product.price * product.quantity, 0);

    if(subtotal>500){
    total = subtotal;
  }else{
    total = subtotal + SHIPPING_FEE;
  }

 return{ subtotal: subtotal,
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
      </div>
      <h2>Total Price For Order</h2>
      <div>
        <p>
          Subtotal: {subtotal.subtotal}
        </p>
        
        <p>
          Total: {subtotal.total}
        </p>
      </div>
    </div>
  )
}

export default SumofItems
