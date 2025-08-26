import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";

// icons
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaDonate } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoCreateSharp } from "react-icons/io5";

function MenuComponent() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <h1 className="text-2xl cursor-pointer text-white font-bold">
            Donate
          </h1>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-10 w-[300px]">
        <DropdownMenuLabel className="flex items-center justify-start px-5 text-2xl gap-5  hover:bg-slate-200">
          <FaHome />
          Home
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-start px-5 text-xl cursor-pointer gap-5  hover:bg-slate-200">
          <CgProfile />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-start px-5 text-xl cursor-pointer gap-5  hover:bg-slate-200">
          <FaDonate />
          My Donations
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-start px-5 text-xl cursor-pointer gap-5  hover:bg-slate-200">
          <MdCampaign />
          My Campaigns
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigate("create-campaign");
          }}
          className="flex items-center justify-start px-5 text-xl cursor-pointer gap-5  hover:bg-slate-200"
        >
          <IoCreateSharp />
          Create Campaign
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-start px-5 text-xl gap-5 cursor-pointer hover:bg-slate-200">
          <MdOutlineManageAccounts />
          My Accounts
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MenuComponent;
