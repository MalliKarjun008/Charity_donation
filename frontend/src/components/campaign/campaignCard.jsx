import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dummyImg from "../../../public/dummy.png";
import { Progress } from "../ui/progress";
import { FaBookmark } from "react-icons/fa";

function DonationCard() {
  return (
    <Card className="w-full max-w-sm rounded-2xl border border-gray-200 hover:shadow-lg transition shadow-lg hover:scale-105 cursor-pointer">
      {/* Image */}
      <div className="relative">
        <img
          src={dummyImg}
          alt="campaign"
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <button className="absolute cursor-pointer top-3 right-3 text-white bg-black/50 p-2 rounded-full hover:bg-black/70">
          <FaBookmark size={18} />
        </button>
      </div>

      {/* Card Content */}
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-semibold">
          Flow Timer: For Productivity and Focus
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Flow Timer helps you stay focused by breaking work into short, timed
          intervals.
        </CardDescription>
      </CardHeader>

      {/* Footer with Progress */}
      <CardFooter className="flex flex-col gap-2 items-start">
        <p className="text-sm font-medium text-gray-700">10 days left</p>
        <div className="w-full">
          <Progress value={50} className="h-2 bg-gray-200">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{ width: "50%" }}
            />
          </Progress>
          <p className="mt-1 text-sm font-medium text-green-600">50% funded</p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default DonationCard;
