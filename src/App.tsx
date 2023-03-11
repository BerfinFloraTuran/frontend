import React, {useEffect} from 'react'
import {useState} from 'react'
import './App.css'
import Listpage, {DataItems} from './ListPage'
import SumofItems from './SumofItems';

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
                .slice(0, 4)
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

                <nav className={'grid-nav'}>
                    <h2>Nav</h2>
                    <div className="container">
                        <div className="progress-container">
                            <div className="progress" id="progress"></div>
                            <div className="circle active">25%</div>
                            <div className="circle">50%</div>
                            <div className="circle">75%</div>
                            <div className="circle">100%</div>
                        </div>
                    </div>
                </nav>

                <section className={'grid-basket'} id={"basket"}>
                    <h2>Indkøbskurv</h2>
                    {productList.map((product, index) => (
                        <section key={index}>
                            <div className="product-wrapper">
                                <img src={"src/assets/noimg.png"} alt={product.name}/>
                                <div className="product-info">
                                    <button className="close-button" onClick={() => removeItem(index)}>
                                        X
                                    </button>
                                    <ul>
                                        <li>{product.price},- pr. stk.</li>
                                        <li>{product.name}</li>
                                        <li>
                                            <label>Antal</label>
                                            <select
                                                id={'val'}
                                                value={product.quantity}
                                                onChange={(e) =>
                                                    updateQuantity(index, parseInt(e.target.value))
                                                }
                                            >
                                                {[...Array(10)].map((_, i) => (
                                                    <option key={i} value={i + 1}>
                                                        {i + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </li>
                                        <li>
                                            <label>Gaveindpakning</label>
                                            <input type={"checkbox"}/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    ))}
                </section>

                <section className={'grid-total'}>
                    <h2>Odreoverblik</h2>
                    <SumofItems dataItems={productList}/>

                </section>

                <footer className={"grid-footer"}>

                </footer>
            </div>
        </div>
    )
}

export default App
