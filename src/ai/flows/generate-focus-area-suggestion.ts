
'use server';

/**
 * @fileOverview Generates new focus area suggestions for language support.
 *
 * - `generateFocusAreaSuggestion`: Creates a list of 2-3 new focus area suggestions.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import type { GenerateFocusAreaSuggestionInput, GenerateFocusAreaSuggestionOutput } from '@/modules/focus-area/application/dtos/generate-focus-area-suggestion.dto';
import { GenerateFocusAreaSuggestionInputSchema, GenerateFocusAreaSuggestionOutputSchema } from '@/modules/focus-area/application/dtos/generate-focus-area-suggestion.dto';


export async function generateFocusAreaSuggestion(
  input: GenerateFocusAreaSuggestionInput
): Promise<GenerateFocusAreaSuggestionOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateFocusAreaSuggestionPrompt',
      input: { schema: GenerateFocusAreaSuggestionInputSchema },
      output: { schema: GenerateFocusAreaSuggestionOutputSchema },
      prompt: `You are an expert bilingual educator and curriculum designer. Your task is to suggest new, relevant "focus areas" for generating language support materials for students.

**CRITICAL INSTRUCTION:** The suggestions must be in the language: {{language}}.

**Your suggestions MUST be concise, direct, and clear. Aim for 2-4 words maximum per suggestion. They should be pedagogical concepts, not long phrases or activity descriptions.**

{{#if customPrompt}}
**Teacher's Goal (High Priority):** The teacher has provided a specific instruction. Your main priority is to generate suggestions that fulfill this request: "{{customPrompt}}". Generate between 2 and 3 suggestions related to this goal.
{{/if}}

**Current Classroom Context (if provided):**
{{#if classContext}}
- The teacher is currently focusing on: "{{classContext}}"
{{else}}
- No specific context provided.
{{/if}}

{{#if existingFocusAreas.length}}
**IMPORTANT: DO NOT SUGGEST ANY OF THE FOLLOWING, as they already exist:**
{{#each existingFocusAreas}}
- {{this}}
{{/each}}
{{/if}}

**Your Task:**
Based on the context, generate a JSON object with a "suggestions" key, containing an array of 2-3 concise, practical, and unique focus areas for language support.

**Example of what TO DO (Good, concise suggestions):**
{
  "suggestions": ["Cultural Vocabulary", "Idiomatic Expressions", "Phonetic Practice"]
}

**Example of what NOT TO DO (Bad, too long/technical suggestions):**
{
  "suggestions": ["Development of learning strategies for reading comprehension in bilingual texts", "Use of technological resources for communicative interaction"]
}


Now, generate new, practical, and CONCISE focus area suggestions.
`,
  });

  const { output } = await prompt(input, {model});
  if (!output?.suggestions) {
      return { suggestions: ["Reading Comprehension", "Vocabulary Building", "Speaking Confidence"] };
  }
  return output;
}
