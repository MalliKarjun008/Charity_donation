import UserAvatar from "@/components/user/userAvatar";
import UserBadge from "./UserBadge";

function UserProfileCard() {
  return (
    <div className="bg-stone-500 text-white flex flex-col w-52 h-80 items-center rounded-lg p-5">
      <UserAvatar className="w-40 h-40" />
      <h1 className="text-2xl font-bold font-sans text-white">John Doe</h1>
      <p className="text-sm text-white font-serif font-bold">
        johndoe@example.com
      </p>
      <div className="mt-3 flex flex-col justify-start items-start">
        <p className="text-sm font-serif font-bold text-white">
          contact: +1234567890
        </p>
        <p className="text-sm font-serif font-bold text-white">
          DOB: 01-01-2000
        </p>
        <UserBadge role="donar" />
      </div>
    </div>
  );
}

export default UserProfileCard;
