import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function CampaignFormCard({ title, children }) {
  return (
    <Card className="mb-4 rounded-2xl shadow-lg border border-stone-200 hover:shadow-xl transition bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-stone-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

export default CampaignFormCard;
