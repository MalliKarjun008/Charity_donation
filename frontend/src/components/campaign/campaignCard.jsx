import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dummyImg from "../../assets/dummy.png";
import { FaBookmark } from "react-icons/fa";
import CampaignProgress from "./CampaignProgress";

function CampaignCard({ value }) {
  return (
    <Card className="w-full max-w-sm rounded-2xl bg-stone-600 p-5 text-white hover:shadow-lg transition shadow-lg hover:scale-105 cursor-pointer border-none">
      {/* Image */}
      <div className="relative">
        <img
          src={dummyImg}
          alt="campaign"
          className="w-full h-48 object-cover rounded-2xl"
        />
        <button className="absolute cursor-pointer top-3 right-3 text-white bg-black/50 p-2 rounded-full hover:bg-black/70">
          <FaBookmark size={18} />
        </button>
      </div>

      {/* Card Content */}
      <CardHeader className="space-y-2 text-white">
        <CardTitle className="text-lg font-semibold">
          Flow Timer: For Productivity and Focus
        </CardTitle>
        <CardDescription className="text-sm text-white">
          Flow Timer helps you stay focused by breaking work into short, timed
          intervals.
        </CardDescription>
      </CardHeader>

      {/* Footer with Progress */}
      <CardFooter className="flex flex-col gap-2 items-start">
        <p className="text-sm font-medium ">10 days left</p>
        <div className="w-full">
          <CampaignProgress value={value} />
          <p className="mt-1 text-sm font-medium text-green-600">
            {value}% funded
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CampaignCard;
