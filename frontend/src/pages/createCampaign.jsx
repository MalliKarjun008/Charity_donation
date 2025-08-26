import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ErrorComponent from "@/components/campaign/create-campaign/ErrorComponent";
import CampaignFormCard from "@/components/campaign/create-campaign/CampaignFormCard";

import { useActionState } from "react";
import { Label } from "@/components/ui/label";

function CreateCampaign() {
  const handleFomAction = (prevData, formData) => {
    console.log(formData.get("title"));
    return { error: null };
  };

  const [formState, formAction] = useActionState(handleFomAction, {
    error: null,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <h1 className="text-3xl font-bold mb-8 text-center text-stone-700">
        Create New Campaign
      </h1>

      {/* Error Component */}
      <ErrorComponent error={formState.error} />

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Campaign Details */}
          <CampaignFormCard title="Campaign Details">
            <Input
              name="title"
              placeholder="Campaign Title"
              className="rounded-lg"
              required
            />
            <Textarea
              name="description"
              placeholder="Describe your campaign..."
              className="rounded-lg"
              // required
            />
            <Input
              name="category"
              placeholder="Category (e.g., Education, Healthcare)"
              className="rounded-lg"
              // required
            />
          </CampaignFormCard>

          {/* Funding Goal */}
          <CampaignFormCard title="Funding Goal">
            <Input
              type="number"
              name="goal"
              placeholder="Target Amount (₹)"
              className="rounded-lg"
              // required
            />
            <Label>End Date</Label>
            <Input
              type="date"
              name="endDate"
              className="rounded-lg"
              // required
            />
          </CampaignFormCard>

          {/* Beneficiary */}
          <CampaignFormCard title="Beneficiary">
            <Input
              name="beneficiaryName"
              placeholder="Beneficiary Name / Organization"
              className="rounded-lg"
              // required
            />
            <Textarea
              name="beneficiaryDetails"
              placeholder="Beneficiary details..."
              className="rounded-lg"
            />
          </CampaignFormCard>

          {/* Media */}
          <CampaignFormCard title="Media">
            <Input
              type="file"
              name="mediaFile"
              className="rounded-lg"
              accept="image/*,video/*"
            />
            <Input
              name="videoLink"
              placeholder="Video Link (YouTube, Vimeo)"
              className="rounded-lg"
            />
          </CampaignFormCard>
        </div>
        {/* Blockchain & Organizer Info */}
        <CampaignFormCard title="Blockchain & Organizer">
          <Input
            name="walletAddress"
            placeholder="Receiving Wallet Address"
            className="rounded-lg"
            required
          />
          <Input
            name="organizerName"
            placeholder="Organizer Full Name"
            className="rounded-lg"
            required
          />
          <Input
            type="email"
            name="organizerEmail"
            placeholder="Organizer Email"
            className="rounded-lg"
            required
          />
          <Input
            type="number"
            name="minDonation"
            placeholder="Minimum Donation Amount"
            className="rounded-lg"
          />
        </CampaignFormCard>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full mt-6 py-3 text-lg rounded-xl shadow-md cursor-pointer hover:bg-stone-700"
        >
          Create Campaign
        </Button>
      </form>
    </div>
  );
}

export default CreateCampaign;
