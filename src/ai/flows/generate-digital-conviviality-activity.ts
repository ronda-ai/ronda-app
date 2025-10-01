
'use server';

/**
 * @fileOverview Generates a digital citizenship activity.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'zod';

const ActivityTypeSchema = z.enum(['netiquette-challenge', 'digital-collaboration', 'positive-messaging']);
export type ActivityType = z.infer<typeof ActivityTypeSchema>;

const GenerateDigitalConvivialityActivityInputSchema = z.object({
  language: z.string().describe('The language for the generated activity (e.g., "en" or "es").'),
  activityType: ActivityTypeSchema.describe('The specific type of digital citizenship activity to generate.'),
  ageOrGrade: z.string().optional().describe('The age or grade level of the students, for context (e.g., "12 years old", "7th Grade").'),
  classInterests: z.array(z.string()).optional().describe('A list of general interests for the whole class, to make the activity more engaging.'),
  customPrompt: z.string().optional().describe('An additional, specific instruction from the teacher to guide the AI, which MUST be followed.'),
});
export type GenerateDigitalConvivialityActivityInput = z.infer<typeof GenerateDigitalConvivialityActivityInputSchema>;


const GenerateDigitalConvivialityActivityOutputSchema = z.object({
  title: z.string().describe("A short, engaging title for the activity."),
  introduction: z.string().describe("A brief introduction to the activity, explaining its purpose in one or two sentences."),
  materials: z.array(z.string()).optional().describe("A list of materials needed for the activity."),
  pedagogicalObjectives: z.array(z.string()).describe("A list of 2-4 key pedagogical objectives."),
  steps: z.array(z.string()).describe("A numbered list of clear, step-by-step instructions for the teacher to follow."),
  studentInstructions: z.string().describe("Clear, concise instructions for the students."),
});
export type GenerateDigitalConvivialityActivityOutput = z.infer<typeof GenerateDigitalConvivialityActivityOutputSchema>;


export async function generateDigitalConvivialityActivity(
  input: GenerateDigitalConvivialityActivityInput
): Promise<GenerateDigitalConvivialityActivityOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateDigitalConvivialityActivityPrompt',
      input: { schema: GenerateDigitalConvivialityActivityInputSchema },
      output: { schema: GenerateDigitalConvivialityActivityOutputSchema },
      prompt: `You are an expert in digital citizenship education for modern classrooms. Your task is to generate a single, creative, and practical classroom activity focused on online behavior and digital wellness. The activity must be engaging and age-appropriate.

**CRITICAL INSTRUCTION:** Your entire response MUST be generated in the language: {{language}}.

**Activity Type to Generate:** {{activityType}}

**Classroom Context:**
- **Age/Grade Level:** {{#if ageOrGrade}}{{ageOrGrade}}{{else}}Not specified (assume middle school){{/if}}
- **Class Interests:** {{#if classInterests.length}}{{#each classInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Not specified{{/if}}

{{#if customPrompt}}
**Teacher's Specific Request (High Priority):** "{{customPrompt}}". You must tailor the activity to meet this goal.
{{/if}}

**Your Task:**
Generate a JSON object with the following structured keys: "title", "introduction", "materials", "pedagogicalObjectives", "steps", and "studentInstructions".

1.  **title**: A creative and catchy title for the activity.
2.  **introduction**: A brief, one or two-sentence paragraph introducing the activity's purpose.
3.  **materials**: An array of strings listing any materials needed (e.g., ["Whiteboard", "Markers"]). If no materials are needed, provide an empty array.
4.  **pedagogicalObjectives**: An array of 2-4 strings, each describing a key learning goal.
5.  **steps**: An array of strings, where each string is a single, clear, step-by-step instruction for the teacher.
6.  **studentInstructions**: A single string containing the clear, simple instructions that the teacher will give directly to the students.

**Activity Type Guidelines:**
-   **netiquette-challenge**: Create a hypothetical scenario (e.g., a confusing group chat message). The activity should involve analyzing and rewriting the message.
-   **digital-collaboration**: Design a short micro-game where students collaborate using a digital tool.
-   **positive-messaging**: Generate 2-3 examples of ambiguous or negative digital messages for students to rewrite positively.

Now, generate the structured digital citizenship activity based on the specified type and context.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output?.title) {
      throw new Error("AI failed to generate a valid activity.");
  }
  
  return output;
}
