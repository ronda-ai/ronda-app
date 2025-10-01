
'use server';

/**
 * @fileOverview Generates an adjusted strategy to help a single student with their social integration, based on an existing strategy and new teacher feedback.
 *
 * - `generateAdjustedIndividualStrategy`: Creates a contextual, actionable strategy.
 * - `GenerateAdjustedIndividualStrategyInput`: The input type for the function.
 * - `GenerateAdjustedIndividualStrategyOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';
import { IndividualRelationshipStrategyDTO } from '@/modules/individual-relationship-strategy/application/dtos/individual-relationship-strategy.dto';

const StudentSchemaForZod = z.object({
    name: z.string().describe("A generic alias for the student, like 'Student A'."),
    qualities: z.array(z.string()),
    age: z.number().optional(),
    gender: z.enum(['female', 'male', 'non-binary', 'other', 'prefer-not-to-say']).optional(),
    notes: z.string().optional(),
    fears: z.array(z.string()).optional(),
    disability: z.string().optional(),
    neurodiversity: z.string().optional(),
    goodRelations: z.array(z.string()).optional().describe("Aliases of students this student gets along with."),
    badRelations: z.array(z.string()).optional().describe("Aliases of students this student has conflicts with."),
});

const GenerateAdjustedIndividualStrategyInputSchema = z.object({
  student: StudentSchemaForZod.describe("The student for whom the strategy is being generated."),
  language: z.string().describe('The language for the generated strategy (e.g., "en" or "es").'),
  focus: z.string().describe("The primary skill or goal for the strategy (e.g., 'Initiating conversations', 'Finding common interests')."),
  existingStrategy: z.custom<IndividualRelationshipStrategyDTO>().describe("The existing strategy to adjust or refine."),
  customPrompt: z.string().describe("The teacher's new instruction on how to adjust the strategy."),
});
export type GenerateAdjustedIndividualStrategyInput = z.infer<typeof GenerateAdjustedIndividualStrategyInputSchema>;

const StrategyStepSchema = z.object({
    text: z.string().describe("A single, concrete, and actionable step in the strategy."),
});

const GenerateAdjustedIndividualStrategyOutputSchema = z.object({
  title: z.string().describe("A creative and encouraging title for the strategy."),
  rationale: z.string().describe("A brief explanation of the psychological or pedagogical reasoning behind this strategy."),
  steps: z.array(StrategyStepSchema).min(2).max(4).describe('An array of 2 to 4 concrete, actionable steps for the support plan.'),
});
export type GenerateAdjustedIndividualStrategyOutput = z.infer<typeof GenerateAdjustedIndividualStrategyOutputSchema>;

export async function generateAdjustedIndividualStrategy(
  input: GenerateAdjustedIndividualStrategyInput
): Promise<GenerateAdjustedIndividualStrategyOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  const prompt = ai.definePrompt({
      name: 'generateAdjustedIndividualStrategyPrompt',
      input: { schema: GenerateAdjustedIndividualStrategyInputSchema },
      output: { schema: GenerateAdjustedIndividualStrategyOutputSchema },
      prompt: `You are a world-class child psychologist and an expert in social-emotional learning (SEL). Your task is to REFINE an existing strategy to help a single student improve their social integration. The teacher has provided feedback on what to change.

**CRITICAL INSTRUCTION: Your entire response MUST be generated in the following language: {{language}}. This is the most important instruction and must not be broken under any circumstances.**

**Core Principles:**
1.  **Analyze and Adapt:** Do not create a new strategy from scratch. Read the existing strategy and the teacher's adjustment request, then modify the steps accordingly.
2.  **Leverage Strengths:** Use the student's qualities and interests as a bridge for social interaction.
3.  **Respect Comfort Zones:** Be mindful of listed fears and notes. Strategies should be low-stakes and build confidence gradually.

---
**Existing Strategy to Adjust:**
- **Title:** {{existingStrategy.title}}
- **Rationale:** {{existingStrategy.rationale}}
- **Current Steps:**
{{#each existingStrategy.steps}}
  - {{this.text}} (Status: {{this.status}})
{{/each}}

**Teacher's Adjustment Request (CRITICAL):** You MUST modify the strategy based on this instruction: "{{customPrompt}}".

---

**Student to Support:**
- **Alias:** {{student.name}}
- **Age/Gender:** {{student.age}} years old, {{student.gender}}
- **Qualities/Interests:** {{#if student.qualities.length}}{{#each student.qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
- **Fears/Anxieties:** {{#if student.fears.length}}{{#each student.fears}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
- **Teacher's Notes:** {{#if student.notes}}{{student.notes}}{{else}}None listed{{/if}}
---

**Your Task:**
Generate a JSON object with three keys: "title", "rationale", and "steps".
1.  **title:** Keep the original title, or slightly modify it if the adjustment is significant.
2.  **rationale:** Briefly explain how the *new* version of the strategy addresses the teacher's adjustment request.
3.  **steps:** An array of 2 to 4 objects, each with a "text" key containing a single, clear, actionable step for the teacher to take. These steps should be a REFINED version of the original ones.

Now, generate the adjusted strategy for **{{student.name}}** based on the teacher's feedback.
`,
  });

  const { output } = await prompt(input, {model});
  if (!output?.steps || output.steps.length === 0) {
    throw new Error("AI failed to generate a valid strategy.");
  }
  return output;
}
