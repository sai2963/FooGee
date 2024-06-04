import { useState } from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import useOnlineStatus from "../Utils/useOnlineStaus";

const Header = () => {
  const initialBtnName = "Login";
  const onlineStatus = useOnlineStatus();
  const [btnName, setBtnName] = useState(initialBtnName);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Title />
        <nav className="flex items-center space-x-4">
          <span
            className={`text-xl ${
              onlineStatus ? "text-green-500" : "text-red-500"
            }`}
          >
            {onlineStatus ? "🟢" : "🔴"}
          </span>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-gray-900">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/grocery" className="text-gray-700 hover:text-gray-900">
                Grocery
              </Link>
            </li>
            <li className="text-gray-700">Cart</li>
            <li>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() =>
                  setBtnName(btnName === initialBtnName ? "Logout" : "Login")
                }
              >
                {btnName}
              </button>
            </li>
            <li>
              <i className="fa-solid fa-cart-shopping text-gray-700 text-xl"></i>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
