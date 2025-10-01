

'use server';

/**
 * @fileOverview Generates a strategy to help a single student with their social integration.
 *
 * - `generateIndividualRelationshipStrategy`: Creates a contextual, actionable strategy.
 * - `GenerateIndividualRelationshipStrategyInput`: The input type for the function.
 * - `GenerateIndividualRelationshipStrategyOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

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

const GenerateIndividualRelationshipStrategyInputSchema = z.object({
  student: StudentSchemaForZod.describe("The student for whom the strategy is being generated."),
  language: z.string().describe('The language for the generated strategy (e.g., "en" or "es").'),
  focus: z.string().describe("The primary skill or goal for the strategy (e.g., 'Initiating conversations', 'Finding common interests')."),
  customPrompt: z.string().optional().describe("An optional, specific instruction from the teacher to guide the AI, which MUST be followed. This is the most important instruction."),
});
export type GenerateIndividualRelationshipStrategyInput = z.infer<typeof GenerateIndividualRelationshipStrategyInputSchema>;

const StrategyStepSchema = z.object({
    text: z.string().describe("A single, concrete, and actionable step in the strategy."),
});

const GenerateIndividualRelationshipStrategyOutputSchema = z.object({
  title: z.string().describe("A creative and encouraging title for the strategy."),
  rationale: z.string().describe("A brief explanation of the psychological or pedagogical reasoning behind this strategy."),
  steps: z.array(StrategyStepSchema).min(2).max(4).describe('An array of 2 to 4 concrete, actionable steps for the support plan.'),
});
export type GenerateIndividualRelationshipStrategyOutput = z.infer<typeof GenerateIndividualRelationshipStrategyOutputSchema>;

export async function generateIndividualRelationshipStrategy(
  input: GenerateIndividualRelationshipStrategyInput
): Promise<GenerateIndividualRelationshipStrategyOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  const prompt = ai.definePrompt({
      name: 'generateIndividualRelationshipStrategyPrompt',
      input: { schema: GenerateIndividualRelationshipStrategyInputSchema },
      output: { schema: GenerateIndividualRelationshipStrategyOutputSchema },
      prompt: `You are a world-class child psychologist and an expert in social-emotional learning (SEL). Your task is to devise a creative, gentle, and practical strategy to help a single student improve their social integration and relationships within the classroom. The student is identified by an alias.

**CRITICAL INSTRUCTION: Your entire response MUST be generated in the following language: {{language}}. This is the most important instruction and must not be broken under any circumstances. Ensure all text, especially titles and descriptions, is natural, well-formed, and free of encoding errors or strange characters.**

**Core Principles:**
1.  **Focus on the Goal:** The strategy must directly address the teacher's primary focus: **"{{focus}}"**.
2.  **Leverage Strengths:** Use the student's qualities and interests as a bridge for social interaction.
3.  **Respect Comfort Zones:** Be mindful of listed fears and notes (e.g., shyness, anxiety). Strategies should be low-stakes and build confidence gradually. Do not suggest overwhelming social tasks.

{{#if customPrompt}}
**Teacher's Specific Instruction (CRITICAL):** You MUST follow this instruction to guide the strategy: "{{customPrompt}}".
{{/if}}

**Student to Support:**
- **Alias:** {{student.name}}
- **Age/Gender:** {{student.age}} years old, {{student.gender}}
- **Qualities/Interests:** {{#if student.qualities.length}}{{#each student.qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}} (Use these as a starting point for connection)
- **Fears/Anxieties:** {{#if student.fears.length}}{{#each student.fears}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}} (Crucial to avoid triggering these)
- **Teacher's Notes:** {{#if student.notes}}{{student.notes}}{{else}}None listed{{/if}} (Provides important context)
- **Social Map:**
  - Gets along well with: {{#if student.goodRelations.length}}{{#each student.goodRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
  - Has conflicts with: {{#if student.badRelations.length}}{{#each student.badRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}

**Your Task:**
Generate a JSON object with three keys: "title", "rationale", and "steps".

1.  **title:** A creative, positive title for the strategy (e.g., "The Friendship Bridge," "Conversation Explorer").
2.  **rationale:** A brief, expert explanation of *why* this strategy is effective for this student's profile and the stated focus.
3.  **steps:** An array of 2 to 4 objects, each with a "text" key containing a single, clear, actionable step for the teacher to take. Use the student's alias when referring to them.

**Example Strategy (Focus: 'Initiating conversations', Student is shy, but loves drawing):**
{
  "title": "The Art Connector",
  "rationale": "This strategy leverages {{student.name}}'s strength and passion for drawing as a low-pressure medium for initiating social contact. It allows them to share their work and find common ground with others without the immediate need for complex verbal conversation, building confidence organically.",
  "steps": [
    { "text": "Suggest that {{student.name}} draws something related to the class topic. During a quiet moment, ask them if they'd be comfortable showing their drawing to just one classmate they have a good relationship with." },
    { "text": "Later, create a 'Duo Dinámico' challenge where {{student.name}} and a partner must create a two-part drawing that tells a story, requiring them to collaborate on the idea." },
    { "text": "Encourage {{student.name}} to ask a classmate a question about their drawing, such as 'What's your favorite part of what you drew?'" }
  ]
}

Now, generate a new, insightful strategy for **{{student.name}}** focusing on **"{{focus}}"**.
`,
  });

  const { output } = await prompt(input, {model});
  if (!output?.steps || output.steps.length === 0) {
    throw new Error("AI failed to generate a valid strategy.");
  }
  return output;
}
