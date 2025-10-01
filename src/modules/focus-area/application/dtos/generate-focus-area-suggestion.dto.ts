
import { z } from 'zod';

export const GenerateFocusAreaSuggestionInputSchema = z.object({
  language: z.string().describe('The language for the generated suggestions (e.g., "en" or "es").'),
  existingFocusAreas: z.array(z.string()).describe("A list of focus areas that already exist and should not be suggested again."),
  classContext: z.string().optional().describe("The current academic topic or context of the class (e.g., 'Writing a historical essay', 'Preparing for a science fair')."),
  customPrompt: z.string().optional().describe('An additional instruction from the teacher to guide the AI, which MUST be followed. This is the most important instruction.'),
});
export type GenerateFocusAreaSuggestionInput = z.infer<typeof GenerateFocusAreaSuggestionInputSchema>;

export const GenerateFocusAreaSuggestionOutputSchema = z.object({
  suggestions: z.array(z.string()).min(2).max(3).describe('A list of 2 to 3 new, relevant, and practical focus area suggestions for language support.'),
});
export type GenerateFocusAreaSuggestionOutput = z.infer<typeof GenerateFocusAreaSuggestionOutputSchema>;
