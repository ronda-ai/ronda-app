
'use server';
/**
 * @fileOverview Generates a suggested safety role for a student within a committee.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const StudentProfileSchema = z.object({
  id: z.string(),
  name: z.string().describe("The student's anonymized alias (e.g., 'Student A')."),
  qualities: z.array(z.string()).describe("The student's interests and strengths."),
  fears: z.array(z.string()).optional().describe("A list of the student's fears."),
});

const GenerateSafetyRoleSuggestionInputSchema = z.object({
  committeeName: z.string().describe("The name of the safety committee or brigade."),
  student: StudentProfileSchema.describe("The student for whom to suggest a role."),
  language: z.string().describe('The language for the generated suggestion (e.g., "en" or "es").'),
});

const GenerateSafetyRoleSuggestionOutputSchema = z.object({
  role: z.string().describe("A specific, safety-relevant role for this member (e.g., 'First Aid Lead', 'Communications Officer')."),
  justification: z.string().describe("A brief, evidence-based reason why this student is a good fit for this role, referencing their qualities."),
});

export async function generateSafetyRoleSuggestion(
  input: z.infer<typeof GenerateSafetyRoleSuggestionInputSchema>
): Promise<z.infer<typeof GenerateSafetyRoleSuggestionOutputSchema>> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateSafetyRoleSuggestionPrompt',
      input: { schema: GenerateSafetyRoleSuggestionInputSchema },
      output: { schema: GenerateSafetyRoleSuggestionOutputSchema },
      prompt: `You are an expert school safety coordinator. Your task is to suggest a practical and relevant safety role for a student being added to a specific brigade.
Your response MUST be in the specified language: {{language}}.

**Brigade:** "{{committeeName}}"
**Student to Assign:**
- **{{student.name}}:** Qualities: {{#if student.qualities.length}}{{#each student.qualities}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}. Fears: {{#if student.fears.length}}{{#each student.fears}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}.

**Your Task:**
Based on the student's qualities and the brigade's likely purpose, generate a JSON object with two keys: "role" and "justification".

1.  **role**: Suggest a single, practical role. Examples: 'Evacuation Leader', 'First Aid Officer', 'Communicator', 'Emotional Support', 'Safety Inspector'.
2.  **justification**: Provide a brief, clear reason why this student is a good fit for the role, linking it to their listed qualities.

**Example:**
*Committee: "First Aid Brigade"*
*Student: "Student A", Qualities: 'calm', 'organized'*
{
  "role": "First Aid Kit Manager",
  "justification": "Their 'calm' and 'organized' qualities are perfect for maintaining and distributing first aid supplies in an orderly manner during a crisis."
}

Now, generate the role suggestion.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output) {
    throw new Error("AI failed to generate a valid role suggestion.");
  }

  return output;
}
