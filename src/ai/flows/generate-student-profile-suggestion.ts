
'use server';

/**
 * @fileOverview Generates helpful suggestions for a student's profile (qualities, fears, or notes).
 *
 * - `generateStudentProfileSuggestion`: Creates contextual suggestions for a student's profile fields.
 * - `GenerateStudentProfileSuggestionInput`: The input type for the function.
 * - `GenerateStudentProfileSuggestionOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { Gender } from '@/modules/student/domain/student.entity';
import { z } from 'genkit';

const GenerateStudentProfileSuggestionInputSchema = z.object({
  studentName: z.string().describe("The name of the student."),
  studentAge: z.number().optional().describe("The age of the student."),
  studentGender: z.custom<Gender>().optional().describe("The gender of the student."),
  language: z.string().describe('The language for the generated suggestion (e.g., "en" or "es").'),
  fieldType: z.enum(['qualities', 'fears', 'notes']).describe("The profile field for which to generate a suggestion."),
});
export type GenerateStudentProfileSuggestionInput = z.infer<typeof GenerateStudentProfileSuggestionInputSchema>;


const GenerateStudentProfileSuggestionOutputSchema = z.object({
  suggestion: z.string().describe('The generated, comma-separated suggestions.'),
});
export type GenerateStudentProfileSuggestionOutput = z.infer<typeof GenerateStudentProfileSuggestionOutputSchema>;


export async function generateStudentProfileSuggestion(
  input: GenerateStudentProfileSuggestionInput
): Promise<GenerateStudentProfileSuggestionOutput> {
  const result = await generateStudentProfileSuggestionFlow(input);
  if (!result?.suggestion) {
    return {
      suggestion: "Creative, Good listener"
    }
  }
  return result;
}

const generateStudentProfileSuggestionFlow = async (input: GenerateStudentProfileSuggestionInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateStudentProfileSuggestionPrompt',
        input: { schema: GenerateStudentProfileSuggestionInputSchema },
        output: { schema: GenerateStudentProfileSuggestionOutputSchema },
        prompt: `You are an expert educational psychologist helping a teacher fill out a student's profile.
Your task is to generate a short, comma-separated list of three plausible, age-appropriate suggestions for a specific field in the student's profile.
The suggestions you generate MUST be in the following language: {{language}}

**Student Information:**
{{#if studentAge}}- **Age:** {{studentAge}} years old{{/if}}
{{#if studentGender}}- **Gender:** {{studentGender}}{{/if}}

**Field to Generate Suggestions For:** {{fieldType}}

**Your Task:**
Based on the student's age, gender, and the target field, generate three creative and insightful suggestions.
Format your response as a single string with the suggestions separated by commas. Do not add a period at the end.

---
**Example (Field: qualities, Age: 6):**
Loves dinosaurs, Very observant, Good at sharing
---
**Example (Field: fears, Age: 9):**
Being called on in class, The dark, Not being picked for teams
---
**Example (Field: notes, Age: 7):**
Benefits from visual aids, Needs encouragement to speak up, Works well in small groups
---

Now, generate suggestions for the requested field.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};
