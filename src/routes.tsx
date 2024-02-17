import { createBrowserRouter } from "react-router-dom";
import { AccountLayout } from "./pages/layouts/AccountLayout";
import Layout from "./pages/layouts/Layout";
import PrivateLayout from "./pages/layouts/PrivateLayout";
import AboutUsPage from "./pages/pages/AboutUsPage";
import AuctionDetailsPage from "./pages/pages/AuctionDetailsPage";
import HomePage from "./pages/pages/HomePage";
import LoginPage from "./pages/pages/LoginPage";
import MyListings from "./pages/pages/MyListings";
import MyProfile from "./pages/pages/MyProfile";
import MySettings from "./pages/pages/MySettings";
import SearchVehicle from "./pages/pages/SearchVehicle";
import SellCarPage from "./pages/pages/SellCarPage";
import ProfilePage from "./pages/pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/auctions/:id",
        element: <AuctionDetailsPage />,
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/search",
        element: <SearchVehicle />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/sell",
        element: <SellCarPage />,
      },
      {
        path: "/account",
        element: <AccountLayout />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: "/account/listings",
            element: <MyListings />,
          },
          {
            path: "/account/settings",
            element: <MySettings />,
          },
        ],
      },
    ],
  },
]);

export default router;
