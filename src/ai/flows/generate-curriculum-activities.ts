

'use server';

/**
 * @fileOverview Generates curriculum activities based on a topic and desired skills.
 *
 * - `generateCurriculumActivities`: Creates a list of structured activities.
 * - `GenerateCurriculumActivitiesInput`: The input type for the function.
 * - `GenerateCurriculumActivitiesOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const StudentSchemaForZod = z.object({
    id: z.string(),
    name: z.string(),
    qualities: z.array(z.string()),
    age: z.number().optional(),
    notes: z.string().optional(),
    fears: z.array(z.string()).optional(),
    disability: z.string().optional(),
    neurodiversity: z.string().optional(),
    isAbsent: z.boolean(),
    challengeHistory: z.array(z.any()), // Simplified for this context
    gender: z.enum(['female', 'male', 'non-binary', 'other', 'prefer-not-to-say']).optional(),
    participation: z.number(),
});

const GenerateCurriculumActivitiesInputSchema = z.object({
  topic: z.string().describe('The academic topic for the activities (e.g., "Fractions", "Photosynthesis").'),
  skills: z.array(z.string()).describe('A list of skills to focus on (e.g., "Teamwork", "Critical Thinking").'),
  language: z.string().describe('The language for the generated activities (e.g., "en" or "es").'),
  ageOrGrade: z.string().optional().describe('The age or grade level of the students, for context (e.g., "8 years old", "3rd Grade").'),
  country: z.string().optional().describe('The country where the class is located, for cultural context.'),
  subject: z.string().optional().describe('The academic subject, to provide broader context for the topic.'),
  classInterests: z.array(z.string()).optional().describe('A list of general interests for the whole class.'),
  student: StudentSchemaForZod.optional().describe('An optional, specific student to generate the activities for. If provided, activities should be highly personalized.'),
  customPrompt: z.string().optional().describe('An additional instruction from the teacher to guide the AI.'),
  negativePrompt: z.string().optional().describe('A prompt describing what the AI should avoid generating.'),
  complexity: z.enum(['beginner', 'intermediate', 'advanced']).optional().describe("The desired complexity level of the activities."),
  duration: z.enum(['short', 'medium', 'long']).optional().describe("The desired duration of the activities (short: 5-10min, medium: 15-25min, long: 30+ min)."),
  learningModality: z.string().optional().describe('The desired learning style focus (e.g., "kinesthetic", "visual").'),
  socialDynamic: z.string().optional().describe('The desired social dynamic (e.g., "competitive", "cooperative").'),
  bloomLevel: z.string().optional().describe("The desired level of Bloom's Taxonomy (e.g., 'Applying', 'Creating')."),
  resourceConstraints: z.array(z.string()).optional().describe('A list of available resource constraints (e.g., "digital-tools", "outdoor-space", "basic-supplies").'),
});
export type GenerateCurriculumActivitiesInput = z.infer<typeof GenerateCurriculumActivitiesInputSchema>;


const ActivitySchema = z.object({
    title: z.string().describe("A short, engaging title for the activity."),
    description: z.string().describe("A detailed, step-by-step description of the activity."),
    modality: z.enum(["Cozy Corner", "Center Stage", "Power Duo"]).describe("The modality or setting for the activity. 'Cozy Corner' is for individual or quiet work. 'Center Stage' is for presenting to the class. 'Power Duo' is for collaborative work in pairs.")
});

const GenerateCurriculumActivitiesOutputSchema = z.object({
  activities: z.array(ActivitySchema).length(3).describe('A list of exactly 3 structured activities.'),
});
export type GenerateCurriculumActivitiesOutput = z.infer<typeof GenerateCurriculumActivitiesOutputSchema>;


export async function generateCurriculumActivities(
  input: GenerateCurriculumActivitiesInput
): Promise<GenerateCurriculumActivitiesOutput> {
  const result = await generateCurriculumActivitiesFlow(input);
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

const generateCurriculumActivitiesFlow = async (input: GenerateCurriculumActivitiesInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateCurriculumActivitiesPrompt',
        input: { schema: GenerateCurriculumActivitiesInputSchema },
        output: { schema: GenerateCurriculumActivitiesOutputSchema },
        prompt: `You are an expert pedagogical designer specializing in differentiated instruction and personalized learning. Your task is to create three distinct, engaging, and structured classroom activities.

**CRITICAL INSTRUCTIONS (MUST BE FOLLOWED):**
1. **Language:** All generated text MUST be in the specified language: {{language}}.
2. **Output:** Generate a JSON object with an "activities" array containing exactly 3 distinct activities.
3. **Modality:** Each activity must have a modality: "Cozy Corner" (individual/quiet), "Center Stage" (presenting/whole-class), or "Power Duo" (collaborative pairs). Ensure variety.
4. **Academic Rigor:** The activities must be pedagogically sound and directly related to the core academic topic and skills.

---
**CORE ACADEMIC FOCUS:**
- **Topic:** {{topic}}
- **Skills to Develop:** {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

---
**PEDAGOGICAL & CONTEXTUAL CONSTRAINTS (Apply these to shape the activities):**

{{#if student}}
- **FOCUS:** This is a PERSONALIZED plan for one student.
- **Student Profile:** 
  - Age/Level: {{student.age}} years old
  - Strengths/Qualities: {{#each student.qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  - Notes: {{#if student.disability}}{{student.disability}}. {{/if}}{{#if student.neurodiversity}}{{student.neurodiversity}}.{{/if}}
- **GUIDELINES:** Subtly weave the student's interests and strengths into the activities as engagement hooks. Prioritize accessibility and strength-based design.
{{else}}
- **TARGET:** General classroom plan.
{{#if ageOrGrade}}- **Age/Grade:** {{ageOrGrade}}{{/if}}
- **AGE-APPROPRIATENESS:** All activities must be developmentally suitable for this age/grade level.
{{/if}}

{{#if classInterests.length}}
- **CLASS INTERESTS:** {{#each classInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}} (Use these as thematic hooks if possible).
{{/if}}

- **Complexity:** {{#if complexity}}{{complexity}}{{else}}intermediate{{/if}}.
- **Duration:** Activities should be appropriate for a '{{#if duration}}{{duration}}{{else}}medium{{/if}}' timeframe (short: ~5-10 min, medium: ~15-25 min, long: 30+ min).
{{#if learningModality}}- **Learning Modality Focus:** The activities should primarily cater to a **{{learningModality}}** learning style.{{/if}}
{{#if bloomLevel}}- **Cognitive Demand (Bloom's Taxonomy):** The activities should target the '{{bloomLevel}}' level of thinking.{{/if}}
{{#if socialDynamic}}- **Social Dynamic:** The activities should favor a **{{socialDynamic}}** dynamic.{{/if}}
{{#if resourceConstraints.length}}- **Resource Constraints:** The activities must adhere to these constraints: {{#each resourceConstraints}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.{{/if}}

{{#if customPrompt}}- **Additional Teacher Guidance (High Priority):** "{{customPrompt}}".{{/if}}
{{#if negativePrompt}}- **AVOID:** Do not generate activities that involve "{{negativePrompt}}".{{/if}}

---

Now, generate the JSON for the 3 activities based on all the provided context and constraints.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};
