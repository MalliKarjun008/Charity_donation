import { Progress } from "../ui/progress";

function CampaignProgress({ value }) {
  if (value > 100) value = 100;
  if (value < 0) value = 0;

  const progressColor =
    value >= 75 ? "bg-green-500" : value >= 35 ? "bg-yellow-500" : "bg-red-500";

  return (
    <Progress
      value={value}
      className={`h-2 bg-gray-200 [&>div]:${progressColor}`}
    />
  );
}

export default CampaignProgress;
