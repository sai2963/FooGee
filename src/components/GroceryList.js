import { useContext } from "react";
import GroceryContext from "../Utils/GroceryContext";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../../public/Common/constants";
const GroceryList=()=>{
    console.log();
    const {data}=useContext(GroceryContext)
    const {id} =useParams();
    const groceryItem = data.find(item => item.nodeId === id);
    const groceryNodes = groceryItem?.nodes ;
    console.log(groceryNodes);
    return(
        <div>
            <img src={IMG_CDN_URL+groceryNodes.imgId}/>
        </div>
    )
}
export default GroceryList