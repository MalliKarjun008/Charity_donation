import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import NavBarCategories from "./NavBarCategories";
import Footer from "../Footer/footer";

function NavWrapper() {
  return (
    <>
      <div className="w-full flex flex-col sticky top-0 z-50">
        <NavBar />
        <NavBarCategories />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default NavWrapper;
