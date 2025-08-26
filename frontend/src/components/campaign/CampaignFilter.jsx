import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { IoFilterSharp } from "react-icons/io5";
import CampaignFilterForm from "./CampaignFilterForm";

function CampaignFilter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-xl shadow-sm cursor-pointer"
        >
          <IoFilterSharp className="h-4 w-4" color="black" />
          <span className="text-sm font-medium text-black">Filter</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-full bg-white p-4 rounded-xl shadow-lg"
      >
        <CampaignFilterForm />
      </PopoverContent>
    </Popover>
  );
}

export default CampaignFilter;
