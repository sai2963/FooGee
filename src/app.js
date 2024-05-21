import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js";
import About from "./components/about.js";
import ErrorD from "./components/ErrorD.js";
import Contact from "./components/contact.js";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

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
      <Footer />
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
        element:<Body/>
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/contact',
        element:<Contact/>
      }
    ],
    errorElement:<ErrorD/>
  },
  

])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
