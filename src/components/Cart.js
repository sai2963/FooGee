import { useDispatch, useSelector } from "react-redux";
import Renderitems from "./Renderitems";
import { clearCart, removeItem } from "../Utils/CartSlice";
import { IMG_CDN_URL } from "../../public/Common/constants";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCart());
  };
  const handleRemoveItem=()=>{
    dispatch(removeItem());
  }

  const handleAddItem = (item) => {
    // Implement this function to handle adding items to the cart
    // Example: dispatch(addItem(item));
  };

  return (
    <>
      <h1 className="text-center font-bold m-3 text-2xl">Cart Items</h1>
      <div className="flex justify-center my-6">
        <button
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
          onClick={handleClear}
        >
          Clear Cart
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty. Go <Link to="/">Home</Link> Add Item to the cart</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} items={item}>
            <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-gray-100 hover:bg-white transition duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={IMG_CDN_URL + item.card?.info?.imageId}
                    alt={item.card?.info?.name}
                    className="h-20 w-20 rounded-full border-2 border-gray-300 shadow-md mr-4"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {item.card?.info?.name || "No Name"}
                    </h3>
                    <p className="text-lg text-gray-600">
                      Rs:{" "}
                      {item.card?.info?.price
                        ? item.card.info.price / 100
                        : item.card.info.defaultPrice / 100}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300 text-sm"
                  onClick={handleRemoveItem}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Cart;
