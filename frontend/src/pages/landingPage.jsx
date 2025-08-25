import CampaignCard from "@/components/campaign/campaignCard";
import CampaignFilter from "@/components/campaign/CampaignFilter";
import ImageThreeSlider from "@/utils/imageFourSlide";

import { PaginationComponent } from "@/utils/paginate";

function landingPage() {
  return (
    <div className="flex flex-col items-center m-0 p-5 bg-stone-300">
      <div className="w-[60%] m-5">
        <ImageThreeSlider />
      </div>
      <div className="w-[90%] rounded-lg mt-5 bg-stone-400/90">
        <div className="w-[95%] shadow-stone-400 shadow-xl bg-stone-600 px-8 py-5 text-white flex items-center justify-start mx-auto mt-5 text-4xl font-bold gap-5 rounded-lg">
          <CampaignFilter />
          <h1>40 Charities campaigns</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 m-auto w-[90%] p-10 ">
          <CampaignCard value={60} />
          <CampaignCard value={80} />
          <CampaignCard value={100} />
          <CampaignCard value={40} />
          <CampaignCard value={70} />
          <CampaignCard value={90} />
          <CampaignCard value={30} />
        </div>
      </div>
      <PaginationComponent totalPage={10} />
    </div>
  );
}

export default landingPage;
