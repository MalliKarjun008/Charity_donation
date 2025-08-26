import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import LandingPage from "./pages/landingPage";
import NavWrapper from "./components/Nav/NavWrapper";
import CreateCampaign from "./pages/createCampaign";
import DonationHistory from "./pages/DonationHistory";
import ViewProfile from "./pages/view-profile";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Register /> },
    { path: "/login", element: <Login /> },
    {
      path: "/app",
      element: <NavWrapper />,
      children: [
        { index: true, element: <LandingPage /> },
        {
          path: "profile",
          children: [{ path: "view", element: <ViewProfile /> }],
        },
      ],
    },
    {
      path: "/campaign",
      children: [{ path: "create-campaign", element: <CreateCampaign /> }],
    },
    {
      path: "/donation",
      children: [{ path: "donation-history", element: <DonationHistory /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
