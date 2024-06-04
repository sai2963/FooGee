import React from 'react';
import burgerImage from "../../public/Images/burgerImage.png";

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4 flex flex-col lg:flex-row items-center">
      <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 text-center lg:text-left">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <br /> The world of <br /> <span className="text-blue-600">Tasty & Fresh Food</span>
        </h1>
        <h4 className="text-lg font-medium text-gray-700">
          "Better you will feel if you eat a <span className="text-red-600">FoodFire</span> healthy meal"
        </h4>
      </div>
      <div className="lg:w-1/2">
        <img src={burgerImage} alt="Food Image" className="w-full h-auto rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default About;
