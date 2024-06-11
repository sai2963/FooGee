import RestaurantCard, { withLabel } from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import { FOODFIRE_API_URL } from "../../public/Common/constants";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../Utils/useOnlineStaus";
import { Link } from "react-router-dom";
import UserContext from "../Utils/UserContext";

const Body = () => {
  const [rRestaurantList, setrRestaurantList] = useState([]);
  const [searchtext, setsearchtext] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredres, setfilteredres] = useState([]);
  
  const RestaurantVeg = withLabel(
    RestaurantCard,
    "Veg",
    "absolute top-0 left-0 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-br-lg shadow-md z-10"
  );
  const RestaurantNonVeg = withLabel(
    RestaurantCard,
    "Non-Veg",
    "absolute top-0 left-0 bg-gradient-to-r from-red-400 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-br-lg shadow-md z-10"
  );
  
  const { setUserName, loggedInUser } = useContext(UserContext);
  console.log("Re Rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(FOODFIRE_API_URL);
      const json = await data.json();
      const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      console.log(restaurants);
      setrRestaurantList(restaurants);
      setAllRestaurants(restaurants);
      setfilteredres(restaurants);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1 className="text-center text-red-500">Looks like you're offline</h1>
    );

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-center items-center space-x-4 mb-6">
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={searchtext}
          placeholder="Search for restaurants"
          onChange={(e) => setsearchtext(e.target.value)}
        />
        <button
          type="search"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            const searchRes = allRestaurants.filter((restaurant) =>
              restaurant.info.name.toLowerCase().includes(searchtext.toLowerCase())
            );
            setfilteredres(searchRes);
          }}
        >
          Search
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
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
      <div>
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/4  focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={loggedInUser}
          placeholder="Enter Your Name"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredres.length > 0 ? (
          filteredres.map((restaurant) => (
            <Link
              to={"/restaurant/" + restaurant.info.id}
              key={restaurant.info.id}
              className="block transform transition duration-300 hover:scale-105"
            >
              {restaurant.info.veg ? (
                <RestaurantVeg {...restaurant.info} />
              ) : (
                <RestaurantNonVeg {...restaurant.info} />
              )}
            </Link>
          ))
        ) : (
          <Shimmer />
        )}
      </div>
    </div>
  );
};

export default Body;
