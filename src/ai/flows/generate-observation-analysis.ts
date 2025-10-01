
'use server';

/**
 * @fileOverview Analyzes a teacher's observation to suggest a type, tags, and a deepening question.
 *
 * - `generateObservationAnalysis`: Analyzes the observation text.
 * - `GenerateObservationAnalysisInput`: The input type for the function.
 * - `GenerateObservationAnalysisOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const ObservationTypeEnum = z.enum(['positive', 'negative', 'neutral', 'academic', 'social-emotional']);

const GenerateObservationAnalysisInputSchema = z.object({
  observationText: z.string().describe("The free-form text of the observation written by the teacher."),
  studentName: z.string().optional().describe("A generic alias for the student, like 'Student A', for context."),
  language: z.string().describe('The language for the generated analysis (e.g., "en" or "es").'),
  ageOrGrade: z.string().optional().describe('The age or grade level of the students, for context (e.g., "8 years old", "3rd Grade").'),
  subject: z.string().optional().describe('The academic subject, to provide broader context for the topic.'),
  country: z.string().optional().describe('The country where the class is located, for cultural context.'),
});
export type GenerateObservationAnalysisInput = z.infer<typeof GenerateObservationAnalysisInputSchema>;

const GenerateObservationAnalysisOutputSchema = z.object({
  suggestedType: ObservationTypeEnum.describe("The most likely category for this observation based on its content."),
  suggestedTags: z.array(z.string()).describe("A list of 2-4 relevant keywords or tags extracted from the observation text."),
  deepeningQuestion: z.string().optional().describe("A follow-up question to help the teacher deepen their understanding in a future observation."),
});
export type GenerateObservationAnalysisOutput = z.infer<typeof GenerateObservationAnalysisOutputSchema>;

export async function generateObservationAnalysis(
  input: GenerateObservationAnalysisInput
): Promise<GenerateObservationAnalysisOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateObservationAnalysisPrompt',
        input: { schema: GenerateObservationAnalysisInputSchema },
        output: { schema: GenerateObservationAnalysisOutputSchema },
        prompt: `You are an expert pedagogical assistant. Your task is to analyze a teacher's observation about a student and provide structured data to enrich it.
The analysis MUST be in the language: {{language}}.

**Classroom Context:**
{{#if subject}}- **Subject:** {{subject}}{{/if}}
{{#if ageOrGrade}}- **Age/Grade Level:** {{ageOrGrade}}{{/if}}
{{#if country}}- **Country:** {{country}}{{/if}}

**Teacher's Observation{{#if studentName}} about {{studentName}}{{/if}}:**
"{{observationText}}"

**Your Task:**
Generate a JSON object with the following properties:
1.  **suggestedType:** Classify the observation as 'positive', 'negative', 'neutral', 'academic', or 'social-emotional'.
2.  **suggestedTags:** Extract 2-4 key concepts or tags from the observation (e.g., "collaboration", "frustration", "math").
3.  **deepeningQuestion:** Based on the observation, formulate a thoughtful, open-ended question that the teacher could keep in mind for a future observation to gain deeper insight. This question should guide the teacher's focus.

**Example 1:**
*Observation:* "Student A seemed very frustrated during the math exercise and didn't want to work with their partner."
*studentName:* "Student A"
*Output (JSON):*
{
  "suggestedType": "negative",
  "suggestedTags": ["frustration", "math", "collaboration"],
  "deepeningQuestion": "Is Student A's frustration more related to the math content itself, or to the social dynamic of working with a partner?"
}

**Example 2:**
*Observation:* "Student B confidently explained his reasoning to the group and they all listened."
*studentName:* "Student B"
*Output (JSON):*
{
  "suggestedType": "positive",
  "suggestedTags": ["leadership", "communication", "confidence"],
  "deepeningQuestion": "In what other situations does Student B show this leadership? Does it vary by subject or group composition?"
}

Now, analyze the provided observation.
`,
    });

    const { output } = await prompt(input, {model});
    if (!output) {
      return {
          suggestedType: "neutral",
          suggestedTags: ["general"]
      }
    }
    return output;
};
