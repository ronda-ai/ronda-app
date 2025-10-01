'use server';

/**
 * @fileOverview Generates a hypothetical digital conflict scenario for teacher training.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'zod';

const StrategySchema = z.object({
  name: z.string().describe("A short name for the intervention strategy (e.g., 'Private Mediation', 'Group Discussion')."),
  description: z.string().describe("A brief description of what this strategy entails."),
  simulatedOutcome: z.string().describe("The likely positive or negative outcome if the teacher chooses this strategy."),
});

const GenerateDigitalConflictScenarioInputSchema = z.object({
  language: z.string().describe('The language for the generated scenario (e.g., "en" or "es").'),
  ageOrGrade: z.string().optional().describe('The age or grade level of the students, for context (e.g., "14 years old", "9th Grade").'),
  topics: z.array(z.string()).optional().describe('A list of topics or themes to guide the scenario generation (e.g., "cyberbullying", "plagiarism", "misinformation").'),
});
export type GenerateDigitalConflictScenarioInput = z.infer<typeof GenerateDigitalConflictScenarioInputSchema>;

const GenerateDigitalConflictScenarioOutputSchema = z.object({
  title: z.string().describe("A short, descriptive title for the conflict scenario (e.g., 'Whiteboard Comment Conflict', 'Misinformation in Group Chat')."),
  scenario: z.string().describe("A detailed, realistic description of a digital conflict between anonymized students (Student A, Student B, etc.)."),
  strategies: z.array(StrategySchema).min(2).max(4).describe('A list of 2 to 4 distinct intervention strategies a teacher could take.'),
});
export type GenerateDigitalConflictScenarioOutput = z.infer<typeof GenerateDigitalConflictScenarioOutputSchema>;

export async function generateDigitalConflictScenario(
  input: GenerateDigitalConflictScenarioInput
): Promise<GenerateDigitalConflictScenarioOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateDigitalConflictScenarioPrompt',
      input: { schema: GenerateDigitalConflictScenarioInputSchema },
      output: { schema: GenerateDigitalConflictScenarioOutputSchema },
      prompt: `You are an expert in educational psychology and digital citizenship. Your task is to create a realistic, hypothetical digital conflict scenario for a teacher to practice their intervention skills.

**CRITICAL INSTRUCTION:** Your entire response, including all text, MUST be generated in the language: {{language}}.

**Context:**
- **Age/Grade Level:** {{#if ageOrGrade}}{{ageOrGrade}}{{else}}Middle School (12-14 years old){{/if}}
- **Focus Topics:** {{#if topics.length}}{{#each topics}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}General online interactions{{/if}}

**Your Task:**
Generate a JSON object with three keys: "title", "scenario", and "strategies".

1.  **title**: A short, descriptive title for the conflict scenario (e.g., 'Whiteboard Comment Conflict', 'Misinformation in Group Chat').
2.  **scenario**: A detailed, realistic description of a digital conflict. Use anonymized student names like 'Student A', 'Student B'. The scenario should present a clear problem but be nuanced enough to allow for multiple intervention approaches.
3.  **strategies**: An array of 2-4 distinct intervention strategies. Each strategy object must have:
    - **name**: A short, clear name for the strategy (e.g., 'Private Conversation with Student A', 'Group Netiquette Activity').
    - **description**: A brief explanation of what the teacher would do in this strategy.
    - **simulatedOutcome**: A plausible outcome of implementing this strategy, including potential positive and negative consequences.

**Example Scenario (language: en):**
{
  "title": "Inappropriate Photo in Group Chat",
  "scenario": "Student A posts an embarrassing, non-consensual photo of Student B in the class WhatsApp group. The photo is quickly deleted, but several students have already seen it. Student B is visibly upset and has left the group.",
  "strategies": [
    {
      "name": "Private Mediation",
      "description": "Open a private chat with both Student A and Student B to discuss the incident, hear both sides, and guide them toward a resolution and an apology.",
      "simulatedOutcome": "This can lead to a genuine understanding and repair of the harm. However, it might be time-consuming and requires careful moderation to avoid making Student B feel more exposed."
    },
    {
      "name": "Address the Whole Class",
      "description": "Address the entire class about digital privacy and respect, without naming the students involved. Use the incident as a general, anonymized example of what not to do.",
      "simulatedOutcome": "This benefits the whole class by setting clear expectations. However, it doesn't directly address the specific harm done to Student B, who may feel their situation wasn't taken seriously."
    }
  ]
}

Now, generate a new, unique, and insightful digital conflict scenario.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output?.scenario || !output.strategies) {
      throw new Error("AI failed to generate a valid scenario with strategies.");
  }
  
  return output;
}