"use client";
import { Pencil } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";

const EditMessageBtn = () => {
  return (
    <ContextMenuItem
      className={`
          group
          flex items-center gap-3
          rounded-xl
          px-3 py-2.5
          text-sm
          transition-all
          text-zinc-100 focus:bg-white/10
        `}
    >
      <span
        className={`
            flex h-8 w-8 items-center justify-center
            rounded-lg
            bg-white/10 text-zinc-200
            group-focus:scale-95
            transition
          `}
      >
        <Pencil />
      </span>
      Edit
    </ContextMenuItem>
  );
};

export default EditMessageBtn;
