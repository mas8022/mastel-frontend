"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import useGetMe from "@/hooks/useGetMe";
import useImagePreview from "@/hooks/useImagePreview";
import SecretFetch from "@/fetchers/SecretFetch";
import Loader from "../shared/Loader";
import { MoonLoader } from "react-spinners";

type FormValues = {
  username: string;
  bio: string;
  avatar: FileList | null;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      bio: "",
      avatar: null,
    },
  });

  const { data: me, isPending } = useGetMe();

  useEffect(() => {
    if (!me) return;
    setValue("username", me.username || "");
    setValue("bio", me.bio || "");
  }, [me, setValue]);

  const avatarFile = watch("avatar");
  const imagePreview = useImagePreview(avatarFile);

  const submit = async (data: FormValues) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("bio", data.bio);

    if (data.avatar?.[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    await SecretFetch.put("/users/profile", formData);
  };

  if (isPending) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full flex flex-col items-center gap-4"
    >
      {/* ===== Avatar ===== */}
      <label htmlFor="profile-file" className="cursor-pointer">
        <Avatar className="size-20">
          <AvatarImage src={imagePreview || me?.avatar} />
          <AvatarFallback className="bg-violet-500/20 text-violet-300">
            <User size={40} strokeWidth={1} />
          </AvatarFallback>
        </Avatar>

        <Input
          id="profile-file"
          type="file"
          accept="image/*"
          hidden
          {...register("avatar")}
        />
      </label>

      {/* ===== Username ===== */}
      <div className="w-full space-y-1">
        <Label>Username</Label>
        <Input {...register("username")} />
      </div>

      {/* ===== Bio ===== */}
      <div className="w-full space-y-1">
        <Label>Bio</Label>
        <Textarea rows={3} {...register("bio")} />
      </div>

      <Button type="submit" className="w-full">
        {isSubmitting ? <MoonLoader size={18} /> : "Save Changes"}
      </Button>
    </form>
  );
};

export default Form;
