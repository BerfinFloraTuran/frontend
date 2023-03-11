import React, { useState } from 'react';
import Basket, { Product } from './Basket';
import Checkout from './Checkout';

function App() {
    const [productList, setProductList] = useState<Product[]>([]);
    const [showCheckout, setShowCheckout] = useState(false);

    const handleCheckout = (productList: any) => {
        setProductList(productList);
        setShowCheckout(true);
    };

    return (
        <div className="App">
            {showCheckout ? (
                <Checkout productList={productList} />
            ) : (
                <Basket onCheckout={handleCheckout} />
            )}
        </div>
    );
}

export default App;
