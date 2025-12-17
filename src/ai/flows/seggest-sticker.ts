"use server";

/**
 * @fileOverview A flow for suggesting animated stickers based on the current conversation.
 *
 * - suggestAnimatedStickers - A function that suggests animated stickers.
 * - AnimatedStickerSuggestionsInput - The input type for the suggestAnimatedStickers function.
 * - AnimatedStickerSuggestionsOutput - The return type for the suggestAnimatedStickers function.
 */

import { z } from "genkit";
import { ai } from "../genkit";

const AnimatedStickerSuggestionsInputSchema = z.object({
  conversationContext: z
    .string()
    .describe("The context of the current conversation."),
});
export type AnimatedStickerSuggestionsInput = z.infer<
  typeof AnimatedStickerSuggestionsInputSchema
>;

const AnimatedStickerSuggestionsOutputSchema = z.object({
  stickerSuggestions: z
    .array(z.string())
    .describe("An array of suggested animated sticker names."),
});
export type AnimatedStickerSuggestionsOutput = z.infer<
  typeof AnimatedStickerSuggestionsOutputSchema
>;

export async function suggestAnimatedStickers(
  input: AnimatedStickerSuggestionsInput
): Promise<AnimatedStickerSuggestionsOutput> {
  return suggestAnimatedStickersFlow(input);
}

const availableStickers = [
  "ThumbsUp",
  "WandSparkles",
  "PartyPopper",
  "Heart",
  "Laugh",
  "Smile",
  "Angry",
  "ThumbsDown",
  "Clap",
  "Handshake",
  "Gift",
  "Flame",
  "Rocket",
  "Brain",
  "Lightbulb",
  "Tada",
];

const prompt = ai.definePrompt({
  name: "animatedStickerSuggestionsPrompt",
  input: { schema: AnimatedStickerSuggestionsInputSchema },
  output: { schema: AnimatedStickerSuggestionsOutputSchema },
  prompt: `You are an AI assistant helping users find relevant stickers for their conversations.

  Based on the current conversation context, suggest a list of sticker names that would be appropriate and expressive.

  Conversation Context: {{{conversationContext}}}
  
  You MUST choose from the following list of available stickers:
  ${availableStickers.join(", ")}
  
  Return ONLY an array of sticker names, nothing else. Do not return any explanation or commentary.
  Your output must be a JSON array of strings.
  Example of valid output: ["ThumbsUp", "PartyPopper", "Laugh"]
  `,
});

const suggestAnimatedStickersFlow = ai.defineFlow(
  {
    name: "suggestAnimatedStickersFlow",
    inputSchema: AnimatedStickerSuggestionsInputSchema,
    outputSchema: AnimatedStickerSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
