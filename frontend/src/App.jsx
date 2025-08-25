import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import LandingPage from "./pages/landingPage";
import NavWrapper from "./components/Nav/NavWrapper";
import CreateCampaign from "./pages/createCampaign";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Register /> },
    { path: "/login", element: <Login /> },
    {
      path: "/app",
      element: <NavWrapper />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "create-campaign", element: <CreateCampaign /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
