
'use server';

/**
 * @fileOverview Rewrites a teacher's observation to be more objective and detailed.
 *
 * - `generateImprovedObservation`: Improves the observation text.
 * - `GenerateImprovedObservationInput`: The input type for the function.
 * - `GenerateImprovedObservationOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';


const GenerateImprovedObservationInputSchema = z.object({
  observationText: z.string().describe("The original free-form text of the observation written by the teacher."),
  studentName: z.string().optional().describe("A generic alias for the student, like 'Student A', for context."),
  language: z.string().describe('The language for the generated observation (e.g., "en" or "es").'),
  ageOrGrade: z.string().optional().describe('The age or grade level of the students, for context (e.g., "8 years old", "3rd Grade").'),
  subject: z.string().optional().describe('The academic subject, to provide broader context for the topic.'),
  country: z.string().optional().describe('The country where the class is located, for cultural context.'),
});
export type GenerateImprovedObservationInput = z.infer<typeof GenerateImprovedObservationInputSchema>;

const GenerateImprovedObservationOutputSchema = z.object({
  improvedObservation: z.string().describe("The rewritten observation, which should be more objective, detailed, and pedagogically sound."),
});
export type GenerateImprovedObservationOutput = z.infer<typeof GenerateImprovedObservationOutputSchema>;

export async function generateImprovedObservation(
  input: GenerateImprovedObservationInput
): Promise<GenerateImprovedObservationOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateImprovedObservationPrompt',
      input: { schema: GenerateImprovedObservationInputSchema },
      output: { schema: GenerateImprovedObservationOutputSchema },
      prompt: `You are an expert pedagogical coach. Your task is to rewrite a teacher's observation to be more objective, descriptive, and actionable, while maintaining a natural tone.
The goal is to remove subjective judgments (e.g., "he was lazy") and replace them with factual descriptions of behavior (e.g., "he put his head on the desk and did not pick up the pencil").
However, the result should NOT sound like a robotic, hyper-detailed police report. It should sound like a note an experienced educator would write for their records.
When referring to the student, use their provided alias (e.g. '{{studentName}}') or a neutral term like "the student".
The improved observation MUST be in the language: {{language}}.

**Classroom Context:**
{{#if subject}}- **Subject:** {{subject}}{{/if}}
{{#if ageOrGrade}}- **Age/Grade Level:** {{ageOrGrade}}{{/if}}
{{#if country}}- **Country:** {{country}}{{/if}}

**Original Teacher's Observation{{#if studentName}} about {{studentName}}{{/if}}:**
"{{observationText}}"

**Your Task:**
Rewrite the observation based on the principles above.

**Example 1:**
*Original:* "Maria was being very disruptive today."
*Improved (Natural Tone):* "During silent reading, Maria seemed restless, tapping her pencil and whispering to her neighbor a few times, which distracted them from their book."

**Example 2 (User Feedback - Too Detailed):**
*Original:* "alma talked with lucia"
*Robotic/Too Detailed Output:* "Durante la clase de inglés, la estudiante alma conversó con lucia en al menos tres ocasiones. Específicamente, en el minuto 15 de la clase, alma se giró hacia lucia y le susurró algo. Poco después, ambas rieron en voz baja. Hacia el final de la explicación del profesor, alma volvió a hablar con lucia sobre el material presentado."
*Better, More Natural Output:* "Noté que Alma y Lucía interactuaron en voz baja varias veces durante la explicación, pareciendo distraídas del tema principal."

Now, rewrite the provided observation with a natural but objective tone.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output?.improvedObservation) {
      return { improvedObservation: input.observationText };
  }

  return output;
}
