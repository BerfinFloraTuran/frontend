import React, {useEffect} from 'react'
import {useState} from 'react'
import './Basket.css'
import SumofItems from './SumofItems';
import {PostalCodeinput} from './InputAssets/PostalCode';

export interface Product {
    price: number;
    name: string;
    quantity: number;
    wrapped: boolean;
}
interface Props {
    onCheckout: (productList: Product[]) => void;
    productList: Product[];
}

function Basket(props: Props) {
    const [productList, setProductList] = useState<Product[]>(props.productList);

    useEffect(() => {
        async function fetchData() {
            const data = props.productList.length === 0
                ? await fetch('https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json')
                    .then(response => response.json())
                    .then(data => data.slice(7, 10))
                : props.productList;

            const mappedData = data.map((item: any) => ({
                price: item.price,
                name: item.name,
                quantity: item.quantity || 1,
                wrapped: false
            }));
            setProductList(mappedData);
        }

        fetchData();
    }, [props.productList]);
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

                <div className="grid-nav">
                    <div className="progress" id="progress"></div>
                    <div className="circle active">1</div>
                    <div className="circle" onClick={() => props.onCheckout(productList)}>2</div>
                    <div className="circle">3</div>
                    <div className="circle">4</div>
                </div>

                <section className={'grid-basket'} id={"basket"}>
                    <h2>Indkøbskurv</h2>
                    {productList.map((product, index) => (
                        <section data-testid="dataTesting" key={index}>
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
                                            <input id={"check"} type={"checkbox"} data-testid="checkboxTest"/>
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
                    <button className='checkout' onClick={() => props.onCheckout(productList)}>
                        <p> Fortsæt til levering </p>
                    </button>
                    <div className='discountCode'>
                        <label htmlFor="discountCode">Indtast rabatkode eller gavekort</label>
                        <input type="text" id="discountCode" name="discountCode"></input>
                        <button className='discountCode' >
                            Indløs kode
                        </button>
                    </div>
                </section>

                <footer className={"grid-footer"}>
                </footer>
            </div>
        </div>
    )
}

export default Basket
