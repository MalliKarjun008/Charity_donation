import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function ErrorComponent() {
  return (
    <div className="my-6">
      <Card className="w-full border border-red-300 bg-red-50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-red-600">
            {/* {error} */}
            error
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

export default ErrorComponent;
