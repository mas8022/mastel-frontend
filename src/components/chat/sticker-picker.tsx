"use client";

import { SmilePlus, LucideProps } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StickerSuggestions } from "./sticker-suggestions";
import * as lucideIcons from "lucide-react";
import React from "react";

const allStickers: { name: string; Icon: React.FC<LucideProps> }[] = [
  { name: "ThumbsUp", Icon: lucideIcons.ThumbsUp },
  { name: "WandSparkles", Icon: lucideIcons.WandSparkles },
  { name: "PartyPopper", Icon: lucideIcons.PartyPopper },
  { name: "Heart", Icon: lucideIcons.Heart },
  { name: "Laugh", Icon: lucideIcons.Laugh },
  { name: "Smile", Icon: lucideIcons.Smile },
  { name: "Angry", Icon: lucideIcons.Angry },
  { name: "ThumbsDown", Icon: lucideIcons.ThumbsDown },
  { name: "Handshake", Icon: lucideIcons.Handshake },
  { name: "Gift", Icon: lucideIcons.Gift },
  { name: "Flame", Icon: lucideIcons.Flame },
  { name: "Rocket", Icon: lucideIcons.Rocket },
  { name: "Brain", Icon: lucideIcons.Brain },
  { name: "Lightbulb", Icon: lucideIcons.Lightbulb },
];

interface StickerPickerProps {
  message: string;
}

export function StickerPicker({ message }: StickerPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <SmilePlus className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 border-primary/20">
        <Tabs defaultValue="suggestions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <TabsContent value="suggestions">
            <StickerSuggestions message={message} />
          </TabsContent>
          <TabsContent value="all">
            <div className="grid grid-cols-4 gap-2 h-48 overflow-y-auto p-1">
              {allStickers.map(({ name, Icon }) => (
                <Button
                  key={name}
                  variant="ghost"
                  className="h-16 w-16 transition-transform hover:scale-110"
                  title={name}
                >
                  <Icon className="h-12 w-12 text-primary" />
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
