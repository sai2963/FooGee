import RestaurantCard from "./RestaurantCard";
import restaurantList from "../Utils/Data";
import { useState } from "react";
const Body = () => {
  const [RestaurantList,setRestaurantList] = useState(restaurantList)
  return (

    <div>
      <div className="filter">
        <button
          className="filter-btn ml-20 bg-transparent bg-amber-300"
          onClick={() => {
            const FilterdList = restaurantList.filter((res) => res.data.avgRating > 4);
            console.log(restaurantList)
            setRestaurantList(FilterdList)
          }
        
      }
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="restaurant-list">
        {RestaurantList.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.data.id} {...restaurant.data} />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
