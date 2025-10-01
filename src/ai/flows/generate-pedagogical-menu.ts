
'use server';
/**
 * @fileOverview Generates a pedagogical menu with different approaches for a class objective.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { z } from 'genkit';

const ActivitySchema = z.object({
    start: z.string().describe("A brief activity to begin the class and engage students."),
    development: z.string().describe("The main activity where the core learning happens."),
    closure: z.string().describe("A concluding activity to summarize learning and check for understanding."),
});

const ApproachSchema = z.object({
  title: z.string().describe("A creative and descriptive title for this pedagogical approach (e.g., 'Project-Based Inquiry', 'Gamified Challenge', 'Socratic Debate')."),
  activities: ActivitySchema.describe("The sequence of activities for this approach."),
  mbeJustification: z.string().describe("A justification explaining how this approach aligns with one or more criteria from the 'Marco para la Buena Enseñanza' (MBE). e.g., 'This approach fosters critical thinking (C8) and collaboration (B1)...'"),
  adaptationSuggestion: z.string().describe("A concrete suggestion on how to adapt one of the activities for a student with specific needs, referencing a hypothetical student from the provided list."),
});

const PedagogicalMenuInputSchema = z.object({
  objective: z.string().describe("The learning objective for the class."),
  language: z.string().describe("The language for the generated menu."),
  students: z.array(z.custom<Partial<StudentDTO>>()).describe("An array of anonymized student profiles to provide context for adaptations."),
  classContext: z.object({
    subject: z.string().optional(),
    ageOrGrade: z.string().optional(),
  }).describe("The general context of the class."),
});

const PedagogicalMenuOutputSchema = z.object({
  approaches: z.array(ApproachSchema).length(3).describe("A list of exactly 3 distinct pedagogical approaches."),
});
export type PedagogicalMenuOutput = z.infer<typeof PedagogicalMenuOutputSchema>;

export async function generatePedagogicalMenu(input: z.infer<typeof PedagogicalMenuInputSchema>): Promise<PedagogicalMenuOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generatePedagogicalMenuPrompt',
      input: { schema: PedagogicalMenuInputSchema },
      output: { schema: PedagogicalMenuOutputSchema },
      prompt: `You are an expert pedagogical designer. Your task is to create a "Pedagogical Menu" with three distinct, creative, and effective approaches for a given learning objective. Each approach must be justified based on the 'Marco para la Buena Enseñanza' (MBE) and include a specific adaptation suggestion.

**Your response must be in the language: {{language}}**

**Learning Objective:** "{{objective}}"

**Class Context:**
- **Subject:** {{#if classContext.subject}}{{classContext.subject}}{{else}}General{{/if}}
- **Age/Grade:** {{#if classContext.ageOrGrade}}{{classContext.ageOrGrade}}{{else}}Not specified{{/if}}

**Anonymized Student Roster (for adaptation context):**
{{#each students}}
- **{{name}}:** Qualities: {{#if qualities.length}}{{#each qualities}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}. Notes: {{#if notes}}{{notes}}{{/if}}{{#if disability}}{{disability}}{{/if}}{{#if neurodiversity}}{{neurodiversity}}{{/if}}.
{{/each}}

**Your Task:**
Generate a JSON object with an "approaches" array containing exactly 3 distinct pedagogical approaches. Each approach must have:
1.  **title**: A creative title for the approach (e.g., 'Gamified Challenge', 'Investigative Journalism').
2.  **activities**: An object with three keys: 'start', 'development', and 'closure', each describing a part of the lesson.
3.  **mbeJustification**: A concise justification linking the approach to specific MBE criteria (e.g., 'Fosters C5 by promoting critical thinking...').
4.  **adaptationSuggestion**: A concrete adaptation for one of the activities, referencing a hypothetical student's needs from the roster provided.

**Example:**
{
  "approaches": [
    {
      "title": "Investigative Journalism",
      "activities": {
        "start": "Present a controversial historical image related to the objective.",
        "development": "In groups, students act as journalists, analyzing primary sources to uncover 'the real story'.",
        "closure": "Each group presents a 1-minute news report summarizing their findings."
      },
      "mbeJustification": "This approach promotes critical thinking (C8) by analyzing sources and collaboration (B1) in groups.",
      "adaptationSuggestion": "For a student with ADHD like Student C, provide a structured 'reporter's notebook' with clear sections to guide their research and keep them on task."
    }
  ]
}

Now, generate the pedagogical menu for the given objective.`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output) {
      throw new Error("AI failed to generate a pedagogical menu.");
  }
  return output;
}
