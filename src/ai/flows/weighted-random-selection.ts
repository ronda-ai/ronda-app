
'use server';

/**
 * @fileOverview Implements a weighted random student selection flow to promote balanced classroom participation.
 *
 * - `weightedRandomSelection`: A function that selects a student randomly based on participation weight.
 * - `WeightedRandomSelectionInput`: The input type for the weightedRandomSelection function.
 * - `WeightedRandomSelectionOutput`: The return type for the weightedRandomSelection function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import {z} from 'genkit';

const WeightedRandomSelectionInputSchema = z.object({
  studentNames: z
    .array(z.string())
    .describe("An array of student aliases in the class (e.g., 'Student A', 'Student B')."),
  participationCounts: z
    .array(z.number())
    .describe(
      'An array of participation counts for each student, corresponding to the studentNames array.'
    ),
});
export type WeightedRandomSelectionInput = z.infer<
  typeof WeightedRandomSelectionInputSchema
>;

const WeightedRandomSelectionOutputSchema = z.object({
  selectedStudent: z
    .string()
    .describe('The alias of the student selected randomly, based on weights.'),
});
export type WeightedRandomSelectionOutput = z.infer<
  typeof WeightedRandomSelectionOutputSchema
>;

export async function weightedRandomSelection(
  input: WeightedRandomSelectionInput
): Promise<WeightedRandomSelectionOutput> {
  return await weightedRandomSelectionFlow(input);
}

const weightedRandomSelectionFlow = async (input: WeightedRandomSelectionInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'weightedRandomSelectionPrompt',
        input: { schema: WeightedRandomSelectionInputSchema },
        output: { schema: WeightedRandomSelectionOutputSchema },
        prompt: `You are a helpful assistant for teachers. Given a list of student aliases and their corresponding participation counts, you will select one student at random, but in a weighted fashion. Students with lower participation counts should have a higher probability of being selected.

Student Aliases: {{studentNames}}
Participation Counts: {{participationCounts}}

Based on this data, select one student to call on next. Return ONLY the alias of the selected student. No other explanation is necessary. Make sure you select a valid student alias from the list of aliases. Do not add any additional text. Do not include any quotes around the student alias.`
    });

    const {output} = await prompt(input, {model});

    return output!;
};
