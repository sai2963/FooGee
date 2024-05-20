import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { FOODFIRE_API_URL } from "../../public/Common/constants";
import Shimmer from "./Shimmer";

const Body = () => {
  // Initialize RestaurantList with an empty array
  const [rRestaurantList, setrRestaurantList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(FOODFIRE_API_URL);

      const json = await data.json();
      // optional chaining
      const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants;
      
      console.log(restaurants);

      setrRestaurantList(restaurants);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div>
      <div className="filter">
        <button
          className="filter-btn ml-20 bg-transparent bg-amber-300"
          onClick={() => {
            const filteredList = rRestaurantList.filter(
              (restaurant) => restaurant.info.avgRating >= 4
            );
            setrRestaurantList(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      {/* conditional rendering */}
      <div className="restaurant-list">
      
      {rRestaurantList.length > 0 ? (
          rRestaurantList.map((restaurant) => (
            <RestaurantCard key={restaurant.info.id} {...restaurant.info} />
          ))
        ) : (
        <Shimmer/>
        )}
      </div>
    </div>
  );
};

export default Body;
