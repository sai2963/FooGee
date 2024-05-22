import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../../public/Common/constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchData();
    }, [resId]);

    const fetchData = async () => {
        try {
            const response = await fetch("https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=630");
            const json = await response.json();
            console.log(json);
            setResInfo(json.data || null);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const restaurantInfo = resInfo?.cards?.[2]?.card?.card?.info || {};
    const { name, cuisines, costForTwo } = restaurantInfo;
    const itemCards = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card?.itemCards || [];

    console.log(resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card?.itemCards);

    return resInfo == null ? (
        <Shimmer />     
    ) : (
        <div>
            <h1>{name || "Restaurant Name Not Available"}</h1>
            <h5>{cuisines ? cuisines.join(", ") : "No cuisines available"} - Cost for two: {costForTwo/100 || "N/A"}</h5>
            
            <b>Restaurant Menu</b>
            <ol>
                {itemCards.length > 0 ? (
                    itemCards.map((item, index) => (
                        <li key={index}>{item.card.info.name  || "No Name"} - Rs: {  item.card.info.price/10  || "Free"}</li>
                    ))
                ) : (
                    <li>No menu items available</li>
                )}
            </ol>
        </div>
    );
};

export default RestaurantMenu;
