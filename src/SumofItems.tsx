import { useState } from 'react'
import './App.css'
import React from 'react';
import { DataItems } from './ListPage';

function calculatePrice(products:DataItems[]): { subtotal: number, total: number } {
  const SHIPPING_THRESHOLD = 500;
  const SHIPPING_FEE = 10;
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

  if(subtotal>500){
    total = subtotal;
  }else{
    total = subtotal + SHIPPING_FEE;
  }

 return{ subtotal: subtotal,
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
