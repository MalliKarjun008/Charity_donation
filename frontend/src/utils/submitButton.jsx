import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-[#007bff] text-white rounded-lg"
      disabled={pending}
    >
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

export default SubmitButton;
