import { useState ,useContext} from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import useOnlineStatus from "../Utils/useOnlineStaus";
import UserContext from "../Utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  
  const {loggedInUser}=useContext(UserContext)
  
  const CartItems=useSelector((store)=> store.cart.items);
  console.log(CartItems)
  

  //  console.log(CartItems);
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition duration-500">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Title />
        <nav className="flex items-center space-x-4">
          <span className={`text-xl ${onlineStatus ? "text-green-500" : "text-red-500"}`}>
            {onlineStatus ? "🟢" : "🔴"}
          </span>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/grocery" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                Grocery
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              Cart - {CartItems.length} items
              </Link>
            </li>
            
            {/* <link to="/cart" className="text-gray-700 dark:text-gray-300">Cart({CartItems.length}items)</link> */}
            <li>

              <button
                className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800"
                onClick={() => setBtnName(btnName === "Login" ? "Logout" : "Login")}
              >
                {btnName}
              </button>
            </li>
            <li className="font-bold">{loggedInUser}</li>
            
            <li>
              <i className="fa-solid fa-cart-shopping text-gray-700 dark:text-gray-300 text-xl"></i>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
