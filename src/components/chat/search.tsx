"use client";

import { Search as SearchIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import useFindUsers from "@/hooks/useFindUsers";
import SearchResult from "./search-result";

const Search = () => {
  const { search, setSearch, data: users, isPending } = useFindUsers();

  return (
    <div className="relative">
      {/* Icon */}
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-400" />

      {/* Input */}
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by username or phone..."
        className="
          pl-9
          bg-violet-950/60
          border border-violet-500/30
          text-white
          placeholder:text-violet-400
          focus-visible:ring-purple-500/60
        "
      />

      <SearchResult isPending={isPending} users={users} />
    </div>
  );
};

export default Search;
