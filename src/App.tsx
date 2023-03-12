import Checkout from "./Checkout";
import Basket, {Product} from "./Basket";
import {useState} from "react";

function App() {
    const [productList, setProductList] = useState<Product[]>([]);
    const [showCheckout, setShowCheckout] = useState(false);

    const handleCheckout = (productList: any) => {
        setProductList(productList);
        setShowCheckout(true);
    };

    const toBasket = (productList: any) => {
        setProductList(productList);
        setShowCheckout(false);
    };

    return (
        <div className="App">
            {(() => {
                if (showCheckout) {
                    return <Checkout productList={productList} onBasket={toBasket} />;
                } else {
                    return <Basket onCheckout={handleCheckout} productList={productList} />;
                }
            })()}
        </div>
    );
}

export default App;
