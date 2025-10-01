
'use server';

/**
 * @fileOverview Generates a strategy to remediate a negative relationship between students.
 *
 * - `generateRelationshipRemediation`: Creates a contextual, actionable strategy.
 * - `GenerateRelationshipRemediationInput`: The input type for the function.
 * - `GenerateRelationshipRemediationOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';
import { RelationshipRemediationDTO } from '@/modules/relationship-remediation/application/dtos/relationship-remediation.dto';

const StudentSchemaForZod = z.object({
    id: z.string(),
    name: z.string(),
    qualities: z.array(z.string()),
    age: z.number().optional(),
    fears: z.array(z.string()).optional(),
    notes: z.string().optional(),
    challengeHistory: z.array(z.any()).optional(),
});

const GenerateRelationshipRemediationInputSchema = z.object({
  students: z.array(StudentSchemaForZod).min(2).max(4).describe("The students with a conflicted relationship. Their names are aliases like 'Student A', 'Student B'."),
  language: z.string().describe('The language for the generated strategy (e.g., "en" or "es").'),
  focus: z.string().describe("The primary goal or skill the teacher wants to focus on (e.g., 'Communication', 'Empathy', 'Collaboration')."),
  customPrompt: z.string().optional().describe("An optional custom prompt from the teacher for more specific guidance."),
  existingStrategy: z.custom<RelationshipRemediationDTO>().optional().describe("An optional existing strategy to adjust or refine. If provided, the AI should use this as a base and modify it according to the new customPrompt."),
});
export type GenerateRelationshipRemediationInput = z.infer<typeof GenerateRelationshipRemediationInputSchema>;

const RemediationStepSchema = z.object({
    text: z.string().describe("A single, concrete, and actionable step in the strategy. This should be a clear instruction for the teacher or students."),
});

const GenerateRelationshipRemediationOutputSchema = z.object({
  strategyTitle: z.string().describe("A creative title for the strategy, followed by a brief explanation of the psychological principle behind it. This MUST be formatted as Markdown, with the title as an H3 heading (e.g., '### The Bridge Builders\\n\\nThis activity...')."),
  steps: z.array(RemediationStepSchema).min(2).max(5).describe('An array of 2 to 5 concrete, actionable steps for the support plan.'),
});
export type GenerateRelationshipRemediationOutput = z.infer<typeof GenerateRelationshipRemediationOutputSchema>;

export async function generateRelationshipRemediation(
  input: GenerateRelationshipRemediationInput
): Promise<GenerateRelationshipRemediationOutput> {
  const result = await generateRelationshipRemediationFlow(input);
   if (!result?.steps || result.steps.length === 0) {
    return {
      strategyTitle: "### Mural Cooperativo\n\nEsta es una tarea no verbal y creativa que requiere un espacio y objetivos compartidos sin competencia directa, permitiendo un compromiso paralelo que puede conducir a una asociación positiva.",
      steps: [
        { text: "Proporcione una hoja de papel grande y materiales de arte. Asigne un tema simple y neutral como 'Un día en el parque'." },
        { text: "Pida a los estudiantes que dibujen un mural juntos. No tienen que hablar, solo contribuir a la imagen compartida." },
        { text: "Después, pida a cada estudiante que señale una cosa que le guste de lo que dibujó la otra persona." },
      ]
    }
  }
  return result;
}

const generateRelationshipRemediationFlow = async (input: GenerateRelationshipRemediationInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateRelationshipRemediationPrompt',
        input: { schema: GenerateRelationshipRemediationInputSchema },
        output: { schema: GenerateRelationshipRemediationOutputSchema },
        prompt: `You are a world-class child psychologist and educational sociologist specializing in classroom social dynamics. Your task is to devise a creative, insightful, and highly practical intervention strategy to help remediate a negative relationship between two or more students. The students are identified by aliases like 'Student A', 'Student B', etc.

**CRITICAL PRINCIPles:**
1.  **Do No Harm:** The strategy must not put students in a high-pressure or potentially embarrassing situation. Avoid direct confrontation.
2.  **Leverage Strengths:** Analyze each student's qualities and interests. The best strategies find common ground or use a strength of one student to help the other.
3.  **Address Fears:** Be extremely mindful of listed fears. The activity must not trigger these anxieties.
4.  **Actionable & Specific:** Provide a concrete, step-by-step plan the teacher can implement immediately.

The strategy you generate MUST be in the following language: {{language}}.

**Students with a Tense Relationship:**
{{#each students}}
- **Alias:** {{name}}
  - **Qualities/Interests:** {{#if qualities}}{{#each qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
  - **Fears:** {{#if fears}}{{#each fears}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
  - **Notes:** {{#if notes}}{{notes}}{{else}}None listed{{/if}}
{{/each}}

**Teacher's Goal:**
- **Primary Focus:** The teacher wants to improve **{{focus}}** between these students.
{{#if customPrompt}}- **Custom Instruction:** {{customPrompt}}{{/if}}

{{#if existingStrategy}}
---
**EXISTING STRATEGY TO ADJUST:**
**Title & Rationale:**
{{{existingStrategy.strategyTitle}}}
**Steps:**
{{#each existingStrategy.steps}}
- {{{this.text}}}
{{/each}}

**Instruction for Adjustment:** The teacher has provided a new custom prompt: "{{customPrompt}}". You must use this instruction to REFINE or ADJUST the existing strategy. Do not create a completely new one, but rather modify the existing steps or rationale to incorporate the teacher's new feedback. For example, if the prompt is "make it more visual", adapt the existing steps to include more visual elements.
---
{{/if}}


**Your Task:**
Generate a JSON object with two keys: "strategyTitle" and "steps".
1.  **strategyTitle:** A Markdown string. It must start with an H3 Markdown heading (###) for the creative title, followed by a newline, and then a brief explanation of the psychological principle behind the strategy.
2.  **steps:** An array of 2 to 5 objects, where each object has a "text" key containing a single, clear, actionable step for the teacher to take. Use the student aliases (e.g. 'Student A', 'Student B') when referring to them.

**Example Strategy (Focus: Collaboration, Students: Student A (loves drawing) & Student B (good at building))**
{
  "strategyTitle": "### The Bridge Builders\\nThis activity creates a scenario of mutual dependency where both students' unique skills are essential for success. It shifts the focus from their personal conflict to a shared, tangible problem, promoting non-verbal cooperation and mutual respect for each other's abilities.",
  "steps": [
    { "text": "Give Student A a piece of paper and markers, and give Student B a set of building blocks. Place a small toy car on one side of a 'canyon' (two desks pushed slightly apart)." },
    { "text": "Explain that they must work together to get the car across. Student A must *draw* the design for a bridge, and Student B must *build* the bridge based *only* on Student A's drawing." },
    { "text": "They cannot speak during the building phase to encourage non-verbal communication." },
    { "text": "Once done, whether they succeed or fail, ask them to discuss what was easy and what was hard. What would they change in the drawing? What was difficult to build?" }
  ]
}

Now, generate a new, insightful strategy for the provided students and teacher's focus.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};
