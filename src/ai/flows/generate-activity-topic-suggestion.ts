'use server';
/**
 * @fileOverview Generates a topic and skills suggestion for classroom activities.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';
import { GenerateSkillSuggestionOutputSchema } from '@/modules/skill/application/dtos/generate-skill-suggestion.dto';

const GenerateActivityTopicSuggestionInputSchema = z.object({
  language: z.string().describe('The language for the generated suggestions (e.g., "en" or "es").'),
  existingSkills: z.array(z.string()).optional().describe('A list of existing skills to provide context on what is already available.'),
  classContext: z.string().optional().describe('The academic subject or current theme of the class (e.g., "History", "Science", "Environmental Week").'),
});

const GenerateActivityTopicSuggestionOutputSchema = z.object({
  topic: z.string().describe('A single, engaging, and age-appropriate academic topic.'),
  skills: z.array(z.string()).min(2).max(4).describe('A list of 2-4 relevant skills to develop with an activity on this topic.'),
});

export async function generateActivityTopicSuggestion(
  input: z.infer<typeof GenerateActivityTopicSuggestionInputSchema>
): Promise<z.infer<typeof GenerateActivityTopicSuggestionOutputSchema>> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateActivityTopicSuggestionPrompt',
      input: { schema: GenerateActivityTopicSuggestionInputSchema },
      output: { schema: GenerateActivityTopicSuggestionOutputSchema },
      prompt: `You are a creative and expert curriculum designer. Your task is to suggest ONE interesting, curriculum-relevant topic and a complementary set of 2-4 skills for a classroom activity.
The topic and skills MUST be in the specified language: {{language}}.

**CRITICAL CONTEXT:**
- **Class Subject/Theme:** {{#if classContext}}{{classContext}}{{else}}General knowledge{{/if}}
- **Existing Skills:** {{#if existingSkills.length}}{{#each existingSkills}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}{{else}}None specified{{/if}}

**Instructions:**
1.  **Generate a Topic:** Based on the class context, suggest a single, specific, and engaging academic topic. It should be something that can be explored through a classroom activity.
2.  **Suggest Relevant Skills:** Based on the topic you generated, suggest 2-4 skills that would be developed through an activity on that topic. Some of these skills can be from the existing list if they are highly relevant, but try to include at least one or two new, interesting skills.
3.  **Keep it Concise:** The topic and skills should be short and clear.

**Example (Context: Science):**
{
  "topic": "The Water Cycle and Its Impact on Ecosystems",
  "skills": ["Critical Thinking", "Research", "Environmental Awareness", "Diagramming"]
}

**Example (Context: History):**
{
  "topic": "Daily Life in Ancient Rome",
  "skills": ["Historical Empathy", "Communication", "Research", "Public Speaking"]
}

Now, generate one new topic and a set of skills based on the provided context.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output?.topic) {
    return {
        topic: input.language === 'es' ? 'El Ciclo del Agua' : 'The Water Cycle',
        skills: ['Critical Thinking', 'Collaboration']
    }
  }

  return output;
}
