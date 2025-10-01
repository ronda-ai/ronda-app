
'use server';

/**
 * @fileOverview Generates a structured strategy for helping a student manage their fears.
 *
 * - `generateFearManagementSuggestion`: Creates a contextual, structured strategy.
 * - `GenerateFearManagementSuggestionInput`: The input type for the function.
 * - `GenerateFearManagementSuggestionOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const StudentSchemaForZod = z.object({
    name: z.string().describe("A generic alias for the student."),
    age: z.number().optional(),
    gender: z.string().optional(),
    fears: z.array(z.string()).describe("A list of the student's specific fears. This is the primary focus."),
    qualities: z.array(z.string()).describe("The student's strengths and interests, which can be leveraged in the suggestion."),
    notes: z.string().optional().describe("Any relevant notes from the teacher."),
});

const GenerateFearManagementSuggestionInputSchema = z.object({
  student: StudentSchemaForZod.describe("The student needing help with their fears."),
  language: z.string().describe('The language for the generated suggestion (e.g., "en" or "es").'),
  targetedFear: z.string().optional().describe("An optional specific fear to focus on. If provided, the suggestion must address this fear directly."),
});
export type GenerateFearManagementSuggestionInput = z.infer<typeof GenerateFearManagementSuggestionInputSchema>;

const StrategyStepSchema = z.object({
    text: z.string().describe("A single, concrete, and actionable step in the strategy."),
});

const GenerateFearManagementSuggestionOutputSchema = z.object({
  title: z.string().describe("A creative, positive, and empowering title for the strategy (e.g., 'The Courage Builder', 'The Darkness Explorer')."),
  rationale: z.string().describe("A brief explanation of the psychological or pedagogical reasoning behind this strategy, explaining *why* it's effective for this specific fear and student profile."),
  steps: z.array(StrategyStepSchema).min(2).max(4).describe('An array of 2 to 4 concrete, actionable steps for the support plan.'),
  deepeningQuestion: z.string().describe("A thoughtful, open-ended question to help the teacher reflect and observe more deeply in the future, related to the student's fear."),
  targetedFear: z.string().describe("The specific fear from the student's list that the strategy is designed to address."),
});
export type GenerateFearManagementSuggestionOutput = z.infer<typeof GenerateFearManagementSuggestionOutputSchema>;


export async function generateFearManagementSuggestion(
  input: GenerateFearManagementSuggestionInput
): Promise<GenerateFearManagementSuggestionOutput> {
  const result = await generateFearManagementSuggestionFlow(input);
  if (!result?.steps || result.steps.length === 0) {
    throw new Error("AI failed to generate a valid fear management strategy.");
  }
  return result;
}

const generateFearManagementSuggestionFlow = async (input: GenerateFearManagementSuggestionInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateFearManagementSuggestionPrompt',
        input: { schema: GenerateFearManagementSuggestionInputSchema },
        output: { schema: GenerateFearManagementSuggestionOutputSchema },
        prompt: `You are an expert and empathetic child psychologist specializing in early childhood development. Your task is to provide a teacher with a **structured, gentle, and actionable strategy** to help a student manage their fears.

**CRITICAL INSTRUCTION: Your entire response MUST be generated in the language specified as '{{language}}'. This is the most important rule and must not be broken under any circumstance.**

**Core Principles:**
1.  **Safety First:** Never suggest forcing the student into a direct, overwhelming confrontation with their fear. The approach must be gradual and supportive.
2.  **Empowerment & Control:** The goal is to build the student's confidence and coping mechanisms, giving them a sense of agency.
3.  **Leverage Strengths:** Use the student's qualities and interests as a bridge to approach the fear indirectly and positively.
4.  **Age-Appropriate:** The strategy must be suitable for the student's age.

**Student to Analyze:**
- **Alias:** {{student.name}}
- **Age:** {{student.age}} years old
- **Fears:** {{#each student.fears}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}} (This is the primary context for your suggestion)
- **Qualities/Interests:** {{#each student.qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- **Teacher's Notes:** {{#if student.notes}}{{student.notes}}{{else}}None listed{{/if}}

{{#if targetedFear}}
**Specific Instruction:** You MUST generate a strategy that specifically addresses the fear of '{{targetedFear}}'.
{{/if}}

**Your Task:**
Generate a JSON object containing a complete strategy.
1.  **title:** A creative, positive, and empowering title for the strategy.
2.  **rationale:** A brief, expert explanation of the pedagogical or psychological principle behind this strategy.
3.  **steps:** An array of 2 to 4 concrete, actionable steps for the teacher to implement.
4.  **deepeningQuestion:** A thoughtful, open-ended question to help the teacher understand the root of the fear better.
5.  **targetedFear:** The specific fear from the student's list that the suggestion is designed to address. It must be an **exact match** from the student's fear list.

**Example (Fears: ["The dark"], Qualities: ["Loves drawing"]):**
{
  "title": "Magic Flashlight Artist",
  "rationale": "This strategy reframes the dark from a source of anxiety into a canvas for creativity and discovery. By giving {{student.name}} control (the flashlight) and a fun objective, it reduces the feeling of helplessness and associates dim light with a positive, engaging activity.",
  "steps": [
    { "text": "In a dimly lit (not pitch black) corner, create a 'treasure hunt' by placing some of their favorite small toys around." },
    { "text": "Give {{student.name}} a 'magic' flashlight and explain they are an explorer who needs to find the hidden treasures." },
    { "text": "For each item found, have them draw a picture of it in a special 'Explorer's Notebook'." },
    { "text": "Celebrate their success as a brave explorer at the end." }
  ],
  "deepeningQuestion": "In what specific situations does the fear of the dark manifest most strongly for {{student.name}}?",
  "targetedFear": "The dark"
}

Now, generate a new, insightful strategy for the teacher to help **{{student.name}}** with their fears.
`
    });
    const { output } = await prompt(input, {model});
    return output!;
};
