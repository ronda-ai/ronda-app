
'use server';

/**
 * @fileOverview Generates a helpful prompt suggestion for the teacher.
 *
 * - `generatePromptSuggestion`: Creates a contextual suggestion for a positive or negative prompt.
 * - `GeneratePromptSuggestionInput`: The input type for the generatePromptSuggestion function.
 * - `GeneratePromptSuggestionOutput`: The return type for the generatePromptSuggestion function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const GeneratePromptSuggestionInputSchema = z.object({
  subject: z.string().optional().describe('The classroom subject (e.g., "History", "Science").'),
  ageOrGrade: z.string().optional().describe('The age group or grade of the students (e.g., "8 years old", "3rd Grade").'),
  country: z.string().optional().describe('The country the classroom is in, for cultural context.'),
  promptType: z.enum(['positive', 'negative']).describe('Whether to generate a positive custom prompt or a negative/avoidance prompt.'),
  language: z.string().describe('The language for the generated suggestion (e.g., "en" or "es").'),
});
export type GeneratePromptSuggestionInput = z.infer<typeof GeneratePromptSuggestionInputSchema>;

// This internal schema includes the boolean flag we'll use in the prompt.
const InternalPromptInputSchema = GeneratePromptSuggestionInputSchema.extend({
    isPositivePrompt: z.boolean(),
});

const GeneratePromptSuggestionOutputSchema = z.object({
  suggestion: z.string().describe('The generated prompt suggestion.'),
});
export type GeneratePromptSuggestionOutput = z.infer<typeof GeneratePromptSuggestionOutputSchema>;

export async function generatePromptSuggestion(
  input: GeneratePromptSuggestionInput
): Promise<GeneratePromptSuggestionOutput> {
  const result = await generatePromptSuggestionFlow(input);
  if (!result?.suggestion) {
    return {
      suggestion: "Try focusing on a specific skill for the next challenge."
    }
  }
  return result;
}

const generatePromptSuggestionFlow = async (input: GeneratePromptSuggestionInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    // Determine the boolean flag based on the input string.
    const isPositivePrompt = input.promptType === 'positive';
    
    const prompt = ai.definePrompt({
        name: 'generatePromptSuggestionPrompt',
        input: { schema: InternalPromptInputSchema },
        output: { schema: GeneratePromptSuggestionOutputSchema },
        prompt: `You are an expert educational assistant. Your goal is to help a teacher write a good instructional prompt for another AI.
Based on the provided classroom context, generate a helpful suggestion for the teacher's prompt.
The suggestion you generate MUST be in the following language: {{language}}

**Classroom Context:**
{{#if subject}}- **Current Subject:** {{subject}}{{/if}}
{{#if ageOrGrade}}- **Age/Grade Level:** {{ageOrGrade}}{{/if}}
{{#if country}}- **Country:** {{country}}{{/if}}

**Your Task:**
Generate a single, concise, and creative prompt suggestion based on the context.

{{#if isPositivePrompt}}
**Prompt Type:** Positive (A "Custom Prompt" to guide the AI's behavior)
**Instruction:** Generate a suggestion that tells the main AI what to focus on. It should be a positive instruction.
**Example (Subject: Science, Age: 10):** "Focus on hands-on experiments a 10-year-old can do at their desk."
**Example (Subject: History, Country: Mexico):** "Connect the challenge to a famous figure from Mexican history."
{{else}}
**Prompt Type:** Negative (A "Negative Prompt" to tell the AI what to avoid)
**Instruction:** Generate a suggestion that tells the main AI what to avoid. It should be a clear constraint.
**Example (Age: 7):** "Avoid using complex vocabulary or words with more than three syllables."
**Example (Subject: Art):** "Don't suggest challenges that require digital tools or screens."
{{/if}}

Please generate one suggestion now based on the provided context. Remember to respond in the correct language.
`
    });

    const { output } = await prompt({
        ...input,
        isPositivePrompt,
    }, {model});
    
    return output!;
};
