import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../Footer/footer";

function NavWrapper() {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <div className="w-full flex flex-col sticky top-0 z-50">
        <NavBar />
      </div>

      <Outlet />
      <Footer />
    </div>
  );
}

export default NavWrapper;
