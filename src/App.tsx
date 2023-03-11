import React, {useEffect} from 'react'
import {useState} from 'react'
import './App.css'
import SumofItems from './SumofItems';
import { PostalCodeinput } from './InputAssets/PostalCode';

export interface Product {
    price: number;
    name: string;
    quantity: number;
    wrapped:boolean;
}
function App() {
    const [productList, setProductList] = useState<Product[]>([]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json');
            const data = await response.json();
            const mappedData = data
                .slice(7, 10)
                .map((item: any) => {
                    const mappedItem: Product = {
                        price: item.price,
                        name: item.name,
                        quantity: 1,
                        wrapped: false
                    };
                    return mappedItem;
                });
            setProductList(mappedData);
        }

        fetchData();
    }, []);

    const removeItem = (index: number) => {
        const updatedProductList = [...productList];
        updatedProductList.splice(index, 1);
        setProductList(updatedProductList);
    };

    const updateQuantity = (index: number, quantity: number) => {
        const updatedProductList = [...productList];
        updatedProductList[index].quantity = quantity;
        setProductList(updatedProductList);
    };


    return (
        <div className="App">
            <div className={"grid-container1"}>

                <header className={'grid-header'}>

                        <h2>Header</h2>

                </header>


                        <div className="progress-container">
                            <div className="progress" id="progress"></div>
                            <div className="circle active">25%</div>
                            <div className="circle">50%</div>
                            <div className="circle">75%</div>
                            <div className="circle">100%</div>
                        </div>


                <section className={'grid-basket'} id={"basket"}>
                    <h2>Cart</h2>
                    {productList.map((product, index) => (
                        <section key={index} data-testid="dataTesting">
                            <div className="product-wrapper">
                                <img src={"src/assets/noimg.png"} alt={product.name}/>
                                <button className="close-button" data-testid="close-buttonTesting" onClick={() => removeItem(index)}>
                                    X
                                </button>
                                <div className="product-info">

                                    <ul id={"itemslist"}>
                                        <br/>
                                        <li>{product.price},- pr. stk.</li>
                                        <li>{product.name}</li>
                                        <li>
                                            <label>Antal</label>
                                            <select
                                                id={'val'}
                                                data-testid="quantityTest"
                                                value={product.quantity}
                                                onChange={(e) =>
                                                    updateQuantity(index, parseInt(e.target.value))
                                                }>
                                                {[...Array(10)].map((_, i) => (
                                                    <option key={i} value={i + 1}>
                                                        {i + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </li>
                                        <li>
                                            <label>Gaveindpakning</label>
                                            <input data-testid="checkboxTest" id={"check"} type={"checkbox"} />
                                        </li>
                                        <br/>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    ))}
                </section>

          <section className={'grid-total'}>
            <SumofItems dataItems={productList}/>
            <button className='checkout'>
              <p> Proceed to shipping </p>
            </button>
            <div className='discountCode'>
              <label htmlFor= "discountCode">Insert voucher or discount code</label>
              <input type="text" id="discountCode" name="discountCode"></input>
              <button className='discountCode'>
                Apply Voucher
              </button>
        </div>
          </section>

          <footer className={"grid-footer"}>
          <PostalCodeinput postalcode='asd'></PostalCodeinput>

                </footer>
            </div>
        </div>
    )
}

export default App
