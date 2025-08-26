import UserCard from "./userCard";
import { ScrollArea } from "../ui/scroll-area";
import ChatCard from "./ChatCard";
import { Input } from "../ui/input";

function UserInteractions() {
  return (
    <div className="flex h-full bg-stone-500 rounded-2xl gap-5 justify-start items-start p-4">
      <ScrollArea className="w-[33%] h-96 bg-stone-600 p-5 rounded-2xl">
        <div className="flex flex-col gap-4">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </ScrollArea>
      <ScrollArea className="bg-stone-200 w-[67%] h-96 rounded-xl">
        <div
          className="flex flex-col gap-4 px-3 relative
        "
        >
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
        </div>
        <div className="w-full mx-auto px-4 py-2 absolute bottom-0 bg-slate-300">
          <Input
            className="w-[95%] rounded-lg  bg-white shadow-md "
            placeholder="Type a message..."
          />
        </div>
      </ScrollArea>
    </div>
  );
}

export default UserInteractions;
