import SearchInput from "@/utils/searchInput";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../user/userAvatar";
import MenuComponent from "./MenuComponent";
import NavMenu from "./NavMenu";

function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center h-16 w-full m-0 px-5 py-2 bg-stone-500 shadow-md">
      {/* <MenuComponent /> */}
      <NavMenu />
      <div className="flex w-[60%] justify-between gap-5">
        <div className="flex justify-center items-center h-full w-2/3 my-auto ">
          <SearchInput placeholder="Search for charities" />
        </div>
        <div className="flex justify-end items-center h-full gap-5">
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-green-500 flex justify-start items-center gap-2 font-bold hover:scale-105 cursor-pointer hover:shadow-md text-white px-5 py-2 rounded-md"
          >
            <UserAvatar />
            <p>Logout</p>
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
            className="bg-green-500 font-bold hover:scale-105 cursor-pointer hover:shadow-md text-white px-5 py-2 rounded-md"
          >
            Connect
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
