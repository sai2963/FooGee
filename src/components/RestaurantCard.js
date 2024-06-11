import { useContext } from "react";
import { IMG_CDN_URL } from "../../public/Common/constants.js";
import UserContext from "../Utils/UserContext.js";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  area,
  lastMileTravelString,
  costForTwoString,
  avgRating,
}) => {
  const ratingColor = avgRating >= 4 ? "bg-green-500" : avgRating >= 3 ? "bg-yellow-500" : "bg-red-500";
  const {loggedInUser} =useContext(UserContext)

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 w-full sm:w-64 relative">
      <img src={IMG_CDN_URL + cloudinaryImageId} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 truncate">{name}</h2>
        <h4 className="text-sm text-gray-600 truncate">{cuisines.join(", ")}</h4>
        <h4 className="text-sm text-gray-600 mb-2 truncate">{area}</h4>
        <div className="flex items-center justify-between text-gray-700 text-sm">
          <span className={`flex items-center text-white px-2 py-1 rounded ${ratingColor}`}>
            <i className="fa-solid fa-star text-white mr-1"></i>
            {avgRating}
          </span>
          <span>{lastMileTravelString}</span>
          <span>{costForTwoString}</span>
          <soan>{loggedInUser}</soan>
        </div>
      </div>
    </div>
  );
};

export const withLabel = (RestaurantCard, label, labelStyle) => {
  return (props) => (
    <div className="relative">
      <span className={labelStyle}>{label}</span>
      <RestaurantCard {...props} />
    </div>
  );
};

export default RestaurantCard;
