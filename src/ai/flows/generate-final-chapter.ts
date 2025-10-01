
'use server';

/**
 * @fileOverview Generates the final chapter for a collaborative story.
 *
 * - `generateFinalChapter`: Creates the concluding part of a story.
 * - `GenerateFinalChapterInput`: The input type for the function.
 * - `GenerateFinalChapterOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const GenerateFinalChapterInputSchema = z.object({
  characters: z.array(z.string()).describe("The main characters of the story."),
  setting: z.string().describe("The initial setting or scene."),
  language: z.string().describe('The language for the generated story (e.g., "en" or "es").'),
  ageOrGrade: z.string().optional().describe("The age or grade level of the students, crucial for adapting tone and complexity."),
  previousChapters: z.array(z.string()).describe("A list of all the previous chapters of the story, in order."),
  chapterLength: z.enum(['short', 'medium', 'long']).optional().default('medium').describe("The desired length of the final chapter."),
  allowDialogues: z.boolean().optional().default(false).describe("If true, the story should be written in a script-like format with dialogues."),
  customPrompt: z.string().optional().describe('An additional instruction from the teacher to guide the AI.'),
  negativePrompt: z.string().optional().describe('A prompt describing what the AI should avoid generating.'),
});
export type GenerateFinalChapterInput = z.infer<typeof GenerateFinalChapterInputSchema>;

const GenerateFinalChapterOutputSchema = z.object({
  finalChapterTitle: z.string().describe("A creative and fitting title for the final chapter."),
  finalChapterContent: z.string().describe("The content of the concluding chapter, providing a satisfying resolution to the story."),
});
export type GenerateFinalChapterOutput = z.infer<typeof GenerateFinalChapterOutputSchema>;

// Internal schema for the prompt, including the dynamically generated instruction
const InternalFinalChapterInputSchema = GenerateFinalChapterInputSchema.extend({
    lengthInstruction: z.string(),
});


export async function generateFinalChapter(
  input: GenerateFinalChapterInput
): Promise<GenerateFinalChapterOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  let lengthInstruction = '';
  switch (input.chapterLength) {
      case 'short':
          lengthInstruction = 'Generate a brief concluding paragraph (4-6 sentences).';
          break;
      case 'medium':
          lengthInstruction = 'Generate two detailed paragraphs (8-12 sentences) that wrap up the story nicely.';
          break;
      case 'long':
          lengthInstruction = 'Generate a substantial final chapter with at least three detailed paragraphs (13+ sentences), giving a full resolution.';
          break;
      default:
          lengthInstruction = 'Generate two detailed paragraphs (8-12 sentences) that wrap up the story nicely.';
  }
  
  const narratorWord = input.language === 'es' ? 'Narrador' : input.language === 'pt' ? 'Narrador' : 'Narrator';

  const prompt = ai.definePrompt({
      name: 'generateFinalChapterPrompt',
      input: { schema: InternalFinalChapterInputSchema },
      output: { schema: GenerateFinalChapterOutputSchema },
      prompt: `You are a Master Storyteller and Weaver of Tales, tasked with writing the **Grand Finale** for a classroom's collaborative story. Your purpose is to provide a satisfying, coherent, and memorable conclusion that honors the students' creativity.

**CRITICAL INSTRUCTION: The entire story, including this final chapter, MUST be written in the language specified as '{{language}}'. This is the most important rule and must not be broken under any circumstance.**

Your writing style for this conclusion MUST be:
- **Evocative and Consistent:** Maintain the tone and style of the previous chapters. Use descriptive language and sensory details to bring the resolution to life.
- **Conclusive:** Your primary goal is to **resolve the story's main conflict**. Answer the central question posed in the final hook of the last chapter. Do NOT introduce new major conflicts or end on a cliffhanger.
- **Synthesizing:** You must read and understand all the previous chapters to ensure your ending makes sense and logically follows the established plot points and character arcs.
- **Age-Appropriate:** The vocabulary, themes, and complexity of the resolution MUST be perfectly suited for the specified age/grade level.

{{#if customPrompt}}
**Teacher's Guidance (CRITICAL):** You MUST follow this instruction: "{{customPrompt}}".
{{/if}}
{{#if negativePrompt}}
**Things to Avoid (CRITICAL):** You MUST avoid the following: "{{negativePrompt}}".
{{/if}}

{{#if allowDialogues}}
**DIALOGUE INSTRUCTION:** The story is written in a script-like format. You must continue this format. Use "${narratorWord}:" for descriptive parts and the character's name for their lines (e.g., "{{characters.[0]}}:").
{{/if}}

**Chapter Length Instruction:**
{{{lengthInstruction}}}

**Story Foundation:**
- **Characters:** {{#each characters}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- **Setting:** {{setting}}
- **CRITICAL: Target Audience Age/Grade:** {{#if ageOrGrade}}{{ageOrGrade}}{{else}}around 8 years old{{/if}}.

---
### The Story So Far
*The story has reached its climax. You must now provide the conclusion.*
{{#each previousChapters}}
---
{{{this}}}
---
{{/each}}

### YOUR TASK: Write The Final Chapter
You are writing the **final chapter**.
1.  **Create a Final Chapter Title:** Generate a title that feels conclusive and epic (e.g., "The Secret Revealed," "A New Beginning").
2.  **Write the Final Chapter Content:** Write the chapter, resolving the plot and giving the characters a meaningful send-off.
3.  **Ensure a Satisfying End:** The very last sentence should provide a sense of closure.

Remember to respond with a valid JSON object containing 'finalChapterTitle' and 'finalChapterContent'.
`,
  });

  const { output } = await prompt({ ...input, lengthInstruction }, { model });
  
  if (!output) {
      throw new Error("Failed to generate a final chapter.");
  }
  
  return output;
}
