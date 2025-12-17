import { Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "../user-avatar";
import { UserType } from "@/types/user";

export function ChatHeader({ user }: { user: Pick<UserType, "username" | "avatar"> }) {
  return (
    <div className="sticky top-0 flex items-center justify-between border-b px-4 py-3 bg-background/80 backdrop-blur z-10 rounded-xl">
      <div className="flex items-center gap-3">
        <UserAvatar user={user} />
        <div>
          <div className="text-sm font-semibold">{user.username}</div>
          <div className="text-xs text-muted-foreground">online</div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost">
          <Phone className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <Video className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
