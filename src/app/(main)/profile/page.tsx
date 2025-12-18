"use client";
import Form from "@/components/profile/Form";
import Setting from "@/components/profile/Setting";

const ProfilePage = () => {
  return (
    <div className="w-full min-h-screen h-full flex flex-col gap-3">
      <Form />
      <Setting />
    </div>
  );
};

export default ProfilePage;
