
'use server';

/**
 * @fileOverview Analyzes a class roster to suggest a focus for relationship remediation.
 *
 * - `generateRelationshipSuggestion`: Identifies critical relationship issues and suggests a focus.
 * - `GenerateRelationshipSuggestionInput`: The input type for the function.
 * - `GenerateRelationshipSuggestionOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const StudentSchemaForZod = z.object({
    id: z.string(),
    name: z.string().describe("This is a student alias, like 'Student A', not a real name."),
    qualities: z.array(z.string()),
    fears: z.array(z.string()).optional(),
    notes: z.string().optional(),
    badRelations: z.array(z.string()).optional().describe("A list of student aliases this student has a bad relationship with."),
});

const GenerateRelationshipSuggestionInputSchema = z.object({
  students: z.array(StudentSchemaForZod).describe("The entire list of students in the class, using aliases."),
  language: z.string().describe('The language for the generated suggestions (e.g., "en" or "es").'),
});
export type GenerateRelationshipSuggestionInput = z.infer<typeof GenerateRelationshipSuggestionInputSchema>;

const GenerateRelationshipSuggestionOutputSchema = z.object({
  suggestedStudentNames: z.array(z.string()).min(2).max(4).describe("The aliases of the students identified as having the most critical relationship issue."),
  suggestedFocus: z.string().describe("The suggested primary goal or skill for the intervention (e.g., 'Communication', 'Empathy')."),
  suggestedCustomPrompt: z.string().describe("A creative and specific custom prompt to guide the main strategy-generation AI."),
});
export type GenerateRelationshipSuggestionOutput = z.infer<typeof GenerateRelationshipSuggestionOutputSchema>;


export async function generateRelationshipSuggestion(
  input: GenerateRelationshipSuggestionInput
): Promise<GenerateRelationshipSuggestionOutput> {
  const result = await generateRelationshipSuggestionFlow(input);
  if (!result?.suggestedStudentNames || result.suggestedStudentNames.length < 2) {
    // Fallback if AI fails to produce a valid suggestion
    return {
        suggestedStudentNames: [input.students[0].name, input.students[1].name],
        suggestedFocus: "Collaboration",
        suggestedCustomPrompt: "Create a low-stakes game where they have to work together."
    }
  }
  return result;
}

const generateRelationshipSuggestionFlow = async (input: GenerateRelationshipSuggestionInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateRelationshipSuggestionPrompt',
        input: { schema: GenerateRelationshipSuggestionInputSchema },
        output: { schema: GenerateRelationshipSuggestionOutputSchema },
        prompt: `You are an expert educational psychologist with a deep understanding of classroom social dynamics.
Your task is to analyze a classroom roster (where students are identified by aliases) to identify the **single most critical relationship issue** that needs intervention and propose a focus for a remediation strategy.

**Your Analysis Process:**
1.  **Identify Critical Nodes:** Look for students who appear in multiple 'badRelations' lists. This person might be a source of conflict or social friction.
2.  **Find Reciprocal Negativity:** Look for pairs of students who have listed each other in their 'badRelations'. This indicates a mutual conflict.
3.  **Prioritize:** A student who is a conflict node for many others is usually a higher priority than a single reciprocal conflict. Choose the most impactful situation to address.
4.  **Formulate a Suggestion:** Based on the identified issue, propose a group of 2-4 students (using their aliases) to work with. Then, suggest a core skill to focus on (e.g., 'Empathy', 'Communication', 'Conflict Resolution') and a creative custom prompt for the teacher to use when generating the full activity.

The suggestions you generate MUST be in the following language: {{language}}.

**Class Roster Data (with Aliases):**
{{#each students}}
- **Alias:** {{name}}
  - **Qualities/Interests:** {{#if qualities}}{{#each qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
  - **Fears:** {{#if fears}}{{#each fears}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
  - **Bad Relations with Aliases:** {{#if badRelations.length}}{{#each badRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
{{/each}}

**Example Analysis & Output:**
*Context:* Student A is in Student B's 'badRelations' list. Student B is in Student A's 'badRelations' list. This is a reciprocal conflict.
*Output (JSON):*
{
  "suggestedStudentNames": ["Student A", "Student B"],
  "suggestedFocus": "Empathy",
  "suggestedCustomPrompt": "Create an activity where they have to guess each other's perspective on a neutral topic, like their favorite animal."
}

*Context:* Student C is in the 'badRelations' list of three different students (Student D, Student E, Student F). Student C is a critical conflict node.
*Output (JSON):*
{
  "suggestedStudentNames": ["Student C", "Student D", "Student E"],
  "suggestedFocus": "Positive Communication",
  "suggestedCustomPrompt": "Design a non-competitive game where they must give each other compliments based on their observable actions in the game."
}

Now, analyze the provided roster and generate your suggestion. Return student aliases in the 'suggestedStudentNames' field.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};
