import SearchInput from "@/utils/searchInput";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center h-16 w-full m-0 px-5 py-2 bg-slate-200 shadow-md">
      <div>
        <h1 className="text-2xl font-bold">Donate</h1>
      </div>
      <div className="flex justify-center items-center h-full w-1/3 my-auto">
        <SearchInput placeholder="Search for charities" />
      </div>
      <div className="flex justify-end items-center h-full gap-5">
        <Button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-black font-bold hover:scale-105 cursor-pointer hover:shadow-md text-white px-5 py-2 rounded-md"
        >
          Login
        </Button>
        <Button
          onClick={() => {
            navigate("/");
          }}
          className="bg-black font-bold hover:scale-105 cursor-pointer hover:shadow-md text-white px-5 py-2 rounded-md"
        >
          Register
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
