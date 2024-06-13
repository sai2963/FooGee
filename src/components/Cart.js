import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../Utils/CartSlice";
import { IMG_CDN_URL } from "../../public/Common/constants";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItem(index));
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const price = item.card?.info?.price || item.card.info.defaultPrice;
    return total + price;
  }, 0) / 100;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-center font-bold text-3xl mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Your cart is empty. Go <Link to="/" className="text-indigo-600">Home</Link> to add items.</p>
          </div>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-200 py-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={IMG_CDN_URL + item.card?.info?.imageId}
                    alt={item.card?.info?.name}
                    className="h-20 w-20 rounded-full border-2 border-gray-300 shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.card?.info?.name || "No Name"}</h3>
                    <p className="text-lg text-gray-600">
                      Rs.{" "}
                      {item.card?.info?.price
                        ? (item.card.info.price / 100).toFixed(2)
                        : (item.card.info.defaultPrice / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
              <div className="flex items-center justify-between border-b border-gray-200 py-4">
                <span className="text-lg text-gray-700">Items in Cart:</span>
                <span className="text-lg font-semibold">{cartItems.length}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-4">
                <span className="text-lg text-gray-700">Total Amount:</span>
                <span className="text-lg font-semibold">Rs. {totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <button
            className="block mx-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
            onClick={handleClear}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
