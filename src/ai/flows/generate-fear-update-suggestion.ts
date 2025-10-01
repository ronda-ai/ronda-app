
'use server';

/**
 * @fileOverview Analyzes teacher feedback on a fear management suggestion to propose an update to the student's profile.
 *
 * - `generateFearUpdateSuggestion`: Creates a proposal to modify a student's fears based on feedback.
 * - `GenerateFearUpdateSuggestionInput`: The input type for the function.
 * - `GenerateFearUpdateSuggestionOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const StudentSchemaForZod = z.object({
    name: z.string(),
    fears: z.array(z.string()).describe("The student's current list of fears."),
});

const GenerateFearUpdateSuggestionInputSchema = z.object({
  student: StudentSchemaForZod.describe("The student whose profile might be updated."),
  originalSuggestion: z.string().describe("The original fear management suggestion that was provided."),
  teacherFeedback: z.string().describe("The teacher's feedback on how the suggestion worked."),
  language: z.string().describe('The language for the generated proposal (e.g., "en" or "es").'),
});
export type GenerateFearUpdateSuggestionInput = z.infer<typeof GenerateFearUpdateSuggestionInputSchema>;

const GenerateFearUpdateSuggestionOutputSchema = z.object({
  hasUpdate: z.boolean().describe("Whether an update to the student's fears is being proposed."),
  fearToUpdate: z.string().optional().describe("The specific fear from the student's list that has likely improved."),
  updateProposal: z.string().optional().describe("The suggested text to show the teacher, explaining the proposed change."),
});
export type GenerateFearUpdateSuggestionOutput = z.infer<typeof GenerateFearUpdateSuggestionOutputSchema>;

export async function generateFearUpdateSuggestion(
  input: GenerateFearUpdateSuggestionInput
): Promise<GenerateFearUpdateSuggestionOutput> {
  // If feedback is neutral or negative, don't propose an update.
  if (input.teacherFeedback.length < 10) {
      return { hasUpdate: false };
  }
  const result = await generateFearUpdateSuggestionFlow(input);
  if (!result?.hasUpdate) {
    return { hasUpdate: false };
  }
  return result;
}

const generateFearUpdateSuggestionFlow = async (input: GenerateFearUpdateSuggestionInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateFearUpdateSuggestionPrompt',
        input: { schema: GenerateFearUpdateSuggestionInputSchema },
        output: { schema: GenerateFearUpdateSuggestionOutputSchema },
        prompt: `You are an expert pedagogical psychologist who analyzes feedback to improve student profiles. Your task is to determine if a teacher's feedback on a fear management strategy indicates that a student's fear has diminished.

**Context:**
- **Student:** {{student.name}} (This is a generic alias)
- **Current Fears:** {{#each student.fears}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}
- **Original Suggestion Provided to Teacher:** "{{originalSuggestion}}"
- **Teacher's Feedback on the Suggestion:** "{{teacherFeedback}}"

**Your Task:**
1.  **Analyze the feedback:** Read the teacher's feedback carefully. Does it contain positive language suggesting the student responded well, showed courage, or overcame the challenge?
2.  **Identify the specific fear:** If the feedback is positive, identify which of the student's **current fears** is most closely related to the original suggestion and the feedback.
3.  **Formulate a proposal:** If you identify a clear improvement related to a specific fear, formulate a concise proposal for the teacher. This proposal should confirm the improvement and ask for permission to update the student's profile.

**Example 1:**
- **Current Fears:** ['The dark', 'Dogs']
- **Original Suggestion:** "Use a flashlight to discover hidden pictures in a dimly lit room."
- **Teacher's Feedback:** "It worked wonderfully! The Student was excited to be a treasure hunter and wasn't scared at all. They even asked to do it again!"
- **Analysis:** The feedback is very positive and directly relates to the fear of 'The dark'.
- **Output (JSON):**
{
  "hasUpdate": true,
  "fearToUpdate": "The dark",
  "updateProposal": "It sounds like The Student made great progress with their fear of 'The dark'! Would you like me to remove this fear from their profile?"
}

**Example 2:**
- **Current Fears:** ['Public speaking', 'Making mistakes']
- **Teacher's Feedback:** "She was still very nervous and didn't want to participate."
- **Analysis:** The feedback is negative. No improvement is indicated.
- **Output (JSON):**
{
  "hasUpdate": false
}

**Example 3 (Ambiguous feedback):**
- **Current Fears:** ['Spiders']
- **Teacher's Feedback:** "It was an interesting idea."
- **Analysis:** The feedback is too short and ambiguous to confirm an improvement.
- **Output (JSON):**
{
  "hasUpdate": false
}

The proposal you generate MUST be in the following language: {{language}}.

Now, analyze the feedback for **{{student.name}}** and generate your response.
`
    });
    
    const { output } = await prompt(input, {model});
    return output!;
};
