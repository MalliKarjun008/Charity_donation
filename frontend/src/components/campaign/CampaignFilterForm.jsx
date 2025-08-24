import FilterDropDown from "./FilterDropDown";
import { Button } from "../ui/button";

function CampaignFilterForm() {
  return (
    <div className="flex gap-20 w-full justify-between items-center px-6 py-4 bg-white rounded-xl shadow-sm border">
      {/* Left section (tabs/links) */}
      <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
        <Button
          variant="ghost"
          className="justify-start cursor-pointer hover:underline hover:text-primary transition-colors px-5 py-2"
        >
          Projects we Love
        </Button>
        <Button
          variant="ghost"
          className="justify-start cursor-pointer hover:underline hover:text-primary transition-colors px-5 py-2"
        >
          Saved projects
        </Button>
        <Button
          variant="ghost"
          className="justify-start cursor-pointer hover:underline hover:text-primary transition-colors px-5 py-2"
        >
          Following
        </Button>
        <Button
          variant="ghost"
          className="justify-start cursor-pointer hover:underline hover:text-primary transition-colors px-5 py-2"
        >
          Projects I've backed
        </Button>
      </div>

      {/* Right section (filters) */}
      <div className="flex flex-col gap-3">
        <FilterDropDown triggerText="Live projects" />
        <FilterDropDown triggerText="Amount Pledged" />
        <FilterDropDown triggerText="Goal" />
        <FilterDropDown triggerText="% Raised" />
      </div>
    </div>
  );
}

export default CampaignFilterForm;
