
'use server';
/**
 * @fileOverview Generates a digital conviviality pact for a classroom.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'zod';

const PrincipleSchema = z.object({
    title: z.string().describe("The name of the principle (e.g., 'Respect', 'Empathy')."),
    description: z.string().describe("A brief, positive explanation of what the principle means in a digital context."),
});

const NormSchema = z.object({
    principle: z.string().describe("The title of the principle it relates to."),
    norm: z.string().describe("The concrete rule or expected behavior (e.g., 'We will use respectful language in chats, avoiding insults or irony that could hurt.')."),
});

const ConsequenceSchema = z.object({
    level: z.number().describe("The level number (1, 2, 3)."),
    description: z.string().describe("A description of the type of infraction."),
    restorativeAction: z.string().describe("The corresponding action to be taken (e.g., 'Private conversation with the teacher to reflect on the impact of the action.')."),
});

const GenerateDigitalPactInputSchema = z.object({
  language: z.string().describe('The language for the generated pact (e.g., "en" or "es").'),
  studentCount: z.number().describe("The number of students in the class."),
  ageOrGrade: z.string().optional().describe('The age or grade level of the students, for context.'),
  classInterests: z.array(z.string()).optional().describe("A list of the class's general interests."),
  mainConcerns: z.array(z.string()).optional().describe('A list of main concerns the teacher has regarding digital conviviality (e.g., "use of social media", "respect for privacy").'),
});
export type GenerateDigitalPactInput = z.infer<typeof GenerateDigitalPactInputSchema>;

const GenerateDigitalPactOutputSchema = z.object({
  title: z.string().describe("A creative and inspiring title for the pact."),
  principles: z.array(PrincipleSchema).min(3).max(4).describe('An array of 3-4 guiding principles.'),
  norms: z.array(NormSchema).min(5).max(7).describe('An array of 5-7 specific, actionable norms.'),
  consequences: z.array(ConsequenceSchema).length(3).describe("An array of 3 levels of restorative consequences."),
});
export type GenerateDigitalPactOutput = z.infer<typeof GenerateDigitalPactOutputSchema>;

export async function generateDigitalPact(
  input: GenerateDigitalPactInput
): Promise<GenerateDigitalPactOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateDigitalPactPrompt',
      input: { schema: GenerateDigitalPactInputSchema },
      output: { schema: GenerateDigitalPactOutputSchema },
      prompt: `You are an expert in pedagogy and digital citizenship. Your task is to create a draft for a "Digital Conviviality Pact" for a classroom. The pact should be structured, positive, and serve as a starting point for discussion, not a final imposition.

**CRITICAL INSTRUCTION:** Your entire response MUST be generated in the language: {{language}}.

**Classroom Context:**
- **Number of Students:** {{studentCount}}
- **Age/Grade Level:** {{#if ageOrGrade}}{{ageOrGrade}}{{else}}Middle School (12-14 years old){{/if}}
- **Main Concerns:** {{#if mainConcerns.length}}{{#each mainConcerns}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}General online behavior{{/if}}
- **Class Interests:** {{#if classInterests.length}}{{#each classInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}General{{/if}}

**Your Task:**
Generate a JSON object with three keys: "title", "principles", "norms", and "consequences".

1.  **title**: A creative and inspiring title for the pact.
2.  **principles**: An array of 3-4 guiding principles. Each principle object must have:
    - **title**: The name of the principle (e.g., 'Respect', 'Empathy').
    - **description**: A brief, positive explanation of what the principle means in a digital context.
3.  **norms**: An array of 5-7 specific, actionable norms. Each norm object must have:
    - **principle**: The title of the principle it relates to.
    - **norm**: The concrete rule or expected behavior (e.g., 'We will use respectful language in chats, avoiding insults or irony that could hurt.').
4.  **consequences**: An array of 3 levels of restorative consequences. These should focus on learning and repairing harm, not just punishment. Each consequence object must have:
    - **level**: The level number (1, 2, 3).
    - **description**: A description of the type of infraction.
    - **restorativeAction**: The corresponding action to be taken (e.g., 'Private conversation with the teacher to reflect on the impact of the action.').

Now, generate the Digital Conviviality Pact.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output?.title) {
      throw new Error("AI failed to generate a valid pact.");
  }
  
  return output;
}
