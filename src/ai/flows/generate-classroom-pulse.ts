
'use server';
/**
 * @fileOverview Generates a "classroom pulse" analysis based on student data.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { z } from 'genkit';

const PulseItemSchema = z.object({
  mbeCriterion: z.string().describe("The specific criterion from the 'Marco para la Buena Enseñanza' (MBE) that this observation relates to (e.g., 'A2', 'B1', 'C5')."),
  description: z.string().describe("A concise description of the observed strength or challenge."),
});

const ClassroomPulseInputSchema = z.object({
  students: z.array(z.custom<Partial<StudentDTO>>()).describe("An array of anonymized student profiles, including their qualities, relationships, and performance data."),
  language: z.string().describe("The language for the generated analysis (e.g., 'es' or 'en')."),
});

const ClassroomPulseOutputSchema = z.object({
  strengths: z.array(PulseItemSchema).describe("A list of 2-3 key strengths observed in the group."),
  challenges: z.array(PulseItemSchema).describe("A list of 2-3 potential challenges or areas for growth observed in the group."),
});
export type ClassroomPulseOutput = z.infer<typeof ClassroomPulseOutputSchema>;

export async function generateClassroomPulse(input: z.infer<typeof ClassroomPulseInputSchema>): Promise<ClassroomPulseOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateClassroomPulsePrompt',
      input: { schema: ClassroomPulseInputSchema },
      output: { schema: ClassroomPulseOutputSchema },
      prompt: `You are an expert pedagogical coach analyzing a classroom roster. Your task is to provide a "Classroom Pulse" summary, identifying collective strengths and potential challenges. For each point, you MUST cite the specific criterion from the Chilean 'Marco para la Buena Enseñanza' (MBE) that it relates to.

**Your response must be in the language: {{language}}**

**MBE Criteria Reference:**
- **A. Preparation:** A1, A2, A3, A4, A5
- **B. Environment:** B1, B2, B3, B4
- **C. Teaching:** C1, C2, C3, C4, C5, C6
- **D. Professionalism:** D1, D2, D3, D4, D5

**Student Data (Anonymized):**
{{#each students}}
- **{{name}}:** Qualities: {{#if qualities.length}}{{#each qualities}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}. Bad Relations: {{#if badRelations.length}}{{#each badRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}.
{{/each}}

**Your Task:**
Generate a JSON object with two keys: "strengths" and "challenges". Each key should contain an array of 2-3 objects. Each object must have:
1.  **mbeCriterion**: The specific MBE code (e.g., 'A2').
2.  **description**: A concise summary of the observation.

**Example:**
{
  "strengths": [
    {
      "mbeCriterion": "B1",
      "description": "The majority of students have positive relationships, suggesting a good general classroom climate."
    }
  ],
  "challenges": [
    {
      "mbeCriterion": "A2",
      "description": "There is a recurring conflict between Student A and Student C that may require intervention."
    }
  ]
}

Now, analyze the provided student data and generate the Classroom Pulse.`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output) {
      throw new Error("AI failed to generate a classroom pulse.");
  }
  return output;
}
