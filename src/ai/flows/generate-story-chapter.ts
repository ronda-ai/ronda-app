
'use server';

/**
 * @fileOverview Generates a chapter for a collaborative story.
 *
 * - `generateStoryChapter`: Creates the next part of a story based on contributions.
 * - `GenerateStoryChapterInput`: The input type for the function.
 * - `GenerateStoryChapterOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const GenerateStoryChapterInputSchema = z.object({
  characters: z.array(z.string()).describe("The main characters of the story."),
  setting: z.string().describe("The initial setting or scene."),
  language: z.string().describe('The language for the generated story (e.g., "en" or "es").'),
  ageOrGrade: z.string().optional().describe("The age or grade level of the students. This is crucial for adapting the story's tone, complexity, and vocabulary."),
  previousChapters: z.array(z.string()).optional().describe("A list of the previous chapters of the story, in order."),
  studentContributions: z.array(z.string()).optional().describe("A list of new ideas or sentences from students to incorporate into the next chapter."),
  chapterLength: z.enum(['short', 'medium', 'long']).optional().default('short').describe("The desired length of the generated chapter."),
  allowDialogues: z.boolean().optional().default(false).describe("If true, the story should be written in a script-like format with dialogues."),
  customPrompt: z.string().optional().describe('An additional instruction from the teacher to guide the AI, which MUST be followed.'),
  negativePrompt: z.string().optional().describe('A prompt describing what the AI should avoid generating.'),
});
export type GenerateStoryChapterInput = z.infer<typeof GenerateStoryChapterInputSchema>;

// Internal schema for the prompt, including the dynamically generated instruction and chapter number
const InternalChapterInputSchema = GenerateStoryChapterInputSchema.extend({
    lengthInstruction: z.string(),
    nextChapterNumber: z.number(),
});

const GenerateStoryChapterOutputSchema = z.object({
  title: z.string().describe("A creative and engaging title for the entire story. This should only be generated once for the first chapter and remain consistent for subsequent chapters."),
  nextChapterTitle: z.string().describe("A creative and engaging title for this specific new chapter."),
  nextChapterNumber: z.number().describe("The number of the chapter being generated."),
  nextChapterContent: z.string().describe("The content of the next chapter of the story, written as a cohesive narrative that incorporates student contributions and ends with an open question or a point of suspense to prompt the next set of ideas."),
});
export type GenerateStoryChapterOutput = z.infer<typeof GenerateStoryChapterOutputSchema>;


export async function generateStoryChapter(
  input: GenerateStoryChapterInput
): Promise<GenerateStoryChapterOutput> {
  const result = await generateStoryChapterFlow(input);
  if (!result?.nextChapterContent) {
    // Fallback in case of AI failure
    return {
        title: "The Mystery of the Missing Toy",
        nextChapterTitle: "A Strange Noise",
        nextChapterNumber: (input.previousChapters?.length || 0) + 1,
        nextChapterContent: "The brave knight and the clever dragon searched the dark cave. Suddenly, they heard a strange noise from deeper within. What could it be?",
    }
  }
  return result;
}

const generateStoryChapterFlow = async (input: GenerateStoryChapterInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    let lengthInstruction = '';
    switch (input.chapterLength) {
        case 'short':
            lengthInstruction = 'Generate a brief paragraph (3-5 sentences).';
            break;
        case 'medium':
            lengthInstruction = 'Generate a couple of paragraphs (6-9 sentences).';
            break;
        case 'long':
            lengthInstruction = 'Generate three or more detailed paragraphs (10+ sentences).';
            break;
        default:
            lengthInstruction = 'Generate a brief paragraph (3-5 sentences).';
    }

    const nextChapterNumber = (input.previousChapters?.length || 0) + 1;
    
    const chapterWord = input.language === 'es' ? 'Capítulo' : input.language === 'pt' ? 'Capítulo' : 'Chapter';
    const narratorWord = input.language === 'es' ? 'Narrador' : input.language === 'pt' ? 'Narrador' : 'Narrator';

    const prompt = ai.definePrompt({
        name: 'generateStoryChapterPrompt',
        input: { schema: InternalChapterInputSchema },
        output: { schema: GenerateStoryChapterOutputSchema },
        prompt: `You are a Master Storyteller and Weaver of Tales for a classroom of young students. Your persona is wise, imaginative, and incredibly engaging. Your purpose is not just to write a story, but to inspire creativity and collaboration.

**CRITICAL INSTRUCTION: The story MUST be written entirely in the language specified as '{{language}}'. This is the most important rule and must not be broken under any circumstance.**

Your writing style MUST be:
- **Evocative and Rich:** Use descriptive language, sensory details (sights, sounds, smells), and varied sentence structure. Use pauses like commas and semi-colons to create rhythm. Avoid robotic, simplistic sentences.
- **Age-Appropriate:** The vocabulary, themes, and complexity of the plot MUST be perfectly suited for the specified age/grade level.
- **Collaborative:** You must skillfully and seamlessly weave the students' ideas into the narrative, making them feel like the true authors.
- **Engaging:** Always end the chapter with a suspenseful moment, a difficult choice, or a compelling open-ended question to spark discussion and new ideas for the next chapter.

{{#if customPrompt}}
**Teacher's Guidance (CRITICAL):** You MUST follow this instruction: "{{customPrompt}}".
{{/if}}
{{#if negativePrompt}}
**Things to Avoid (CRITICAL):** You MUST avoid the following: "{{negativePrompt}}".
{{/if}}

{{#if allowDialogues}}
**DIALOGUE INSTRUCTION:** The story should be written in a script-like format. Use "${narratorWord}:" for descriptive parts and the character's name for their lines (e.g., "{{characters.[0]}}:", "{{characters.[1]}}:"). Ensure there is a clear distinction between narration and dialogue.
{{/if}}

**Chapter Length Instruction:**
{{{lengthInstruction}}}

**Story Foundation:**
- **Characters:** {{#each characters}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- **Setting:** {{setting}}
- **CRITICAL: Target Audience Age/Grade:** {{#if ageOrGrade}}{{ageOrGrade}}{{else}}around 8 years old{{/if}}.

---

{{#if previousChapters.length}}
### Previous Story So Far
*The story so far is composed of {{previousChapters.length}} chapters.*
{{#each previousChapters}}
---
{{{this}}}
---
{{/each}}

### Ideas from Students for the Next Chapter
{{#if studentContributions.length}}
*Your task is to weave these ideas into a coherent and exciting new chapter.*
{{#each studentContributions}}
- "{{{this}}}"
{{/each}}
{{else}}
*The students are waiting for your inspiration! Introduce a twist, a new detail, or a minor character to move the plot forward.*
{{/if}}

### YOUR TASK: Write ${chapterWord} {{nextChapterNumber}}
You are now writing **${chapterWord} {{nextChapterNumber}}**.
1.  **Create a Title:** Generate a creative title for this specific chapter.
2.  **Write the Chapter:** Write the content of the chapter, flowing logically from the previous parts and integrating the new ideas.
3.  **End with a Hook:** Conclude with a suspenseful question or moment.
4.  **Story Title:** Reuse the original story title.

{{else}}
### YOUR TASK: Write ${chapterWord} 1
You are now writing the **very first chapter** of a brand new story.
1.  **Create a Story Title:** Generate a fun and catchy title for the whole story.
2.  **Create a Chapter Title:** Generate a title for this first chapter.
3.  **Write the Chapter:** Introduce the characters and the setting. Create an initial situation or problem.
4.  **End with a Hook:** Conclude with a compelling question or a moment of suspense to prompt the students for what should happen next.
{{/if}}

Remember to respond with a valid JSON object containing 'title', 'nextChapterTitle', 'nextChapterNumber', and 'nextChapterContent'.
`
    });

    const { output } = await prompt({ ...input, lengthInstruction, nextChapterNumber }, {model});
    return output!;
};
