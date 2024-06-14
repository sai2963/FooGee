import { createContext, useState, useEffect } from "react";
import GroceryList from "./GroceryData";import Grocery from "../components/Grocery";

const GroceryContext=createContext({
    
    data : GroceryList?.[0]?.data?.widgets?.[1]?.data
})

export default GroceryContext
