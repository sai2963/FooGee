import useRestaurant from "../Utils/useRestaurant";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { IMG_CDN_URL } from "../../public/Common/constants";
import { useState } from "react";

const RestaurantMenu = () => {
    const { id } = useParams();
    const resInfo = useRestaurant(id);
    const [openAccordion, setOpenAccordion] = useState(null);

    console.log(resInfo);

    // Extracting restaurant info
    const restaurantInfo = resInfo?.cards?.find(card => card.card?.card?.info)?.card?.card?.info || {};
    const { name, cuisines, costForTwo, cloudinaryImageId, area, city, avgRating } = restaurantInfo;

    // Extracting the regular card group
    const regularCardGroup = resInfo?.cards?.find(card => card.groupedCard?.cardGroupMap?.REGULAR);
    const regularCards = regularCardGroup?.groupedCard?.cardGroupMap?.REGULAR?.cards;

    // Filtering the cards to find item categories
    const itemCategoryCards = regularCards?.filter(card => card.card?.card?.['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") || [];
    console.log(itemCategoryCards);

    // Helper function to render items
    const renderItems = (items) => {
        return items.map((item, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-lg bg-gray-100 hover:bg-white transition duration-300">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={IMG_CDN_URL + item.card?.info?.imageId} alt={item.card?.info?.name} className="h-20 w-20 rounded-full border-2 border-gray-300 shadow-md mr-4" />
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800">{item.card?.info?.name || "No Name"}</h3>
                            <p className="text-lg text-gray-600">Rs: {item.card?.info?.price ? item.card.info.price / 100 : "Free"}</p>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300">Add to Cart</button>
                </div>
            </div>
        ));
    };

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    return resInfo == null ? (
        <Shimmer />
    ) : (
        <div className="restaurant-menu-container bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto mt-8">
            <div className="restaurant-menu-header flex items-center justify-start p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-t-lg">
                <img src={IMG_CDN_URL + cloudinaryImageId} alt={name} className="h-40 w-40 rounded-full border-4 border-white shadow-lg" />
                <div className="ml-6">
                    <h1 className="text-4xl font-semibold">{name || "Restaurant Name Not Available"}</h1>
                    <h5 className="text-lg mt-2">{cuisines ? cuisines.join(", ") : "No cuisines available"} - Cost for two: {costForTwo ? `Rs ${costForTwo / 100}` : "N/A"}</h5>
                    <p className="text-lg mt-1">{area} {city}</p>
                    <p className="text-lg mt-1">{avgRating ? `Rating: ${avgRating}` : "No rating available"}</p>
                </div>
            </div>
            <div className="restaurant-menu-section p-6">
                {itemCategoryCards.map((categoryCard, index) => {
                    const items = categoryCard.card?.card?.itemCards || [];
                    const categoryName = categoryCard.card?.card?.title || `Category ${index + 1}`;
                    return (
                        <div key={index} className="accordion-item mb-4">
                            <div className="accordion-header cursor-pointer p-4 bg-gray-200 hover:bg-gray-300 transition duration-300 rounded-t-lg" onClick={() => toggleAccordion(index)}>
                                <b className="text-2xl">{categoryName}</b>
                            </div>
                            {openAccordion === index && (
                                <ul className="accordion-content mt-4 space-y-4">
                                    {items.length > 0 ? renderItems(items) : <li className="text-lg text-gray-800">No menu items available</li>}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RestaurantMenu;
