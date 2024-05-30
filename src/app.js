import React, { lazy,Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
//import Body from "./components/Body.js";
import Footer from "./components/Footer.js";
//import About from "./components/About.js";
import ErrorD from "./components/ErrorD.js";
//import Contact from "./components/contact.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Shimmer from "./components/Shimmer.js";
//import Grocery from "./components/Grocery.js";


const Grocery =lazy(()=>("./components/Grocery.js"))

const Body =lazy(()=>import("./components/Body.js"));
const Contact =lazy(()=>import("./components/Contact.js"));
/* 
       
*/

// Title component for display logo

// RestaurantList is JSON Data for displaying cards

// Restaurant card component: Image, name, cuisine

// AppLayout component to show: Header, Body, Footer
const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet/>
      {/* <Footer /> */}
    </>
  );
};
 
const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<Suspense fallback={<Shimmer/>}><Body/></Suspense>
      },
      {
        path:'/about',
        element:<Suspense fallback={<Shimmer/>}><About/></Suspense>
      },
      {
        path:'/contact',
        element:<Suspense fallback={<Shimmer/>}><Contact/></Suspense>
      },
      {
        path:'/grocery',
        element:<Suspense fallback={<Shimmer/>}><Grocery/></Suspense>
      },
      {
        path:'/restaurant/:id',
        element:<RestaurantMenu/>
      }
    ],
    errorElement:<ErrorD/>
  },
  

])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
