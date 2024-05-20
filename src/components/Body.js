import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { FOODFIRE_API_URL } from "../../public/Common/constants";
import Shimmer from "./Shimmer";

const Body = () => {
  // Initialize RestaurantList with an empty array
  const [rRestaurantList, setrRestaurantList] = useState([]);
  const [searchtext, setsearchtext] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredres, setfilteredres] = useState("");
  console.log("Re Renderd");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(FOODFIRE_API_URL);

      const json = await data.json();
       // optional chaining
      const restaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      console.log(restaurants);
      setrRestaurantList(restaurants)
      setAllRestaurants(restaurants);
      setfilteredres(restaurants);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="body">
      <div className="filter">
        <input
        className="premium-input"
          type="text"
          value={searchtext}
          onChange={(e) => {
            setsearchtext(e.target.value);
          }}
        />
        <button
          type="search"
          className="premium-button"
          onClick={() => {
            const searchRes = allRestaurants.filter((restaurant) =>
              restaurant.info.name.includes(searchtext)
            );

            setfilteredres(searchRes,allRestaurants);
          }}
        >
          Search
        </button>

        <button
          className="premium-button"
          onClick={() => {
            const filteredList = allRestaurants.filter(
              (restaurant) => restaurant.info.avgRating >= 4
            );
            setfilteredres(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      {/* conditional rendering */}
      <div className="restaurant-list">
        {allRestaurants.length > 0 ? (
          filteredres.map((restaurant) => (
            <RestaurantCard key={restaurant.info.id} {...restaurant.info} />
          ))
        ) : (
          <Shimmer />
        )}
      </div>
    </div>
  );
};

export default Body;
