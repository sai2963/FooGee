import { useState } from "react";
import Title from "./Title";
import { Link } from "react-router-dom";
import About from "./about";
const Header = () => {
  const varb = "Login";
  const [btnname, setbtnname] = useState(varb);
  return (
    <div className="header">
      <Title/>
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li> <Link to="/about">About</Link> </li>
          <li><Link to="/contact">Contact</Link></li>
          <li>Cart</li>

          <li>
            <button
              className="login"
              onClick={() => {
                {btnname == varb ? setbtnname("Logout") : setbtnname("Login");}
              }}
            >
              {btnname}
            </button>
          </li>

          <li>
            <i className="fa-solid fa-cart-shopping"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
