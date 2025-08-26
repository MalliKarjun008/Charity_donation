import { ZapIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function UserBadge({ role }) {
  return (
    <Badge className="bg-green-500 px-1 w-18">
      <ZapIcon
        className="-ms-0.5 opacity-60 text-black"
        size={12}
        aria-hidden="true"
      />
      <p className="text-black">{role}</p>
    </Badge>
  );
}
