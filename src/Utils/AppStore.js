import { configureStore } from "@reduxjs/toolkit";
import Cartreducer from "./CartSlice";
const AppStore =configureStore({
    reducer:{
        cart:Cartreducer
    }
})

export default AppStore;