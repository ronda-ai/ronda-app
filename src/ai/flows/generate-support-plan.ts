
'use server';

/**
 * @fileOverview Generates a multi-step support plan for a student.
 *
 * - `generateSupportPlan`: Creates a contextual, actionable support plan for a teacher.
 * - `GenerateSupportPlanInput`: The input type for the generateSupportPlan function.
 * - `GenerateSupportPlanOutput`: The return type for the generateSupportPlan function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { SupportPlanDTO } from '@/modules/support-plan/application/dtos/support-plan.dto';
import { z } from 'genkit';

// Schemas reused from the coach suggestion flow, as the input data is identical.
const StudentChallengeSchemaForZod = z.object({
  challenge: z.string(),
  tip: z.string(),
  status: z.enum(['pending', 'evaluated', 'rejected']),
  rating: z.enum(['needs-support', 'met-expectations', 'exceeded-expectations']).optional(),
  feedback: z.string().optional(),
  attempts: z.number().optional(),
  aiConfiguration: z.any().optional(),
});

const ObservationSchemaForZod = z.object({
    observation: z.string(),
    type: z.enum(['positive', 'negative', 'neutral', 'academic', 'social-emotional']),
    createdAt: z.string(),
});

const StudentSchemaForZod = z.object({
    id: z.string(),
    name: z.string().describe("A generic alias for the student, like 'Student A'."),
    qualities: z.array(z.string()),
    age: z.number().optional(),
    notes: z.string().optional(),
    fears: z.array(z.string()).optional(),
    disability: z.string().optional(),
    neurodiversity: z.string().optional(),
    goodRelations: z.array(z.string()).optional().describe("A list of aliases for students this student has a good relationship with."),
    badRelations: z.array(z.string()).optional().describe("A list of aliases for students this student has a bad relationship with."),
    isAbsent: z.boolean(),
    challengeHistory: z.array(StudentChallengeSchemaForZod),
    gender: z.enum(['female', 'male', 'non-binary', 'other', 'prefer-not-to-say']).optional(),
    participation: z.number(),
});

const SupportPlanStepSchemaForZod = z.object({
    text: z.string().describe("A single, actionable step in the support plan."),
});

const SupportPlanSchemaForZod = z.object({
    id: z.string(),
    studentId: z.string(),
    steps: z.array(SupportPlanStepSchemaForZod),
    teacherFeedback: z.string().optional(),
    createdAt: z.string(),
});

const GenerateSupportPlanInputSchema = z.object({
  student: StudentSchemaForZod.describe("The student for whom the plan is being generated."),
  allStudents: z.array(StudentSchemaForZod).describe("The list of all students in the class for social context."),
  previousPlans: z.array(SupportPlanSchemaForZod).optional().describe("A list of previous support plans for this student, including teacher feedback, to inform the new plan."),
  observations: z.array(ObservationSchemaForZod).optional().describe("A list of qualitative observations made by the teacher about the student."),
  language: z.string().describe('The language for the generated plan (e.g., "en" or "es").'),
});
export type GenerateSupportPlanInput = z.infer<typeof GenerateSupportPlanInputSchema>;

const GenerateSupportPlanOutputSchema = z.object({
  steps: z.array(SupportPlanStepSchemaForZod).min(3).max(5).describe('An array of 3 to 5 concrete, actionable steps for the support plan.'),
});
export type GenerateSupportPlanOutput = z.infer<typeof GenerateSupportPlanOutputSchema>;

export async function generateSupportPlan(
  input: GenerateSupportPlanInput
): Promise<GenerateSupportPlanOutput> {
  const result = await generateSupportPlanFlow(input);
   if (!result?.steps || result.steps.length === 0) {
    return {
      steps: [
        { text: "Focus on the student's strengths." },
        { text: "Provide positive reinforcement." },
        { text: "Create low-stakes opportunities for participation." },
      ]
    }
  }
  return result;
}

const generateSupportPlanFlow = async (input: GenerateSupportPlanInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateSupportPlanPrompt',
        input: { schema: GenerateSupportPlanInputSchema },
        output: { schema: GenerateSupportPlanOutputSchema },
        prompt: `You are an expert educational psychologist. Your role is to generate a comprehensive, actionable support plan for a teacher to help a specific student.
The plan must consist of 3 to 5 concrete steps.
Analyze all provided data, paying special attention to disabilities, neurodiversity, fears, direct teacher observations, and social dynamics. The plan should be empathetic, supportive, and based on pedagogical best practices.

**CRITICAL INSTRUCTION:** The response must be in natural, well-formed {{language}}. You MUST avoid generating broken characters, encoding issues, or strange symbols. The output text must be clean and professional.

**Student to Analyze:**
- **Name:** {{student.name}} ({{student.age}} years old, {{student.gender}})
- **Qualities:** {{#each student.qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- **Fears/Anxieties:** {{#if student.fears}}{{#each student.fears}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
- **Disability Notes:** {{#if student.disability}}{{student.disability}}{{else}}None listed{{/if}}
- **Neurodiversity Notes:** {{#if student.neurodiversity}}{{student.neurodiversity}}{{else}}None listed{{/if}}
- **Teacher's General Notes:** {{#if student.notes}}{{student.notes}}{{else}}None listed{{/if}}

**Social Context:**
- **Good Relations with:** {{#if student.goodRelations.length}}{{#each student.goodRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
- **Bad Relations with:** {{#if student.badRelations.length}}{{#each student.badRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}

**Performance History (Recent Challenges):**
{{#if student.challengeHistory.length}}
{{#each student.challengeHistory}}
- **Challenge:** "{{this.challenge}}"
  - **Status:** {{this.status}}
  {{#if this.rating}}- **Rating:** {{this.rating}}{{/if}}
  {{#if this.feedback}}- **Teacher Feedback:** "{{this.feedback}}"{{/if}}
{{/each}}
**Instruction:** Focus your analysis on challenges with a status of 'evaluated'. Ignore challenges that are 'pending' or 'rejected' as they do not provide performance data.
{{else}}
- No challenges have been recorded for this student yet.
{{/if}}

{{#if observations.length}}
**Teacher's Direct Observations:**
{{#each observations}}
- **({{this.createdAt}}):** [{{this.type}}] "{{this.observation}}"
{{/each}}
**Instruction:** Pay very close attention to these direct observations, especially those of 'negative' type, as they are critical recent context to build the support plan around.
{{/if}}

{{#if previousPlans.length}}
**Previous Support Plans & Teacher Feedback:**
{{#each previousPlans}}
- **Plan from {{createdAt}}:**
{{#each this.steps}} - {{this.text}} (Status: {{this.status}}){{/each}}
  - **Teacher's Feedback on this plan:** {{#if this.teacherFeedback}}{{this.teacherFeedback}}{{else}}No feedback was provided.{{/if}}
{{/each}}
**Instruction:** Review the previous plans and the teacher's feedback carefully. If a previous strategy didn't work, suggest a new approach. If a strategy was successful, consider building upon it. Generate a NEW plan that reflects this learning.
{{/if}}


**Your Task:**
Generate a 3-5 step support plan as an array of step objects. Each step should be a clear, actionable instruction for the teacher. Use student aliases when referring to other students.

**Example (Student with dyslexia and fear of reading aloud):**
Output JSON should be:
{
  "steps": [
    { "text": "Fortalecer sin Presión: Asigna desafíos de 'Rincón Acogedor' que no requieran lectura en voz alta. Por ejemplo: 'resume la idea principal con un dibujo'." },
    { "text": "Fomentar la Colaboración: Emparéjalo con Student B, con quien tiene una 'buena relación', en tareas que requieran discusión y no solo lectura." },
    { "text": "Andamiaje del Desafío: Antes de un desafío de lectura, dale el texto con antelación para que pueda familiarizarse con él sin la presión del tiempo." },
    { "text": "Reconocimiento Positivo: Celebra públicamente cuando comparta una idea, sin importar si fue leída o hablada, para reforzar su confianza." }
  ]
}

Now, generate a new, insightful support plan for **{{student.name}}**.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};
