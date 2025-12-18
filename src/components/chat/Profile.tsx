"use client";

import { User } from "lucide-react";
import Link from "next/link";

const Profile = () => {
  return (
    <Link
      href={"/profile"}
      className="
        flex items-center justify-center
        h-8 w-8 rounded-full
        bg-violet-500/20
        ring-1 ring-violet-400/40
        transition-all duration-200
        hover:bg-violet-500/40
        hover:ring-violet-400
      "
    >
      <User className="h-4 w-4 text-violet-300" />
    </Link>
  );
};

export default Profile;
