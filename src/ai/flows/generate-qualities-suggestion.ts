
'use server';

/**
 * @fileOverview Generates quality suggestions for a student based on their performance.
 *
 * - `generateQualitiesSuggestion`: Creates suggestions for new qualities based on recent achievements.
 * - `GenerateQualitiesSuggestionInput`: The input type for the function.
 * - `GenerateQualitiesSuggestionOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const StudentChallengeSchemaForZod = z.object({
  challenge: z.string(),
  tip: z.string(),
  status: z.enum(['pending', 'evaluated']),
  rating: z.enum(['needs-support', 'met-expectations', 'exceeded-expectations']).optional(),
  feedback: z.string().optional(),
});

const StudentSchemaForZod = z.object({
    id: z.string(),
    name: z.string().describe("A generic alias for the student."),
    qualities: z.array(z.string()),
    gender: z.string().optional(),
    challengeHistory: z.array(StudentChallengeSchemaForZod),
});

const GenerateQualitiesSuggestionInputSchema = z.object({
  student: StudentSchemaForZod.describe("The student for whom the quality suggestions are being generated."),
  language: z.string().describe('The language for the generated suggestions (e.g., "en" or "es").'),
});
export type GenerateQualitiesSuggestionInput = z.infer<typeof GenerateQualitiesSuggestionInputSchema>;

const GenerateQualitiesSuggestionOutputSchema = z.object({
  suggestions: z.string().describe('A comma-separated list of 2-3 new quality suggestions for the student.'),
});
export type GenerateQualitiesSuggestionOutput = z.infer<typeof GenerateQualitiesSuggestionOutputSchema>;

export async function generateQualitiesSuggestion(
  input: GenerateQualitiesSuggestionInput
): Promise<GenerateQualitiesSuggestionOutput> {
  const result = await generateQualitiesSuggestionFlow(input);
  if (!result?.suggestions) {
    return {
      suggestions: "Collaborative, Good Listener"
    }
  }
  return result;
}

const generateQualitiesSuggestionFlow = async (input: GenerateQualitiesSuggestionInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    // We only want to analyze evaluated challenges with positive outcomes.
    const relevantHistory = input.student.challengeHistory.filter(h => 
        h.status === 'evaluated' && 
        (h.rating === 'met-expectations' || h.rating === 'exceeded-expectations')
    );

    if (relevantHistory.length === 0) {
        return {
            suggestions: input.language === 'es' ? "Resiliente, Positivo" : "Resilient, Positive"
        }
    }
    
    const prompt = ai.definePrompt({
        name: 'generateQualitiesSuggestionPrompt',
        input: { schema: GenerateQualitiesSuggestionInputSchema },
        output: { schema: GenerateQualitiesSuggestionOutputSchema },
        prompt: `You are an expert educational psychologist. Your role is to identify emerging strengths and qualities in a student based on their recent performance in classroom challenges.
Analyze the student's existing qualities and their challenge history, including the teacher's ratings and feedback.
Your goal is to suggest 2-3 **new** qualities that are not already on the student's profile.
The suggestions you generate MUST be in the following language: {{language}}.

**Student to Analyze:**
- **Alias:** {{student.name}}
- **Gender:** {{student.gender}}
- **Existing Qualities:** {{#each student.qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

**Performance History (Recent Challenges):**
{{#if student.challengeHistory.length}}
{{#each student.challengeHistory}}
- **Challenge:** "{{this.challenge}}"
  - **Rating:** {{#if this.rating}}{{this.rating}}{{else}}Not rated{{/if}}
  - **Teacher Feedback:** {{#if this.feedback}}"{{this.feedback}}"{{else}}No feedback{{/if}}
{{/each}}
{{else}}
- No challenges have been recorded for this student yet.
{{/if}}

**Your Task:**
Based on the performance history, identify patterns of success or positive behavior. Look for evidence of skills like leadership, resilience, creativity, collaboration, etc., especially in the teacher's feedback.
Generate a comma-separated list of 2-3 new, concise qualities that the teacher could add to the student's profile. Do not suggest qualities that are already listed.

**Example:**
- **Existing Qualities:** "Creative, Funny"
- **History:** A "Power Duo" challenge with a rating of "Exceeded Expectations" and feedback "Took the lead and helped their partner understand the task."
- **Generated Suggestions:** "Natural leader, Supportive teammate"

Now, generate new quality suggestions for this student.
`
    });

    const { output } = await prompt({ ...input, student: { ...input.student, challengeHistory: relevantHistory } }, {model});
    return output!;
};
