
'use server';

/**
 * @fileOverview Generates starter ideas for a collaborative story.
 *
 * - `generateStoryStarters`: Creates a suggestion for characters and a setting.
 * - `GenerateStoryStartersInput`: The input type for the function.
 * - `GenerateStoryStartersOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const GenerateStoryStartersInputSchema = z.object({
  language: z.string().describe('The language for the generated ideas (e.g., "en" or "es").'),
  ageOrGrade: z.string().optional().describe("The age or grade level of the students. This is crucial for adapting the ideas' tone, complexity, and themes."),
});
export type GenerateStoryStartersInput = z.infer<typeof GenerateStoryStartersInputSchema>;

const GenerateStoryStartersOutputSchema = z.object({
  characters: z.string().describe("A comma-separated list of 2-3 creative main characters."),
  setting: z.string().describe("A creative and engaging initial setting for the story."),
});
export type GenerateStoryStartersOutput = z.infer<typeof GenerateStoryStartersOutputSchema>;


export async function generateStoryStarters(
  input: GenerateStoryStartersInput
): Promise<GenerateStoryStartersOutput> {
  const result = await generateStoryStartersFlow(input);
  if (!result?.characters) {
    return {
        characters: "A brave knight, a clever dragon",
        setting: "A dark and spooky cave",
    }
  }
  return result;
}

const generateStoryStartersFlow = async (input: GenerateStoryStartersInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateStoryStartersPrompt',
        input: { schema: GenerateStoryStartersInputSchema },
        output: { schema: GenerateStoryStartersOutputSchema },
        prompt: `You are a creative storyteller. Your task is to generate a set of engaging starter ideas for a collaborative story.
The ideas MUST be in the following language: {{language}}.
{{#if ageOrGrade}}The ideas must be appropriate for the following age/grade level: **{{ageOrGrade}}**.{{/if}}

Provide a comma-separated list of 2-3 main characters and an interesting initial setting. Be creative and age-appropriate.

**Example (language: en, ageOrGrade: "8 years old"):**
{
  "characters": "A curious robot, a talking squirrel",
  "setting": "A mysterious, abandoned toy factory"
}

**Example (language: es, ageOrGrade: "12 años"):**
{
  "characters": "Una pirata valiente, un loro mágico que habla, un fantasma tímido",
  "setting": "Una isla flotante hecha de caramelo que se está derritiendo"
}

Now, generate new story starter ideas in {{language}}.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};
