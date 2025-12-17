import { UserType } from "@/types/user";
import { Button } from "../ui/button";
import Link from "next/link";

const FindUserCard = ({ user }: { user: UserType }) => {
  return (
    <Link href={`chat/${user.id}`}>
      <button
        className="
                  group flex w-full items-center gap-3
                  px-4 py-3 text-left
                  hover:bg-violet-800/40
                  transition
                "
      >
        <div className="h-9 w-9 shrink-0 rounded-full overflow-hidden border border-violet-500/30 bg-violet-900">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-medium text-violet-300">
              {user.username?.[0]?.toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="text-white text-sm font-medium group-hover:text-violet-300 transition">
            {user.username}
          </div>
          <div className="text-violet-400 text-xs">{user.phone}</div>
        </div>
      </button>
    </Link>
  );
};

export default FindUserCard;
