import { UserType } from "@/types/user";
import { Loader2 } from "lucide-react";
import FindUserCard from "./FindUserCard";

const SearchResult = ({
  isPending,
  users,
}: {
  isPending: boolean;
  users: UserType[] | undefined;
}) => {
  return (
    isPending ||
    (users?.length ? (
      <div
        className="
            absolute z-50 mt-2 w-full
            rounded-xl
            bg-violet-950/80
            border border-violet-500/30
            backdrop-blur-xl
            overflow-hidden
            shadow-lg shadow-violet-900/30
          "
      >
        {isPending && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
          </div>
        )}

        {!isPending &&
          users?.map((user) => <FindUserCard key={user.id} user={user} />)}
      </div>
    ) : null)
  );
};

export default SearchResult;
