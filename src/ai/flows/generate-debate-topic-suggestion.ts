
'use server';

/**
 * @fileOverview Generates a debate topic suggestion based on classroom context.
 * 
 * - `generateDebateTopicSuggestion`: Creates a single debate topic string.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const GenerateDebateTopicSuggestionInputSchema = z.object({
  language: z.string().describe('The language for the generated topic (e.g., "en" or "es").'),
  ageOrGrade: z.string().optional().describe("The age or grade level of the students. CRITICAL for adapting the topic's complexity."),
  country: z.string().optional().describe("The country where the class is located, for cultural relevance."),
  classInterests: z.array(z.string()).optional().describe("A list of the class's general interests. Use these to make the topic engaging."),
});
type GenerateDebateTopicSuggestionInput = z.infer<typeof GenerateDebateTopicSuggestionInputSchema>;

const GenerateDebateTopicSuggestionOutputSchema = z.object({
  topic: z.string().describe('A single, engaging, and age-appropriate debate topic.'),
});
type GenerateDebateTopicSuggestionOutput = z.infer<typeof GenerateDebateTopicSuggestionOutputSchema>;

export async function generateDebateTopicSuggestion(
  input: GenerateDebateTopicSuggestionInput
): Promise<GenerateDebateTopicSuggestionOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateDebateTopicSuggestionPrompt',
      input: { schema: GenerateDebateTopicSuggestionInputSchema },
      output: { schema: GenerateDebateTopicSuggestionOutputSchema },
      prompt: `You are a creative and expert educator. Your task is to suggest ONE interesting, engaging, and **logically coherent** debate topic for a classroom.
The topic MUST be in the specified language: {{language}}.

**Core Principles:**
1.  **Logical Coherence:** The topic must make sense. Do not simply mash unrelated interests together. Find a real, debatable intersection between concepts.
2.  **Educational Value:** Even if fun, the topic should have some underlying pedagogical value (ethical, social, scientific, etc.).

**CRITICAL CONTEXT:**
- **Age/Grade Level:** {{#if ageOrGrade}}{{ageOrGrade}}{{else}}Not specified{{/if}}
- **Country:** {{#if country}}{{country}}{{else}}Not specified{{/if}}
- **Class Interests:** {{#if classInterests.length}}{{#each classInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Not specified{{/if}}

**Instructions:**
1.  **Analyze Context:** Consider the age, location, and interests to make the topic relevant and stimulating.
2.  **Find Intersections:** If multiple interests are provided, find a logical connection between them. For example, for "dinosaurs" and "environment", a good topic would be "If we could bring back dinosaurs, should we do it considering the environmental impact?".
3.  **Be Provocative (but appropriate):** The topic should have clear, arguable opposing viewpoints.
4.  **Phrase as a Question:** The topic should be a clear, debatable question.
5.  **Keep it Concise:** The topic should be a single, clear sentence.

**Example of what TO DO (Good, logical connection):**
*Interests: "video games, environment"*
{
  "topic": "Should schools include e-sports as an official sport, considering the energy consumption of gaming?"
}

**Example of what NOT TO DO (Bad, nonsensical connection):**
*Interests: "dinosaurs, superheroes"*
{
  "topic": "Would dinosaurs or superheroes make better pets?"
}

Now, generate one new, creative, and context-aware debate topic.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output?.topic) {
    return { topic: input.language === 'es' ? '¿Deberían los deberes ser opcionales?' : 'Should homework be optional?' };
  }

  return output;
}
