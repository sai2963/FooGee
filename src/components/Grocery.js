import { useContext, useEffect, useState } from "react";
import Groceries from "./Groceries";
import GroceryList from "../Utils/GroceryData";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import GroceryContext from "../Utils/GroceryContext";

const Grocery = () => {
    
    const {data}=useContext(GroceryContext)
    // Ensure 'items' is accessed correctly
    console.log("Mapped data: ", data);

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <h1 className="text-center font-bold text-3xl mb-8">10 Min Delivery</h1>
            <div className="text-center mb-8">
                <input 
                    type="text" 
                    placeholder="Search for Groceries" 
                    className="border border-black rounded p-2 mr-2"
                />
                <button className="border border-black rounded p-2 bg-blue-500 text-white">Search</button>
            </div>
            <div className="container mx-auto">
                { data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data.map((item, index) => (
                            <Link 
                            to={"/Groceries/"+item.nodeId}
                            key={item.nodeId}
                            items={item}
                            >
                            <Groceries 
                                key={index}
                                displayName={item.displayName}
                                imageId={item.imageId}
                                items={item}
                            />
                            </Link>
                            
                        ))}
                    </div>
                ) : (
                    <Shimmer />
                )}
            </div>
        </div>
    );
};

export default Grocery;
