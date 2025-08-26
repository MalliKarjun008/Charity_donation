import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProfileForm from "./EditProfile";
import UserInteractions from "./UserInteractions";

function ProfileOptions() {
  return (
    <Tabs defaultValue="My donations" className="w-full">
      <TabsList className="w-full h-10 p-2 bg-stone-600 border-none flex justify-between text-sm font-medium rounded-xl">
        <TabsTrigger
          value="My donations"
          className="text-white data-[state=active]:text-stone-600 data-[state=active]:font-bold"
        >
          My donations
        </TabsTrigger>
        <TabsTrigger
          value="saved donations"
          className="text-white data-[state=active]:text-stone-600 data-[state=active]:font-bold"
        >
          Saved donations
        </TabsTrigger>
        <TabsTrigger
          value="interactions"
          className="text-white data-[state=active]:text-stone-600 data-[state=active]:font-bold"
        >
          Interactions
        </TabsTrigger>
        <TabsTrigger
          value="liked"
          className="text-white data-[state=active]:text-stone-600 data-[state=active]:font-bold"
        >
          Liked
        </TabsTrigger>
        <TabsTrigger
          value="Edit"
          className="text-white data-[state=active]:text-stone-600 data-[state=active]:font-bold"
        >
          Edit
        </TabsTrigger>
      </TabsList>

      <TabsContent value="My donations">
        <div>My donations options</div>
      </TabsContent>
      <TabsContent value="saved donations">
        <div>Saved donations options</div>
      </TabsContent>
      <TabsContent value="interactions">
        <UserInteractions />
      </TabsContent>
      <TabsContent value="liked">
        <div>Liked options</div>
      </TabsContent>
      <TabsContent className="w-full h-full mt-3" value="Edit">
        <EditProfileForm />
      </TabsContent>
    </Tabs>
  );
}

export default ProfileOptions;
