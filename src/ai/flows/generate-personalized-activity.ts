'use server';

/**
 * @fileOverview Generates personalized curriculum activities for a single student.
 *
 * - `generatePersonalizedActivity`: Creates a list of structured activities.
 * - `GeneratePersonalizedActivityInput`: The input type for the function.
 * - `GeneratePersonalizedActivityOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const StudentSchemaForZod = z.object({
    name: z.string().describe("The student's name or alias."),
    qualities: z.array(z.string()),
    age: z.number().optional(),
    notes: z.string().optional(),
    fears: z.array(z.string()).optional(),
    disability: z.string().optional(),
    neurodiversity: z.string().optional(),
    gender: z.enum(['female', 'male', 'non-binary', 'other', 'prefer-not-to-say']).optional(),
});

const GeneratePersonalizedActivityInputSchema = z.object({
  topic: z.string().describe('The academic topic for the activities (e.g., "Fractions", "Photosynthesis").'),
  skills: z.array(z.string()).describe('A list of skills to focus on (e.g., "Teamwork", "Critical Thinking").'),
  language: z.string().describe('The language for the generated activities (e.g., "en" or "es").'),
  student: StudentSchemaForZod.describe('The specific student to generate the activities for.'),
  classInterests: z.array(z.string()).optional().describe('A list of general interests to use as themes.'),
  customPrompt: z.string().optional().describe('An additional instruction from the teacher to guide the AI.'),
  negativePrompt: z.string().optional().describe('A prompt describing what the AI should avoid generating.'),
});
export type GeneratePersonalizedActivityInput = z.infer<typeof GeneratePersonalizedActivityInputSchema>;

const ActivitySchema = z.object({
    title: z.string().describe("A short, engaging title for the activity."),
    description: z.string().describe("A detailed, step-by-step description of the activity."),
    modality: z.enum(["Cozy Corner", "Center Stage", "Power Duo"]).describe("The modality or setting for the activity. 'Cozy Corner' is for individual work. 'Center Stage' is for presenting to the class. 'Power Duo' is for collaborative work in pairs.")
});

const GeneratePersonalizedActivityOutputSchema = z.object({
  activities: z.array(ActivitySchema).length(3).describe('A list of exactly 3 structured activities.'),
});
export type GeneratePersonalizedActivityOutput = z.infer<typeof GeneratePersonalizedActivityOutputSchema>;


export async function generatePersonalizedActivity(
  input: GeneratePersonalizedActivityInput
): Promise<GeneratePersonalizedActivityOutput> {
  const result = await generatePersonalizedActivityFlow(input);
  if (!result?.activities || result.activities.length === 0) {
    return {
        activities: [
            { title: "Brainstorming", description: "Brainstorm ideas related to the topic on a whiteboard.", modality: "Center Stage" },
            { title: "Think-Pair-Share", description: "Think about the topic individually, then discuss with a partner.", modality: "Power Duo" },
            { title: "Individual Summary", description: "Write a one-paragraph summary of the main points.", modality: "Cozy Corner" }
        ]
    }
  }
  return result;
}

const generatePersonalizedActivityFlow = async (input: GeneratePersonalizedActivityInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generatePersonalizedActivityPrompt',
        input: { schema: GeneratePersonalizedActivityInputSchema },
        output: { schema: GeneratePersonalizedActivityOutputSchema },
        prompt: `You are an expert pedagogical designer. Your task is to create three distinct, engaging, and structured classroom activities for a single student.
You must assign a suitable modality to each activity from the following options: "Cozy Corner" (for individual work), "Center Stage" (for presenting or whole-class activities), or "Power Duo" (for collaborative work in pairs).
The activities you generate MUST be in the following language: {{language}}.

**Student Profile:**
- **Name:** {{student.name}} (This is a confidential alias, use it in the descriptions)
- **Gender:** {{student.gender}} (CRITICAL: Use appropriate gendered language, e.g., 'el estudiante' for male, 'la estudiante' for female in Spanish. Use neutral language for non-binary/other/not-specified).
- **Age:** {{student.age}} years old.
- **Interests/Qualities:** {{#each student.qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.
- **Notes:** {{#if student.disability}}{{student.disability}}. {{/if}}{{#if student.neurodiversity}}{{student.neurodiversity}}. {{/if}}
**Instruction:** These activities MUST be highly personalized for this student, taking into account their specific interests, qualities, and any relevant notes on disability or neurodiversity.

**Academic Focus:**
- **Topic:** {{topic}}
- **Skills to Develop:** {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

{{#if classInterests.length}}
- **Activity Themes:** {{#each classInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
**Instruction:** This is a very important hint. You MUST use these themes to make the activities more engaging. Connect the academic topic to these interests.
For example, if the topic is "Math" and interests include "Dinosaurs", create an activity like "Calculate and compare the sizes of different dinosaur species."
{{/if}}

{{#if customPrompt}}- **Teacher's Guidance:** {{customPrompt}}{{/if}}
{{#if negativePrompt}}- **Things to Avoid:** {{negativePrompt}}{{/if}}

**Your Task:**
Generate a JSON object containing a list of exactly 3 activity objects. Each object must have a title, a detailed description, and a designated modality. Ensure the activities are varied and directly address both the academic topic and the specified skills, while being perfectly tailored to the student.

**Example Output (Structure):**
{
  "activities": [
    {
      "title": "Fraction Pizza Party",
      "description": "The student will receive a paper 'pizza' and a set of instructions. They must work to cut the pizza into different fractions to represent the toppings requested on the order card. This helps them visualize fractions.",
      "modality": "Cozy Corner"
    }
  ]
}

Now, generate the activities for the provided student and context.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};

