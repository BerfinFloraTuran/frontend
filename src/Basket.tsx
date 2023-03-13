import React, {ChangeEvent, ChangeEventHandler, useEffect} from 'react'
import {useState} from 'react'
import './Basket.css'
import SumofItems from './SumofItems';
import {PostalCodeinput} from './InputAssets/PostalCode';

export interface Product {
    id: string;
    price: number;
    name: string;
    quantity: number;
    wrapped: boolean;
    upsellProductId?: string;
}

interface Props {
    onCheckout: (productList: Product[]) => void;
    productList: Product[];
}

function Basket(props: Props) {
    const [productList, setProductList] = useState<Product[]>(props.productList);
    const [isChecked, setIsChecked] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedProductIndex, setSelectedProductIndex] = useState(0);
    const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);

    function getUpsellProduct(productId : string) {
        const product = productList.find(p => p.id === productId);
        if (product && product.upsellProductId) {
            return product.upsellProductId;
        }
        return null;
    }
    const handleCheckboxChange = (index: number, upsellId: string): ChangeEventHandler<HTMLInputElement> => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setIsChecked(currentValue => !currentValue);
            setSelectedProductIndex(index);
            setIsPopupVisible(!isPopupVisible);
            setSelectedProductId(upsellId)
        };
    };

    const handlePopupCloseClick = () => {
        setIsPopupVisible(false);
        setIsChecked(false);
        setSelectedProductIndex(0);
    };

   async function findProductById(id: string | undefined): Promise<Product> {
        const response = await fetch('https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json');
        const jsonData = await response.json();
        const product = jsonData.find((item: any) => item.id === id);
            return {
                id: product.id,
                price: product.price,
                name: product.name,
                quantity: product.quantity || 1,
                wrapped: false,
                upsellProductId: product.upsellProductId
            }};

    useEffect(() => {
        async function fetchData() {
            const data = props.productList.length === 0
                ? await fetch('https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json')
                    .then(response => response.json())
                    .then(data => data.slice(17, 20))
                : props.productList;

            const mappedData = data.map((item: any) => ({
                id: item.id,
                price: item.price,
                name: item.name,
                quantity: item.quantity || 1,
                wrapped: false,
                upsellProductId: item.upsellProductId
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
        updatedProductList[selectedProductIndex].quantity = quantity;
        setProductList(updatedProductList);
    };

    const updateItem = async (index: number, productId: string | undefined) => {
        const updatedProductList = [...productList];
        const product = await findProductById(selectedProductId);
        updatedProductList[selectedProductIndex] = product
        setProductList(updatedProductList);
        handlePopupCloseClick();
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
                    <div className="circle" data-testid="navTest" onClick={() => props.onCheckout(productList)}>2</div>
                    <div className="circle">3</div>
                    <div className="circle">4</div>
                </div>

                <section className={'grid-basket'} id={"basket"}>
                    <h2>Indkøbskurv</h2>
                    {productList.map((product, index) => (
                        <section data-testid="dataTesting" key={index}>
                            <div className="product-wrapper">
                                <img src={"src/assets/noimg.png"} alt={product.name}/>
                                <button className="close-button" data-testid="close-buttonTesting"
                                        onClick={() => removeItem(index)}>
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
                                            <input id={`giftwrapcheck-${index}`} type={"checkbox"} data-testid="checkboxTest"/>
                                        </li>
                                        {product.upsellProductId && (
                                            <li>
                                                <label>
                                                    Vil du opgradere til:{' '}
                                                    {product.upsellProductId.split('-')
                                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                            .join(' ')}
                                                    ?
                                                </label>
                                                <input
                                                    id={`check-${index}`}
                                                    type={"checkbox"}
                                                    checked={isChecked}
                                                    onChange={handleCheckboxChange(index, product.upsellProductId)}
                                                />
                                            </li>
                                        )}
                                        <br/>
                                    </ul>
                                    {isPopupVisible && (
                                        <div className="overlay" style={{ display: isPopupVisible ? 'flex' : 'none' }}>
                                            <div className="modal">
                                                <button className="close-button" onClick={handlePopupCloseClick}>
                                                    X
                                                </button>
                                                <h3>Bekræftelse</h3>
                                                <p>Vil du erstatte produktet i din kurv?</p>
                                                <button onClick={(e) =>
                                                    updateItem(index, product.upsellProductId)
                                                }>JA</button>
                                            </div>
                                        </div>
                                    )}
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
                        <button className='discountCode'>
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
