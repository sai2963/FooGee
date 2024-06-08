import useRestaurant from "../Utils/useRestaurant";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { IMG_CDN_URL } from "../../public/Common/constants";
import { useState } from "react";
import Accordion from "./Accordion";
import { MenuShimmer } from "./Shimmer";

const RestaurantMenu = () => {
  const { id } = useParams();
  const resInfo = useRestaurant(id);
  const [openAccordion, setOpenAccordion] = useState(null);

  console.log(resInfo);

  // Extracting restaurant info
  const restaurantInfo =
    resInfo?.cards?.find((card) => card.card?.card?.info)?.card?.card?.info ||
    {};
  const {
    name,
    cuisines,
    costForTwo,
    cloudinaryImageId,
    area,
    city,
    avgRating,
  } = restaurantInfo;

  // Extracting the regular card group
  const regularCardGroup = resInfo?.cards?.find(
    (card) => card.groupedCard?.cardGroupMap?.REGULAR
  );
  const regularCards =
    regularCardGroup?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  // Filtering the cards to find item categories
  const itemCategoryCards =
    regularCards?.filter(
      (card) =>
        card.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];
  console.log(itemCategoryCards);

  // Helper function to render items
  

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return resInfo == null ? (
    <MenuShimmer />
  ) : (
    <div className="restaurant-menu-container bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto mt-8">
      <div className="restaurant-menu-header flex items-center justify-start p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-t-lg">
        <img
          src={IMG_CDN_URL + cloudinaryImageId}
          alt={name}
          className="h-40 w-40 rounded-full border-4 border-white shadow-lg"
        />
        <div className="ml-6">
          <h1 className="text-4xl font-semibold">
            {name || "Restaurant Name Not Available"}
          </h1>
          <h5 className="text-lg mt-2">
            {cuisines ? cuisines.join(", ") : "No cuisines available"} - Cost
            for two: {costForTwo ? `Rs ${costForTwo / 100}` : "N/A"}
          </h5>
          <p className="text-lg mt-1">
            {area} {city}
          </p>
          <p className="text-lg mt-1">
            {avgRating ? `Rating: ${avgRating}` : "No rating available"}
          </p>
          
        </div>
      </div>
      <div className="restaurant-menu-section p-6">
        {itemCategoryCards.map((categoryCard, index) => {
          const items = categoryCard.card?.card?.itemCards || [];
          const categoryName =
            categoryCard.card?.card?.title || `Category ${index + 1}`;
          return (
            <Accordion
              key={index}
              index={index}
              items={items}
              categoryName={categoryName}
              openAccordion={openAccordion}
              toggleAccordion={toggleAccordion}
              //renderItems={renderItems}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
