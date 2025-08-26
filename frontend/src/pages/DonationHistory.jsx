import MyCampaignsHistory from "@/components/Donation/MyCampaignsHistory";
import MyDonationHistory from "@/components/Donation/MyDonationHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function DonationHistory() {
  return (
    <Tabs defaultValue="myDonations" className="w-full min-h-screen mt-5">
      <div className="flex justify-center items-center w-full">
        <TabsList className=" bg-slate-300 text-lg">
          <TabsTrigger
            className="px-10 py-2 text-md w-[50%]"
            value="myDonations"
          >
            My Donations
          </TabsTrigger>
          <TabsTrigger
            className=" bg-slate-300 text-md w-[50%]"
            value="myCampaigns"
          >
            My Campaigns
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="myDonations">
        <MyDonationHistory />
      </TabsContent>
      <TabsContent value="myCampaigns">
        <MyCampaignsHistory />
      </TabsContent>
    </Tabs>
  );
}

export default DonationHistory;
