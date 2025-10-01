'use server';

/**
 * @fileOverview Generates adaptations for a user-provided classroom activity.
 *
 * - `generateActivityAdaptation`: Creates a list of suggested adaptations.
 * - `GenerateActivityAdaptationInput`: The input type for the function.
 * - `GenerateActivityAdaptationOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const AdaptationSuggestionSchema = z.object({
  title: z.string().describe("A short, descriptive title for the adaptation suggestion (e.g., 'Kinesthetic Adaptation', 'Visual Aid Enhancement')."),
  description: z.string().describe("A detailed description of the suggested modification, explaining how to implement it and why it would be beneficial."),
  reasoning: z.string().describe("A brief explanation of the pedagogical reasoning behind the suggestion, linking it to student needs, interests, or specific learning principles."),
});

const GenerateActivityAdaptationInputSchema = z.object({
  originalActivity: z.string().describe('The original activity text provided by the teacher.'),
  language: z.string().describe('The language for the generated adaptations (e.g., "en" or "es").'),
  ageOrGrade: z.string().optional().describe('The age or grade level of the students, for context (e.g., "8 years old", "3rd Grade").'),
  country: z.string().optional().describe('The country where the class is located, for cultural context.'),
  subject: z.string().optional().describe('The academic subject, to provide broader context for the topic.'),
  classInterests: z.array(z.string()).optional().describe('A list of general interests for the whole class.'),
  studentNeeds: z.array(z.string()).optional().describe('A list of specific student needs present in the classroom (e.g., "dyslexia", "ADHD", "needs more movement").'),
  customPrompt: z.string().optional().describe('An additional, specific instruction from the teacher to guide the AI, which MUST be followed. This is the most important instruction.'),
});
export type GenerateActivityAdaptationInput = z.infer<typeof GenerateActivityAdaptationInputSchema>;

const GenerateActivityAdaptationOutputSchema = z.object({
  suggestions: z.array(AdaptationSuggestionSchema).min(1).max(3).describe('A list of 1 to 3 structured adaptation suggestions.'),
});
export type GenerateActivityAdaptationOutput = z.infer<typeof GenerateActivityAdaptationOutputSchema>;


export async function generateActivityAdaptation(
  input: GenerateActivityAdaptationInput
): Promise<GenerateActivityAdaptationOutput> {
  const result = await generateActivityAdaptationFlow(input);
  if (!result?.suggestions || result.suggestions.length === 0) {
    return {
        suggestions: [
            { title: "Simplify Language", description: "Rewrite the instructions using simpler, more direct language to ensure all students can understand the task.", reasoning: "Improves accessibility for students with reading difficulties or those who are language learners." },
            { title: "Incorporate a Visual Element", description: "Add a drawing, diagram, or video component to the activity. For example, have students draw their answer instead of writing it.", reasoning: "Engages visual learners and provides an alternative way to express understanding." },
            { title: "Add a Collaborative Option", description: "Allow students to work in pairs or small groups to complete the activity. Assign roles to ensure equal participation.", reasoning: "Develops social skills and allows for peer-to-peer learning and support." }
        ]
    }
  }
  return result;
}

const generateActivityAdaptationFlow = async (input: GenerateActivityAdaptationInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateActivityAdaptationPrompt',
        input: { schema: GenerateActivityAdaptationInputSchema },
        output: { schema: GenerateActivityAdaptationOutputSchema },
        prompt: `You are an expert pedagogical designer and inclusion specialist. Your task is to analyze a teacher-provided activity and suggest creative and practical adaptations to make it more engaging, inclusive, and effective.
You must NOT invent a new activity. Your goal is to MODIFY the existing one.
The adaptations you generate MUST be in the following language: {{language}}.

{{#if customPrompt}}
**CRITICAL INSTRUCTION:** The teacher has provided a specific adaptation goal. Your main priority is to generate adaptations that fulfill this request: "{{customPrompt}}". Generate between 1 and 3 suggestions related to this goal.
{{/if}}

**Original Activity Provided by Teacher:**
"""
{{originalActivity}}
"""

**Classroom Context:**
{{#if subject}}- **Subject:** {{subject}}{{/if}}
{{#if ageOrGrade}}- **Age/Grade Level:** {{ageOrGrade}}{{/if}}
{{#if country}}- **Country:** {{country}}{{/if}}
{{#if classInterests.length}}
- **Collective Interests:** {{#each classInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}} (Hint: Use these to make the activity more thematic and engaging.)
{{/if}}
{{#if studentNeeds.length}}
- **Identified Student Needs:** {{#each studentNeeds}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}} (CRITICAL: Your suggestions should address these needs if possible.)
{{/if}}


**Your Task:**
Generate a JSON object containing a list of 1 to 3 adaptation suggestions. Each suggestion object must have:
1.  **title:** A short, descriptive title for the adaptation.
2.  **description:** A detailed, step-by-step description of how to modify the activity.
3.  **reasoning:** A brief, clear explanation of *why* this adaptation is beneficial, connecting it to the provided classroom context (especially student needs, interests, or the custom prompt).

**Example:**
*Original Activity:* "Write a paragraph about the main character in the book we read."
*Custom Prompt:* "Adapt this for low-energy students."
*Output (JSON):*
{
  "suggestions": [
    {
      "title": "Mind Map Response",
      "description": "Instead of a paragraph, students can create a mind map about the character at their desk. They can write the character's name in the center and branch out with key traits, actions, and feelings. This is less physically and cognitively demanding than composing a full paragraph.",
      "reasoning": "This MODIFIES the response format of the original activity to be suitable for a low-energy state while keeping the core task."
    }
  ]
}

Now, generate the adaptations for the provided activity and classroom context.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};
