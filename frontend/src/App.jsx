import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import LandingPage from "./pages/landingPage";
import NavWrapper from "./components/Nav/NavWrapper";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Register /> },
    { path: "/login", element: <Login /> },
    {
      path: "/app",
      element: <NavWrapper />,
      children: [{ index: true, element: <LandingPage /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
