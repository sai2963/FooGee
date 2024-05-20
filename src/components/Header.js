 import { useState } from "react";
import Title from "./Title";
const Header = () => {
  const [btnname,setbtnname]=useState("Login");
    return (
      <div className="header">
        <Title />
        <div className="nav-items">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Cart</li>
            
            <li><button className="login" onClick={()=>{
              setbtnname("Logout")
            }}>{btnname}</button></li>

            <li>
              <i className="fa-solid fa-cart-shopping"></i>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  export default Header;