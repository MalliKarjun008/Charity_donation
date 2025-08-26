import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function DonarAvatar() {
  return (
    <Avatar className="w-40 h-40">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default DonarAvatar;
