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
    const itemCategoryCards1 = regularCards?.filter(card => card.card?.card?.['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory") || [];

    // Get only the third card from the filtered cards, with additional checks
    const categoryCards0 = itemCategoryCards1.length > 0 ? itemCategoryCards1[0]?.card?.card?.categories[0]?.itemCards || [] : [];
    const categoryCards1 = itemCategoryCards1.length > 1 ? itemCategoryCards1[1]?.card?.card?.categories[0]?.itemCards || [] : [];
    const categoryCards2 = itemCategoryCards1.length > 2 ? itemCategoryCards1[2]?.card?.card?.categories[0]?.itemCards || [] : [];

    console.log(categoryCards0);

    // Extracting item cards from the filtered item category cards
    const itemCards0 = categoryCards0;
    const itemCards1 = categoryCards1;
    const itemCards2 = categoryCards2;

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const renderItems = (items) => {
        return items.map((item, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-lg bg-gray-100 hover:bg-white transition duration-300">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={IMG_CDN_URL + item.card?.info?.imageId} alt={item.card?.info?.name} className="h-20 w-20 rounded-full border-2 border-gray-300 shadow-md mr-4" />
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800">{item.card?.info?.name || "No Name"}</h3>
                            <p className="text-lg text-gray-600">Rs: {item.card?.info?.price ? item.card.info.price / 10 : "Free"}</p>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300">Add to Cart</button>
                </div>
            </div>
        ));
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
                    <p className="text-lg mt-1">{area}, {city}</p>
                    <p className="text-lg mt-1">{avgRating ? `Rating: ${avgRating}` : "No rating available"}</p>
                </div>
            </div>
            <div className="restaurant-menu-section p-6">
                {/* Recommended */}
                <div className="accordion-item mb-4">
                    <div className="accordion-header cursor-pointer p-4 bg-gray-200 hover:bg-gray-300 transition duration-300 rounded-t-lg" onClick={() => toggleAccordion(0)}>
                        <b className="text-2xl">Recommended</b>
                    </div>
                    {openAccordion === 0 && (
                        <ul className="accordion-content mt-4 space-y-4">
                            {itemCards0.length > 0 ? renderItems(itemCards0) : <li className="text-lg text-gray-800">No menu items available</li>}
                        </ul>
                    )}
                </div>

                {/* Top One's */}
                <div className="accordion-item mb-4">
                    <div className="accordion-header cursor-pointer p-4 bg-gray-200 hover:bg-gray-300 transition duration-300 rounded-t-lg" onClick={() => toggleAccordion(1)}>
                        <b className="text-2xl">Top One's</b>
                    </div>
                    {openAccordion === 1 && (
                        <ul className="accordion-content mt-4 space-y-4">
                            {itemCards1.length > 0 ? renderItems(itemCards1) : <li className="text-lg text-gray-800">No menu items available</li>}
                        </ul>
                    )}
                </div>

                {/* Your Choice */}
                <div className="accordion-item mb-4">
                    <div className="accordion-header cursor-pointer p-4 bg-gray-200 hover:bg-gray-300 transition duration-300 rounded-t-lg" onClick={() => toggleAccordion(2)}>
                        <b className="text-2xl">Your Choice</b>
                    </div>
                    {openAccordion === 2 && (
                        <ul className="accordion-content mt-4 space-y-4">
                            {itemCards2.length > 0 ? renderItems(itemCards2) : <li className="text-lg text-gray-800">No menu items available</li>}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantMenu;
