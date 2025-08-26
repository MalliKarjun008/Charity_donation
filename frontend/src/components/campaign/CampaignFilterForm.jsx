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
        <FilterDropDown
          triggerText="Live projects"
          label="Live projects"
          items={[
            "All Projects",
            "Live Projects",
            "Upcoming Projects",
            "Successful Projects",
          ]}
        />
        <FilterDropDown
          triggerText="Amount Pledged"
          label="Amount Pledged"
          items={["<1000", "1000-2000", "2000-3000", "3000+"]}
        />
        <FilterDropDown
          triggerText="Goal"
          label="Goal"
          items={[
            "<1000 goal",
            "1000-2000 goal",
            "2000-3000 goal",
            "3000+ goal",
          ]}
        />
        <FilterDropDown
          triggerText="% Raised"
          label="% Raised"
          items={[
            "Raised 0-10%",
            "Raised 10-30%",
            "Raised 30-70%",
            "Raised 70-100%",
          ]}
        />
      </div>
    </div>
  );
}

export default CampaignFilterForm;
