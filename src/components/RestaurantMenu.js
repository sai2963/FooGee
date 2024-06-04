import useRestaurant from "../Utils/useRestaurant";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { IMG_CDN_URL } from "../../public/Common/constants";

const RestaurantMenu = () => {
    const { id } = useParams();
    const resInfo = useRestaurant(id);

    const restaurantInfo = resInfo?.cards?.find(card => card.card?.card?.info)?.card?.card?.info || {};
    const { name, cuisines, costForTwo, cloudinaryImageId, area, city, avgRating } = restaurantInfo;

    const itemCards = resInfo?.cards?.find(card => card.groupedCard?.cardGroupMap?.REGULAR)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(card => card.card?.card?.carousel)?.card?.card?.carousel || [];

    return resInfo == null ? (
        <Shimmer />
    ) : (
        <div className="restaurant-menu-container bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto mt-8">
            <div className="restaurant-menu-header flex items-center justify-start p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-t-lg">
                <img src={IMG_CDN_URL + cloudinaryImageId} alt={name} className="h-40 w-40 rounded-full border-4 border-white shadow-lg" />
                <div className="ml-6">
                    <h1 className="text-4xl font-semibold">{name || "Restaurant Name Not Available"}</h1>
                    <h5 className="text-lg mt-2">{cuisines ? cuisines.join(", ") : "No cuisines available"} - Cost for two: {costForTwo ? `Rs ${costForTwo / 100}` : "N/A"}</h5>
                    <p className="text-lg mt-1">{area}, {city}</p>
                    <p className="text-lg mt-1">{avgRating ? `Rating: ${avgRating}` : "No rating available"}</p>
                </div>
            </div>
            <div className="restaurant-menu-section p-6">
                <b className="text-2xl">Restaurant Menu</b>
                <ol className="list-decimal mt-4 space-y-2">
                    {itemCards.length > 0 ? (
                        itemCards.map((item, index) => (
                            <li key={index} className="text-lg text-gray-800">{item.dish?.info?.name || "No Name"} - Rs: {item.dish?.info?.price ? item.dish.info.price / 10 : "Free"}</li>
                        ))
                    ) : (
                        <li className="text-lg text-gray-800">No menu items available</li>
                    )}
                </ol>
            </div>
        </div>
    );
};

export default RestaurantMenu;
