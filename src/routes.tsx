import { createBrowserRouter } from "react-router-dom";
import { AccountLayout } from "./pages/layouts/AccountLayout";
import Layout from "./pages/layouts/Layout";
import PrivateLayout from "./pages/layouts/PrivateLayout";
import AboutUsPage from "./pages/pages/AboutUsPage";
import AuctionDetailsPage from "./pages/pages/AuctionDetailsPage";
import HomePage from "./pages/pages/HomePage";
import ListingsPage from "./pages/pages/ListingsPage";
import ProfilePage from "./pages/pages/ProfilePage";
import RouteNotFoundPage from "./pages/pages/RouteNotFoundPage";
import SearchVehicle from "./pages/pages/SearchVehiclePage";
import SellCarPage from "./pages/pages/SellCarPage";
import SettingsPage from "./pages/pages/SettingsPage";

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
      {
        path: "*",
        element: <RouteNotFoundPage />,
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
            element: <ListingsPage />,
          },
          {
            path: "/account/settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
