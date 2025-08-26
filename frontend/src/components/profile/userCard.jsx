import { Card, CardContent } from "../ui/card";
import UserAvatar from "../user/userAvatar";

function UserCard() {
  return (
    <Card
      className={
        "w-full z-10 h-[3rem] bg-white shadow-lg flex justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300"
      }
    >
      <CardContent className={"flex justify-start items-center gap-5 w-full "}>
        <UserAvatar />
        <div className="flex justify-start items-center">
          <div className="text-md whitespace-nowrap text-gray-700 font-bold">
            User Name
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;
