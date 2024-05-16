import RestaurantCard from "./RestaurantCard";
import restaurantList from "../Utils/Data";
import { FOODFIRE_API_URL } from "../../public/Common/constants";
import { useEffect, useState } from "react";
const Body = () => {
  // Initialize RestaurantList with an empty array
  const [RestaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.37240&lng=78.43780&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }

      const json = await data.json();
      console.log(json);

      setRestaurantList(json.data.cards[2].card.card);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="filter">
        <button
          className="filter-btn ml-20 bg-transparent bg-amber-300"
          onClick={() => {
            const filteredList = RestaurantList.filter(
              (restaurant) => restaurant.data.avgRating >= 4
            );
            setRestaurantList(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="restaurant-list">
        {RestaurantList.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} {...restaurant.data} />
        ))}
      </div>
    </div>
  );
};

export default Body;
