"use server";

import { AnimatedStickerSuggestionsInput, suggestAnimatedStickers } from "@/ai/flows/seggest-sticker";

export async function getStickerSuggestions(
  input: AnimatedStickerSuggestionsInput
) {
  try {
    const result = await suggestAnimatedStickers(input);
    return result.stickerSuggestions;
  } catch (error) {
    return [];
  }
}
