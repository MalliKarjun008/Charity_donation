import DonationCard from "@/components/campaign/campaignCard";
import CampaignFilter from "@/components/campaign/CampaignFilter";
import { PaginationComponent } from "@/utils/paginate";

function landingPage() {
  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-[80%] flex justify-start mx-10 text-2xl font-bold gap-5">
        <CampaignFilter />
        <h1>40 Charities campaigns</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 m-auto w-[80%] mt-5">
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
      </div>
      <PaginationComponent totalPage={10} />
    </div>
  );
}

export default landingPage;
