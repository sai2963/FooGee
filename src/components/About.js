import React, { useContext } from "react";
import burgerImage from "../../public/Images/burgerImage.png";
import UserContext from "../Utils/UserContext";

const About = () => {
  const {loggedInUser}=useContext(UserContext)
  return (
    <div className="container mx-auto py-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-500">
      <div className="container mx-auto py-12 px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <br /> The world of <br />{" "}
            <span className="text-blue-600 dark:text-blue-400">Tasty & Fresh Food</span>
          </h1>
          <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
            "Better you will feel if you eat a{" "}
            <span className="text-red-600 dark:text-red-400">FoodGee</span> healthy meal"<br/>
            <span> User:{loggedInUser}</span>
          
          </h4>
        </div>
        <div className="lg:w-1/2">
          <img
            src={burgerImage}
            alt="Food Image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
