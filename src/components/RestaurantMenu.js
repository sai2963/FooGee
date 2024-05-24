import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { IMG_CDN_URL } from "../../public/Common/constants";
 // Adjust the path as necessary

const RestaurantMenu = () => {
    const { id } = useParams();
    console.log(id);
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&submitAction=ENTER&restaurantId=${id}`); // Ensure resId has no extra spaces

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            setResInfo(json.data || null);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    // Check the correct path to restaurant information in the response JSON
    const restaurantInfo = resInfo?.cards?.find(card => card.card?.card?.info)?.card?.card?.info || {};
    console.log(restaurantInfo);
    const { name, cuisines, costForTwo, cloudinaryImageId, area, city, avgRating } = restaurantInfo;

    const itemCards = resInfo?.cards?.find(card => card.groupedCard?.cardGroupMap?.REGULAR)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(card => card.card?.card?.carousel)?.card?.card?.carousel || [];

    return resInfo == null ? (
        <Shimmer />
    ) : (
        <div className="restaurant-menu-container">
            <div className="restaurant-menu-header">
                <img src={IMG_CDN_URL + cloudinaryImageId} alt={name} height="200px" width="200px" />
                <div>
                    <h1>{name || "Restaurant Name Not Available"}</h1>
                    <h5>{cuisines ? cuisines.join(", ") : "No cuisines available"} - Cost for two: {costForTwo ? costForTwo / 100 : "N/A"}</h5>
                    <p>{area}</p>
                    <p>{city}</p>
                    <p>{avgRating ? `Rating: ${avgRating}` : "No rating available"}</p>
                </div>
            </div>
            <div className="restaurant-menu-section">
                <b>Restaurant Menu</b>
                <ol>
                    {itemCards.length > 0 ? (
                        itemCards.map((item, index) => (
                            <li key={index}>{item.dish?.info?.name || "No Name"} - Rs: {item.dish?.info?.price ? item.dish.info.price / 10 : "Free"}</li>
                        ))
                    ) : (
                        <li>No menu items available</li>
                    )}
                </ol>
            </div>
        </div>
    );
};

export default RestaurantMenu;
