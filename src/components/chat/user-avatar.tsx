import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ContactType } from "@/types/contact";

export function UserAvatar({ user }: { user: ContactType | undefined }) {
  return (
    <Avatar className={"border-2 border-background h-10 w-10"}>
      <AvatarImage src={user?.avatar!} alt={"user-avatar"} />
      <AvatarFallback className="font-bold bg-secondary text-secondary-foreground">
        {"mohammad".slice(0, 1)}
      </AvatarFallback>
    </Avatar>
  );
}
