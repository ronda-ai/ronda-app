

'use server';

/**
 * @fileOverview Generates a test and rubric from a collaborative story.
 *
 * - `generateTestFromStory`: Creates a test based on a story.
 * - `GenerateTestFromStoryInput`: The input type for the function.
 * - `GenerateTestFromStoryOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { AIConfigurationDTO } from '@/modules/ai-configuration/application/dtos/ai-configuration.dto';
import { GenerateRubricOutputSchema } from '@/modules/rubric-suggestion/application/dtos/rubric-generation.dto';
import { z } from 'genkit';

const StorySchemaForZod = z.object({
  id: z.string(),
  title: z.string(),
  characters: z.array(z.string()),
  setting: z.string(),
  chapters: z.array(z.string()),
  isFinished: z.boolean(),
  createdAt: z.string(),
});

const GenerateTestFromStoryInputSchema = z.object({
  story: StorySchemaForZod.describe("The full story object, including title, characters, setting, and all chapters."),
  testType: z.enum(['multiple-choice', 'true-false', 'open-ended', 'mixed']).describe("The type of test to generate."),
  language: z.string().describe('The language for the generated test and rubric (e.g., "en" or "es").'),
  aiConfig: z.custom<AIConfigurationDTO>().optional().describe("The general AI configuration for the classroom, providing context like age, grade, subject, etc."),
});
export type GenerateTestFromStoryInput = z.infer<typeof GenerateTestFromStoryInputSchema>;

const MultipleChoiceOptionSchema = z.object({
    text: z.string().describe("The text of the option."),
});

const QuestionSchema = z.object({
    id: z.string().describe("A unique ID for the question."),
    text: z.string().describe("The question text."),
    options: z.array(MultipleChoiceOptionSchema).optional().describe("A list of options for multiple-choice questions."),
    answer: z.any().describe("The correct answer. For multiple choice, it's the 0-based index of the correct option. For true/false, it's a boolean. For open-ended, it's a sample correct answer as a string."),
});

const TestBlockSchema = z.object({
    id: z.string().describe("A unique ID for the block."),
    type: z.enum(['multiple-choice', 'true-false', 'open-ended']).describe("The type of questions in this block."),
    title: z.string().describe("A title for this block of questions (e.g., 'Multiple Choice', 'Comprehension Questions')."),
    questions: z.array(QuestionSchema).describe("A list of questions for this block."),
});

const GenerateTestFromStoryOutputSchema = z.object({
  storyId: z.string().describe("The original ID of the story."),
  storyTitle: z.string().describe("The title of the story the test is based on."),
  title: z.string().describe("A title for the test itself."),
  blocks: z.array(TestBlockSchema).describe("An array of blocks, where each block contains questions of a specific type."),
  rubric: GenerateRubricOutputSchema.describe("A comprehensive rubric for evaluating the test."),
});

export type GenerateTestFromStoryOutput = z.infer<typeof GenerateTestFromStoryOutputSchema>;


const PromptOutputSchema = GenerateTestFromStoryOutputSchema;

const generateTestFromStoryFlow = async (input: GenerateTestFromStoryInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateTestFromStoryPrompt',
        input: { schema: GenerateTestFromStoryInputSchema },
        output: { schema: PromptOutputSchema },
        prompt: `You are an expert pedagogical content creator. Your task is to create a comprehensive reading comprehension test based on a story that students have co-created. You must also generate a detailed evaluation rubric.

**CRITICAL INSTRUCTION: The entire response, including all titles, questions, options, and rubric content, MUST be generated in the language specified as '{{language}}'. This is the most important rule and must not be broken under any circumstance.**

The complexity, vocabulary, and question types must be appropriate for the specified age/grade level.

**Classroom Context:**
- **Age/Grade Level:** {{aiConfig.ageOrGrade}}
- **Subject:** {{aiConfig.subject}}
- **Country:** {{aiConfig.country}}
- **General Class Interests:** {{#if aiConfig.classInterests}}{{#each aiConfig.classInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Not specified{{/if}}

**Source Story:**
- **ID:** {{story.id}}
- **Title:** {{story.title}}
- **Characters:** {{#each story.characters}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- **Setting:** {{story.setting}}
- **Full Text:**
{{#each story.chapters}}
{{{this}}}
---
{{/each}}

**Your Task:**

1.  **Generate a Test as a structured JSON object.**
    - The root object should have "storyId", "storyTitle", "title", "blocks", and "rubric".
    - **storyId**: You MUST return the ID from the source story: "{{story.id}}".
    - **storyTitle**: You MUST return the title from the source story: "{{story.title}}".
    - **title**: Create a suitable title for the test, like "Reading Comprehension: {{story.title}}".
    - **blocks**: Create an array of question blocks. The test must contain question blocks of the type: **{{testType}}**.
        - If 'mixed', include one block of 'multiple-choice', one of 'true-false', and one of 'open-ended'.
        - Each block object in the array must have a 'id', 'type', 'title', and a 'questions' array.
        - Each question in the 'questions' array must have a 'id', 'text', and an 'answer'. You will generate the ID using nanoid.
        - For 'multiple-choice' questions, also include an 'options' array of objects, each with a 'text' field. The 'answer' should be the 0-based index of the correct option.
        - For 'true-false' questions, the 'answer' should be a boolean (true or false).
        - For 'open-ended' questions, the 'answer' should be a short, ideal response.
    - **rubric**: Generate a detailed rubric object with two keys: "criteria" and "suggestedScoring".
        - **criteria**: A list of 3 to 5 **general qualitative** evaluation criteria. Each object must have: "criterion", "excellent", "satisfactory", and "needsImprovement".
        - **suggestedScoring**: A **quantitative** scoring guide as an array of objects. It MUST assign points to each section based on the generated 'blocks' and calculate a total. Each object in the array must have: "section", "points", and "description".

**Example for a 'mixed' test rubric's "suggestedScoring" field:**
"suggestedScoring": [
    { "section": "Multiple Choice", "points": "5 points total", "description": "1 point for each correct answer." },
    { "section": "True or False", "points": "5 points total", "description": "1 point for each correct answer." },
    { "section": "Open-ended Questions", "points": "10 points total", "description": "Up to 5 points per question based on clarity, accuracy, and completeness." },
    { "section": "Total Score", "points": "20 points", "description": "The sum of all sections." }
]

Now, generate the test for the story titled **"{{story.title}}"**.
`,
    });

    const { output } = await prompt(input, {model});
    return output!;
};

export { generateTestFromStoryFlow as generateTestFromStory };
