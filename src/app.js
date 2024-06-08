import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import ErrorD from "./components/ErrorD.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import Shimmer from "./components/Shimmer.js";

// Lazy loading components
const Grocery = lazy(() => import("./components/Grocery.js"));
const About = lazy(() => import("./components/About.js"));
const Body = lazy(() => import("./components/Body.js"));
const Contact = lazy(() => import("./components/Contact.js"));

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-500">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<Shimmer />}><Body /></Suspense>
      },
      {
        path: '/about',
        element: <Suspense fallback={<Shimmer />}><About /></Suspense>
      },
      {
        path: '/contact',
        element: <Suspense fallback={<Shimmer />}><Contact /></Suspense>
      },
      {
        path: '/grocery',
        element: <Suspense fallback={<Shimmer />}><Grocery /></Suspense>
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantMenu />
      }
    ],
    errorElement: <ErrorD />
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
