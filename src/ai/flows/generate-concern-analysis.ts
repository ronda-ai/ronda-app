'use server';

/**
 * @fileOverview Generates an analysis of potential concern patterns for a student.
 *
 * - `generateConcernAnalysis`: Creates a contextual, actionable analysis for a teacher.
 * - `GenerateConcernAnalysisInput`: The input type for the function.
 * - `GenerateConcernAnalysisOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

// Schemas reused from other flows to ensure consistency.
const StudentChallengeSchemaForZod = z.object({
  challenge: z.string(),
  tip: z.string(),
  status: z.enum(['pending', 'evaluated', 'rejected']),
  rating: z.enum(['needs-support', 'met-expectations', 'exceeded-expectations']).optional(),
  feedback: z.string().optional(),
  mood: z.string().optional(),
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

const GenerateConcernAnalysisInputSchema = z.object({
  student: StudentSchemaForZod.describe("The student for whom the analysis is being generated."),
  observations: z.array(ObservationSchemaForZod).optional().describe("A list of qualitative observations made by the teacher about the student."),
  language: z.string().describe('The language for the generated analysis (e.g., "en" or "es").'),
});
export type GenerateConcernAnalysisInput = z.infer<typeof GenerateConcernAnalysisInputSchema>;

const GenerateConcernAnalysisOutputSchema = z.object({
  analysis: z.string().describe('The generated analysis of concern patterns, formatted as a markdown list.'),
});
export type GenerateConcernAnalysisOutput = z.infer<typeof GenerateConcernAnalysisOutputSchema>;

export async function generateConcernAnalysis(
  input: GenerateConcernAnalysisInput
): Promise<GenerateConcernAnalysisOutput> {
  const result = await generateConcernAnalysisFlow(input);
   if (!result?.analysis) {
    return {
      analysis: "No significant patterns of concern detected at this time. The student appears to be performing within expected parameters."
    }
  }
  return result;
}

const generateConcernAnalysisFlow = async (input: GenerateConcernAnalysisInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateConcernAnalysisPrompt',
        input: { schema: GenerateConcernAnalysisInputSchema },
        output: { schema: GenerateConcernAnalysisOutputSchema },
        prompt: `You are an expert and highly empathetic educational psychologist. Your task is to analyze a student's complete profile to identify potential **patterns of concern**.
This is a sensitive task. Your analysis should be framed constructively, offering observations and potential reasons, not definitive diagnoses. The output MUST be a Markdown-formatted list.
Look for a convergence of negative signals across different areas: academic performance, emotional state, social interactions, and participation. A single bad day is not a pattern; a consistent trend is.
The analysis you generate MUST be in the following language: {{language}}.

**Student to Analyze:**
- **Name:** {{student.name}} ({{student.age}} years old, {{student.gender}})
- **Qualities:** {{#each student.qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- **Fears/Anxieties:** {{#if student.fears}}{{#each student.fears}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
- **Disability Notes:** {{#if student.disability}}{{student.disability}}{{else}}None listed{{/if}}
- **Neurodiversity Notes:** {{#if student.neurodiversity}}{{student.neurodiversity}}{{else}}None listed{{/if}}
- **Teacher's General Notes:** {{#if student.notes}}{{student.notes}}{{else}}None listed{{/if}}

**Social Context:**
- **Good Relations with:** {{#if student.goodRelations.length}}{{#each student.goodRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
- **Bad Relations with:** {{#if student.badRelations.length}}{{#each student.badRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}

**Performance & Mood History:**
{{#if student.challengeHistory.length}}
{{#each student.challengeHistory}}
- **Challenge:** "{{this.challenge}}"
  - **Rating:** {{#if this.rating}}{{this.rating}}{{else}}Not rated{{/if}}
  - **Mood:** {{#if this.mood}}{{this.mood}}{{else}}Not recorded{{/if}}
  - **Teacher Feedback:** {{#if this.feedback}}"{{this.feedback}}"{{else}}No feedback{{/if}}
{{/each}}
{{else}}
- No challenges have been recorded for this student yet.
{{/if}}

{{#if observations.length}}
**Teacher's Direct Observations:**
{{#each observations}}
- **({{this.createdAt}}):** [{{this.type}}] "{{this.observation}}"
{{/each}}
**Instruction:** Pay very close attention to these direct observations, especially those of 'negative' type, as they are critical recent context.
{{/if}}


**Your Task:**
Synthesize all the information above. Generate a 2-4 point analysis in a Markdown list that highlights potential concern patterns. For each point, briefly state the observation and suggest a possible interpretation. Use the student's alias ({{student.name}}) in your response.

**Example (Student with social anxiety and declining performance):**
*   **Declining Performance in Group Settings:** I've noticed that {{student.name}}'s ratings have shifted towards "Needs Support" specifically in "Power Duo" challenges over the last few weeks.
*   **Correlation with Social Feedback:** This trend seems to coincide with teacher feedback mentioning that they "were very quiet" and "let their partner do most of the work."
*   **Possible Underlying Issue:** Given their noted shyness, this could indicate growing social anxiety or a specific difficulty collaborating, rather than a lack of understanding of the subject matter.
*   **Recommendation:** It might be beneficial to generate a **Support Plan** focused on building confidence in low-stakes social interactions.

**Example (No significant pattern):**
*   **Varied Performance:** The student shows a healthy mix of different ratings and moods across various challenge types. There are no persistent negative trends.
*   **Recommendation:** Continue to monitor and encourage. No immediate intervention seems necessary based on the current data.

Now, generate a new, insightful concern analysis for **{{student.name}}**.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};
