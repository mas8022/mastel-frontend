"use client";

import { useEffect, useState } from "react";
import * as icons from "lucide-react";
import { Button } from "../ui/button";
import { Loader2, Bot } from "lucide-react";
import { getStickerSuggestions } from "@/actions/seggest-sticker";

interface Props {
  message: string;
}

export function StickerSuggestions({ message }: Props) {
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message.trim().length <= 2) {
      setList([]);
      return;
    }

    setLoading(true);

    getStickerSuggestions({ conversationContext: message })
      .then(setList)
      .finally(() => setLoading(false));
  }, [message]);

  return (
    <div className="h-48">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Bot className="h-4 w-4" />
        AI Suggestions
      </div>

      {loading && (
        <div className="flex justify-center">
          <Loader2 className="animate-spin text-primary" />
        </div>
      )}

      {!loading && list.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {list.map((name) => {
            const Icon = (icons as any)[name];
            if (!Icon) return null;

            return (
              <Button key={name} variant="ghost" className="h-16 w-16">
                <Icon className="h-10 w-10 text-primary" />
              </Button>
            );
          })}
        </div>
      )}

      {!loading && list.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Type to get sticker ideas
        </p>
      )}
    </div>
  );
}
