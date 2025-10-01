
'use server';
/**
 * @fileOverview Generates a brief summary of a classroom activity.
 *
 * - `generateActivitySummary`: Creates a concise summary of the provided text.
 * - `GenerateActivitySummaryInput`: The input type for the function.
 * - `GenerateActivitySummaryOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const GenerateActivitySummaryInputSchema = z.object({
  activityText: z.string().describe('The full text of the activity to be summarized.'),
  language: z.string().describe('The language for the generated summary (e.g., "en" or "es").'),
});
export type GenerateActivitySummaryInput = z.infer<typeof GenerateActivitySummaryInputSchema>;

const GenerateActivitySummaryOutputSchema = z.object({
  summary: z.string().describe('A very brief (one or two sentences) summary of the activity, capturing its core purpose.'),
});
export type GenerateActivitySummaryOutput = z.infer<typeof GenerateActivitySummaryOutputSchema>;

export async function generateActivitySummary(
  input: GenerateActivitySummaryInput
): Promise<GenerateActivitySummaryOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateActivitySummaryPrompt',
      input: { schema: GenerateActivitySummaryInputSchema },
      output: { schema: GenerateActivitySummaryOutputSchema },
      prompt: `You are an expert pedagogical assistant. Your task is to read the following classroom activity and summarize its core purpose in one or two concise sentences. The summary must be in the language: {{language}}.

**Activity Text:**
"""
{{activityText}}
"""

**Your Task:**
Generate a JSON object with a single key "summary" containing the very brief summary.

**Example:**
*Activity Text:* "Students will form groups of three. Each group will receive a historical document about the fall of the Roman Empire. They must read it, identify three main causes for the fall, and prepare a 2-minute presentation for the class."
*Output (JSON):*
{
  "summary": "Students will analyze a historical document in groups to identify and present the main causes of the fall of the Roman Empire."
}

Now, summarize the provided activity.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output?.summary) {
      // Fallback: truncate the original text if AI fails
      return { summary: input.activityText.substring(0, 150) + '...' };
  }

  return output;
}
