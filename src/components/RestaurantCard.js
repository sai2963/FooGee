import { IMG_CDN_URL } from "../../public/Common/constants.js";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  area,
  lastMileTravelString,
  costForTwoString,
  avgRating,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 w-full sm:w-64">
      <img src={IMG_CDN_URL + cloudinaryImageId} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 truncate">{name}</h2>
        <h4 className="text-sm text-gray-600 truncate">{cuisines.join(", ")}</h4>
        <h4 className="text-sm text-gray-600 mb-2 truncate">{area}</h4>
        <div className="flex items-center justify-between text-gray-700 text-sm">
          <span className="flex items-center">
            <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
            {avgRating}
          </span>
          <span>{lastMileTravelString}</span>
          <span>{costForTwoString}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
