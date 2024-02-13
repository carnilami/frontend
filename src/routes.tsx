import { createBrowserRouter } from "react-router-dom";
import AboutUsPage from "./pages/AboutUsPage";
import AuctionDetailsPage from "./pages/AuctionDetailsPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import SellCarPage from "./pages/SellCarPage";
import SearchVehicle from "./pages/SearchVehicle";

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
        path: "/sell",
        element: <SellCarPage />,
      },
      {
        path: "/search",
        element: <SearchVehicle />,
      }
    ],
  },
]);

export default router;
