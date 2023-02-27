import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Listpage, {DataItems} from './ListPage'
import SumofItems from './SumofItems';



function App() {
  const [data,setData] = React.useState<DataItems[]>([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json');
      const data = await response.json();
      const mappedData = data.map((item: any) => {
        const mappedItem: DataItems = {
          id: item.id,
          name: item.name,
          quantity: 0,
          wrapped: false,
          price: item.price,
          currency: item.currency,
        };
        return mappedItem;
      });
      setData(mappedData);
    }
    fetchData();
  }, []);


  return (
    <div className="App">
      <div className={"grid-container1"}>
        
          <header className={'grid-header'}>
              <h2>Header</h2>
          </header>

          <nav className={'grid-nav'}>
              <h2>Nav</h2>
          </nav>

          <section className={'grid-basket'}>
            <h2>Indkøbskurv</h2>
            <Listpage dataitems={data} onUpdateItems={setData}
            columNames={['Id','Name','Price','Wrapped','Quantity']}/>
          </section>

          <section className={'grid-total'}>
            <h2>Odreoverblik</h2>
            <SumofItems dataItems={data}/>

          </section>

          <footer className={"grid-footer"}>

          </footer>

      </div>
    </div>
  )
}

export default App
