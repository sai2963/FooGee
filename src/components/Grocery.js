import { useContext, useEffect, useState } from "react";
import Groceries from "./Groceries";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import GroceryContext from "../Utils/GroceryContext";

const Grocery = () => {
    const { data } = useContext(GroceryContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        setFilteredData(data); // Initialize filteredData with the original data
    }, [data]);

    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setFilteredData(data); // If search term is empty, show all data
        } else {
            const filtered = data.filter(item => 
                item.displayName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <h1 className="text-center font-bold text-3xl mb-8">10 Min Delivery</h1>
            <div className="text-center mb-8">
                <input 
                    type="text" 
                    placeholder="Search for Groceries" 
                    className="border border-black rounded p-2 mr-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                    className="border border-black rounded p-2 bg-blue-500 text-white"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <div className="container mx-auto">
                { filteredData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredData.map((item, index) => (
                            <Link 
                                to={"/Groceries/" + item.nodeId}
                                key={item.nodeId}
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
