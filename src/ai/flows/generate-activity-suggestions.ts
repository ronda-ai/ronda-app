

'use server';

/**
 * @fileOverview Generates suggestions for individual student activities.
 *
 * - `generateActivitySuggestions`: Creates a list of suggested topics, themes, and prompts.
 * - `GenerateActivitySuggestionsInput`: The input type for the function.
 * - `GenerateActivitySuggestionsOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const StudentSchemaForZod = z.object({
    id: z.string(),
    name: z.string(),
    qualities: z.array(z.string()),
    age: z.number().optional(),
    gender: z.string().optional(),
    notes: z.string().optional(),
    fears: z.array(z.string()).optional(),
    disability: z.string().optional(),
    neurodiversity: z.string().optional(),
    challengeHistory: z.array(z.any()), // Simplified for brevity
});


const GenerateActivitySuggestionsInputSchema = z.object({
  student: StudentSchemaForZod.describe("The student for whom the suggestions are being generated."),
  language: z.string().describe('The language for the generated suggestions (e.g., "en" or "es").'),
});
export type GenerateActivitySuggestionsInput = z.infer<typeof GenerateActivitySuggestionsInputSchema>;


const GenerateActivitySuggestionsOutputSchema = z.object({
  topics: z.array(z.string()).describe("A list of 2-3 specific, curriculum-based academic topics where the student could improve or seems interested (e.g., 'Fractions', 'The Water Cycle', 'The French Revolution')."),
  themes: z.array(z.string()).describe("A list of 2-3 engaging themes based on the student's qualities and interests (e.g., 'Space Exploration', 'Dinosaur Adventure')."),
  customPromptSuggestion: z.string().describe("A suggestion for a positive custom prompt to guide the main AI, based on the student's needs (e.g., 'Make it a hands-on activity')."),
  negativePromptSuggestion: z.string().describe("A suggestion for a negative prompt to constrain the main AI, based on the student's needs (e.g., 'Avoid activities that require writing')."),
});
export type GenerateActivitySuggestionsOutput = z.infer<typeof GenerateActivitySuggestionsOutputSchema>;


export async function generateActivitySuggestions(
  input: GenerateActivitySuggestionsInput
): Promise<GenerateActivitySuggestionsOutput> {
  const result = await generateActivitySuggestionsFlow(input);
  if (!result?.topics || result.topics.length === 0) {
    return {
        topics: ["Fractions", "Story Writing"],
        themes: ["Superheroes", "Ancient Egypt"],
        customPromptSuggestion: "Make the activity a game.",
        negativePromptSuggestion: "Avoid long reading passages."
    }
  }
  return result;
}

const generateActivitySuggestionsFlow = async (input: GenerateActivitySuggestionsInput): Promise<GenerateActivitySuggestionsOutput> => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateActivitySuggestionsPrompt',
        input: { schema: GenerateActivitySuggestionsInputSchema },
        output: { schema: GenerateActivitySuggestionsOutputSchema },
        prompt: `You are an expert educational psychologist and curriculum designer. Your task is to analyze a student's profile and generate a set of actionable suggestions for a teacher to create personalized activities.
Based on the student's history, qualities, and notes, identify potential areas for academic reinforcement, engaging themes, and instructional prompts.
The suggestions you generate MUST be in the following language: {{language}}.

**Student to Analyze:**
- **Name:** {{student.name}}
- **Age:** {{student.age}} years old
- **Gender:** {{student.gender}}
- **Qualities/Interests:** {{#each student.qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- **Notes (Disability/Neurodiversity/Fears):** {{#if student.notes}}{{student.notes}}{{/if}} {{#if student.disability}}{{student.disability}}{{/if}} {{#if student.neurodiversity}}{{student.neurodiversity}}{{/if}}
- **Performance History:**
{{#each student.challengeHistory}}
  - Challenge on "{{this.challenge}}" received a '{{this.rating}}' rating.{{#if this.feedback}} Teacher feedback: "{{this.feedback}}"{{/if}}
{{/each}}

**Your Task:**
Generate a JSON object with four keys: "topics", "themes", "customPromptSuggestion", and "negativePromptSuggestion".
- **topics:** Suggest 2-3 **specific, curriculum-based academic topics** that the student could work on (e.g., 'The Water Cycle', 'Addition with Carrying', 'The French Revolution'). Do NOT suggest broad skills like 'Reading Comprehension' or 'Math Skills'. Look for patterns of lower performance in their history to inform your topic suggestions.
- **themes:** Suggest 2-3 creative and engaging themes that connect to the student's listed qualities and interests.
- **customPromptSuggestion:** Based on the student's profile (especially notes on disability/neurodiversity), suggest a positive instruction for the teacher to give the activity generation AI. Example: 'Focus on visual elements'.
- **negativePromptSuggestion:** Based on the student's profile (especially fears or notes), suggest a constraint for the teacher to give the activity generation AI. Example: 'Avoid activities with public speaking'.


**Example:**
*Student Info:* Name: Leo, Age: 8, Qualities: "Loves space, curious", History: "Struggled with a math challenge about fractions.", Notes: "Dyslexia".
*Output (JSON):*
{
  "topics": ["Fractions with unlike denominators", "Decimal to Fraction Conversion"],
  "themes": ["Space Mission", "Alien Planets", "Building a Rocket"],
  "customPromptSuggestion": "Incorporate drawing or building, not just writing.",
  "negativePromptSuggestion": "Avoid long reading or writing tasks."
}

Now, generate the suggestions for this student.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};



