import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const Empty = () => {
  return (
    <Card className="mx-auto mt-20 w-full max-w-md border-dashed border-2 border-muted/50 bg-background/30">
      <CardContent className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-semibold">No messages yet</h3>
        <p className="text-sm text-muted-foreground">
          Start the conversation by sending a message!
        </p>
      </CardContent>
    </Card>
  );
};

export default Empty;
