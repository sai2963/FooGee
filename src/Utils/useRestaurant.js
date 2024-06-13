import { useEffect,useState } from "react";
import { FoodFire_Menu_AP_URL } from "../../public/Common/constants";
const useRestaurant=  (id) =>{
    const [resInfo,setResInfo]= useState(null);

    useEffect(()=>{
        if(id){
            fetchData()
        }
        
    },[id])

    const fetchData = async () =>{
        const data = await fetch(`${FoodFire_Menu_AP_URL}=${id}`)
        const json = await data.json();
        
        setResInfo(json.data || null);
        
    }

    
    return resInfo;
}
 export default useRestaurant;