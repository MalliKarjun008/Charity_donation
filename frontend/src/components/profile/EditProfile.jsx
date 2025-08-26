import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionState } from "react";
import FileUploadInput from "@/utils/file-upload";
import SubmitButton from "@/utils/submitButton";

function EditProfileForm({ user = {} }) {
  const [profileImage, setProfileImage] = useState();

  const handleFormAction = (prevData, formData) => {
    console.log(formData.get("name"));

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    // onSave({
    //   name: formData.get("name"),
    //   email: formData.get("email"),
    //   phone: formData.get("phone"),
    //   profileImage: formData.get("profileImage"),
    //   bio: formData.get("bio"),
    // });

    return {
      enteredValues: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        profileImage: formData.get("profileImage"),
        bio: formData.get("bio"),
      },
      errors: null,
    };
  };
  const [formState, formAction] = useActionState(handleFormAction, {
    enteredValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      profileImage: user?.profileImage || "",
      bio: user?.bio || "",
    },
    errors: null,
  });

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={formState?.enteredValues.name}
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={formState?.enteredValues.email}
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={formState?.enteredValues.phone}
              placeholder="Enter your phone"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="profileImage">Profile Image URL</Label>
            <FileUploadInput
              name="profileImage"
              showSelection={true}
              onSelect={(file) => setProfileImage(file)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={formState?.enteredValues.bio}
              placeholder="Write something about yourself..."
            />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}

export default EditProfileForm;
