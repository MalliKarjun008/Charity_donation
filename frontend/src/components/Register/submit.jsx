import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        type="submit"
        variant="ghost"
        disabled={pending}
        className="bg-blue-500"
      >
        {pending ? "Submitting..." : "Submit"}
      </Button>
      <Button
        type="reset"
        variant="ghost"
        disabled={pending}
        className="bg-blue-500"
      >
        Reset
      </Button>
    </>
  );
}

export default Submit;
