import { useEffect,useState } from "react";

const useRestaurant=  (id) =>{
    const [resInfo,setResInfo]= useState(null);

    useEffect(()=>{
        if(id){
            fetchData()
        }
        
    },[id])

    

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
    return resInfo;
}
 export default useRestaurant;