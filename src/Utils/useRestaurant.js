import { useEffect,useState } from "react";

const useRestaurant=  (id) =>{
    const [resInfo,setResInfo]= useState(null);

    useEffect(()=>{
        if(id){
            fetchData()
        }
        
    },[id])

    const fetchData = async () =>{
        const data = await fetch(`https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&submitAction=ENTER&restaurantId=${id}`)
        const json = await data.json();
        
        setResInfo(json.data || null);
        
    }

    
    return resInfo;
}
 export default useRestaurant;