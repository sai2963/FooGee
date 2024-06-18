import { useContext } from "react";
import GroceryContext from "../Utils/GroceryContext";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../../public/Common/constants";
import Shimmer from "../components/Shimmer"; // Ensure this is the correct import path for Shimmer
import { useDispatch } from "react-redux";
import { addItem } from "../Utils/CartSlice";

const GroceryList = () => {
    const dispatch = useDispatch();
    const HandAddItem =(item)=>{
        dispatch(addItem(item));
    }
  const { data } = useContext(GroceryContext);
  const { id } = useParams();
  const groceryItem = data.find((item) => item.nodeId === id);
  const groceryNodes = groceryItem?.nodes;
  const randomNumber = Math.floor(Math.random() * 101);

  if (!groceryNodes) {
    return <Shimmer />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groceryNodes.map((item, index) => (
          <div
            key={index}
            className="grocery-item p-4 bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              className="w-full h-40 object-cover rounded-t-lg"
              src={`${IMG_CDN_URL}${item.imageId}`}
              alt={item.displayName}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.displayName}
              </h3>
              <p className="text-gray-600 mt-2">Rs : {item.price}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={()=>HandAddItem(item)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroceryList;
