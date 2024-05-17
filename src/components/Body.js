import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";

const Body = () => {
  // Initialize RestaurantList with an empty array
  const [rRestaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();
      const restaurants = json.data.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants ;
      
      console.log(restaurants);

      setRestaurantList(restaurants);
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
            setRestaurantList(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="restaurant-list">
        {rRestaurantList.length > 0 ? (
          rRestaurantList.map((restaurant) => (
            <RestaurantCard key={restaurant.info.id} {...restaurant.info} />
          ))
        ) : (
          <p>Loading.... Restaurants Please Wait</p>
        )}
      </div>
    </div>
  );
};

export default Body;
