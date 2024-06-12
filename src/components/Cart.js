import { useSelector } from "react-redux";
import Renderitems from "./Renderitems";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);
    return (
        <>
            <h1>Cart Items</h1>
            {cartItems.map((items, index) => (
                <Renderitems key={index} items={items} />
            ))}
        </>
    );
};

export default Cart;
