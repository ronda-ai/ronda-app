
'use server';
/**
 * @fileOverview Generates a structured safety brigade based on a specific objective and criteria.
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

const GenerateSafetyBrigadeInputSchema = z.object({
  objective: z.string().describe("The main goal of the safety brigade."),
  criteria: z.enum(['calm-under-pressure', 'leadership-potential']).describe("The key criteria for selecting members."),
  students: z.array(StudentProfileSchema).describe("The list of all available students in the class."),
  language: z.string().describe('The language for the generated brigade plan (e.g., "en" or "es").'),
});

const BrigadeMemberSchema = z.object({
  studentAlias: z.string().describe("The alias of the student assigned to this role (e.g., 'Student A')."),
  role: z.string().describe("A specific, safety-relevant role for this member (e.g., 'First Aid Lead', 'Communications Officer')."),
  justification: z.string().describe("A brief, evidence-based reason why this student is a good fit for this role, referencing their qualities."),
});

const BrigadeSchema = z.object({
  name: z.string().describe("A creative and descriptive name for the brigade (e.g., 'The Guardians', 'The First Responders')."),
  members: z.array(BrigadeMemberSchema).describe("An array of the members in this brigade, each with an assigned role."),
  rationale: z.string().describe("A brief explanation of the strategic thinking behind the brigade's composition, referencing the selected grouping criteria."),
});

const GenerateSafetyBrigadeOutputSchema = z.object({
  brigade: BrigadeSchema,
});


export async function generateSafetyBrigade(
  input: z.infer<typeof GenerateSafetyBrigadeInputSchema>
): Promise<z.infer<typeof GenerateSafetyBrigadeOutputSchema>> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateSafetyBrigadePrompt',
      input: { schema: GenerateSafetyBrigadeInputSchema },
      output: { schema: GenerateSafetyBrigadeOutputSchema },
      prompt: `You are an expert school safety coordinator and team builder. Your task is to form an optimal safety brigade from a list of students based on a specific objective and criteria.

**CRITICAL INSTRUCTION:** Your entire response MUST be in the specified language: {{language}}.

**Brigade Objective:** "{{objective}}"
**Grouping Criteria:** "{{criteria}}"

**Available Students:**
{{#each students}}
- **{{name}}:** Qualities: {{#if qualities.length}}{{#each qualities}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}. Fears: {{#if fears.length}}{{#each fears}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}.
{{/each}}

**Your Task:**
Generate a JSON object containing a single "brigade" object. This brigade should be composed of 3 to 5 students from the provided list who best fit the criteria.

1.  **Brigade Name:** Create a fitting and inspiring name for the brigade.
2.  **Members:** For each selected student, assign a specific role and provide a clear justification based on their qualities.
    - **Roles** should be practical, such as 'Líder de Evacuación' (Evacuation Leader), 'Encargado de Primeros Auxilios' (First Aid Officer), 'Comunicador' (Communicator), or 'Apoyo Emocional' (Emotional Support).
    - **Justification** should connect a student's qualities to their assigned role.
3.  **Rationale:** Write a brief explanation for why this group of students was chosen, based on the "{{criteria}}" criteria.

**Criteria Guidelines:**
- **'calm-under-pressure':** Prioritize students with qualities like 'calm', 'focused', 'resilient'.
- **'leadership-potential':** Prioritize students with qualities like 'leader', 'organized', 'responsible', 'communicative'.

Example Output:
{
  "brigade": {
    "name": "The Sentinels",
    "members": [
      {
        "studentAlias": "Student A",
        "role": "Team Leader",
        "justification": "Their 'leader' and 'organized' qualities make them ideal for coordinating the team's efforts."
      },
      {
        "studentAlias": "Student C",
        "role": "First Aid Specialist",
        "justification": "Known for being 'calm' and 'caring', which are essential for providing first aid."
      }
    ],
    "rationale": "This team was formed based on the 'leadership-potential' criteria, selecting students who have demonstrated responsibility and communication skills."
  }
}

Now, generate the safety brigade.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output?.brigade) {
    throw new Error("AI failed to generate a valid brigade.");
  }

  return output;
}
