'use server';

/**
 * @fileOverview Generates new skill suggestions for the classroom.
 *
 * - `generateSkillSuggestion`: Creates a list of 2-3 new skill suggestions.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import type { GenerateSkillSuggestionInput, GenerateSkillSuggestionOutput } from '@/modules/skill/application/dtos/generate-skill-suggestion.dto';
import { GenerateSkillSuggestionInputSchema, GenerateSkillSuggestionOutputSchema } from '@/modules/skill/application/dtos/generate-skill-suggestion.dto';


export async function generateSkillSuggestion(
  input: GenerateSkillSuggestionInput
): Promise<GenerateSkillSuggestionOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateSkillSuggestionPrompt',
      input: { schema: GenerateSkillSuggestionInputSchema },
      output: { schema: GenerateSkillSuggestionOutputSchema },
      prompt: `You are an expert curriculum designer and pedagogical coach specializing in 21st century skills. Your task is to suggest new, relevant, practical, and applicable pedagogical skills that a teacher could incorporate into their activity planning.

**RESPONSE LANGUAGE:** {{language}}

**CRITICAL INSTRUCTIONS:**
1. **BALANCE:** Combine fundamental skills (critical thinking, creativity, collaboration, communication) with more specific and applicable versions
2. **ORIGINALITY:** DO NOT repeat any of the provided existing skills
3. **QUANTITY:** Generate exactly between 2 and 3 suggestions
4. **PRACTICALITY:** Skills that teachers can implement directly in the classroom
5. **FORMAT:** Each suggestion should be concise (2-5 words maximum)

{{#if customPrompt}}
**ABSOLUTE PRIORITY:** The teacher has provided a specific instruction that you MUST fulfill: "{{customPrompt}}". All suggestions must be directly related to this request.
{{/if}}

**CURRENT CLASSROOM CONTEXT:**
{{#if classContext}}
- Current focus: "{{classContext}}"
- Suggestions must be relevant to this specific context
{{else}}
- General context: skills applicable in various educational scenarios
{{/if}}

**EXISTING SKILLS (DO NOT REPEAT):**
{{#if existingSkills.length}}
{{#each existingSkills}}
- {{this}}
{{/each}}
{{else}}
- No existing skills registered
{{/if}}

**PREFERRED APPROACH:**
- **70%:** Specific and applicable skills (e.g., "Structured debate", "Collaborative mind mapping")
- **30%:** Well-contextualized fundamental skills (e.g., "Applied critical thinking", "Creativity in problem solving")

**EXAMPLES OF SPECIFIC SUGGESTIONS:**
- "Evidence analysis"
- "Solution prototyping"
- "Peer feedback"
- "Assertive communication"
- "Diverse team collaboration"

**EXAMPLES OF WELL-CONTEXTUALIZED FUNDAMENTAL SKILLS:**
- "Critical thinking [for specific context]"
- "Creativity [applied to specific area]"
- "Collaboration [in concrete projects]"
- "Communication [effective in the subject]"

**REQUIRED OUTPUT FORMAT:**
{
  "suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
}

**Generate suggestions that are:**
- Pedagogically sound
- Practical to implement
- Aligned with the provided context
- Novel compared to existing skills
- Useful for concrete activity planning
`,
  });

  const { output } = await prompt(input, {model});
  if (!output?.suggestions) {
      return { suggestions: ["Applied critical thinking", "Team collaboration", "Creativity in problem solving"] };
  }
  return output;
}
