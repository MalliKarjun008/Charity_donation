import ProfileOptions from "@/components/profile/ProfileOptions";
import UserProfileCard from "@/components/profile/UserProfileCard";

function ViewProfile() {
  return (
    <div className="flex flex-col justify-center items-center bg-stone-300 p-5">
      <div className="bg-stone-400 w-[80%] h-full rounded-lg mt-10 m-auto p-10 flex justify-start gap-5">
        <div className="flex flex-col justify-center">
          <UserProfileCard />
        </div>
        <ProfileOptions />
      </div>
    </div>
  );
}

export default ViewProfile;
