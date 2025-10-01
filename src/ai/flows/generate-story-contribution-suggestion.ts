
'use server';

/**
 * @fileOverview Generates a single coherent idea to continue a collaborative story.
 *
 * - `generateStoryContributionSuggestion`: Creates a new suggestion.
 * - `GenerateStoryContributionSuggestionInput`: The input type for the function.
 * - `GenerateStoryContributionSuggestionOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const GenerateStoryContributionSuggestionInputSchema = z.object({
  characters: z.array(z.string()).describe("The main characters of the story."),
  setting: z.string().describe("The initial setting or scene."),
  language: z.string().describe('The language for the generated suggestion (e.g., "en" or "es").'),
  previousChapters: z.array(z.string()).optional().describe("A list of the previous chapters of the story, in order."),
  currentContributions: z.array(z.string()).optional().describe("A list of ideas already proposed by students for the *next* chapter. Your suggestion must be different from these."),
});
export type GenerateStoryContributionSuggestionInput = z.infer<typeof GenerateStoryContributionSuggestionInputSchema>;


const GenerateStoryContributionSuggestionOutputSchema = z.object({
  suggestion: z.string().describe("A single, creative, and coherent sentence to suggest as the next event in the story."),
});
export type GenerateStoryContributionSuggestionOutput = z.infer<typeof GenerateStoryContributionSuggestionOutputSchema>;


export async function generateStoryContributionSuggestion(
  input: GenerateStoryContributionSuggestionInput
): Promise<GenerateStoryContributionSuggestionOutput> {
  const result = await generateStoryContributionSuggestionFlow(input);
  if (!result?.suggestion) {
    return {
        suggestion: "A mysterious key falls from the sky.",
    }
  }
  return result;
}

const generateStoryContributionSuggestionFlow = async (input: GenerateStoryContributionSuggestionInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateStoryContributionSuggestionPrompt',
        input: { schema: GenerateStoryContributionSuggestionInputSchema },
        output: { schema: GenerateStoryContributionSuggestionOutputSchema },
        prompt: `You are an expert storyteller and a creative student in a classroom, brainstorming the next step for a collaborative story.
Your task is to suggest ONE single, creative, and coherent sentence that logically continues the story from where it left off, making it more exciting.
The suggestion MUST be in the following language: **{{language}}**.

**Your Creative Principles:**
1.  **Build on the Hook:** Your idea must directly address the last sentence or question of the most recent chapter. What is a surprising answer or consequence?
2.  **Introduce a Twist:** Suggest something unexpected. A new character appears, an object behaves strangely, or the setting changes.
3.  **Create a Problem:** Propose a new, small obstacle for the characters to overcome.
4.  **Be Coherent:** Your idea must make sense within the context of the story created so far.

**Story Context:**
- **Characters:** {{#each characters}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- **Setting:** {{setting}}

**The Story So Far (Pay close attention to the end of the last chapter):**
{{#if previousChapters.length}}
{{#each previousChapters}}
---
{{{this}}}
---
{{/each}}
{{else}}
This is the very first chapter, so your suggestion will set the initial action!
{{/if}}

{{#if currentContributions.length}}
**Ideas already suggested by other students for the next part (DO NOT REPEAT THESE):**
{{#each currentContributions}}
- "{{{this}}}"
{{/each}}
{{/if}}

**Your Task:**
Read the story, especially the last chapter's ending, and the existing ideas. Now, generate ONE new, creative, and short sentence that follows the principles above to continue the story.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};
