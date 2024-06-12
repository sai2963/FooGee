
import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../../public/Common/constants";
import { addItem } from "../Utils/CartSlice";

const Renderitems = ({ items }) => {
  const dispatch =useDispatch();
  const HandAddItem=(items)=>{
    dispatch(addItem(items));
  }
  return (
    <div
      
      className="p-4 border border-gray-300 rounded-lg shadow-lg bg-gray-100 hover:bg-white transition duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={IMG_CDN_URL + items.card?.info?.imageId}
            alt={items.card?.info?.name}
            className="h-20 w-20 rounded-full border-2 border-gray-300 shadow-md mr-4"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              {items.card?.info?.name || "No Name"}
            </h3>
            {/* {console.log(items.card?.info?.name || "No Name")} */}
            <p className="text-lg text-gray-600">
              Rs: {items.card?.info?.price ? items.card.info.price / 100 : items.card.info.defaultPrice / 100}
            </p>
            
          </div>
        </div>
        <button className="bg-blue-500 text-white px-3 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300 text-sm"
         onClick={()=>HandAddItem(items)}
         >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Renderitems;
