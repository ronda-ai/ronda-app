
'use server';
/**
 * @fileOverview Generates a detailed evaluation rubric for a classroom activity or test.
 */
import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { GenerateRubricInput, GenerateRubricInputSchema, GenerateRubricOutput, GenerateRubricOutputSchema } from '@/modules/rubric-suggestion/application/dtos/rubric-generation.dto';

export async function generateRubric(
  input: GenerateRubricInput
): Promise<GenerateRubricOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  const prompt = ai.definePrompt({
    name: 'generateRubricPrompt',
    input: { schema: GenerateRubricInputSchema },
    output: { schema: GenerateRubricOutputSchema },
    prompt: `You are an expert pedagogical assistant. Your task is to generate a comprehensive evaluation rubric for the activity described by the teacher.
The rubric must be fair, balanced, and appropriate for the specified age/grade level.
The entire response MUST be in the language: {{language}}.

**Activity Details:**
- **Description:** {{activityDescription}}
- **Subject:** {{#if subject}}{{subject}}{{else}}General{{/if}}
- **Age/Grade Level:** {{#if ageOrGrade}}{{ageOrGrade}}{{else}}Not specified{{/if}}

{{#if blocks}}
**Test Structure (for Scoring Guide):**
You MUST generate a 'suggestedScoring' section based on these blocks.
{{#each blocks}}
- **Block Type:** {{this.type}}, **Title:** "{{this.title}}", **Questions:** {{this.questions.length}}
{{/each}}
{{/if}}

{{#if existingRubric}}
**Existing Rubric (for Refinement):**
Please refine or add to the following existing rubric based on the activity description.
- **Criteria:** {{#each existingRubric.criteria}}"{{this.criterion}}"{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}

**Your Task:**
Generate a JSON object with two keys: "criteria" and "suggestedScoring".
1.  **criteria**: An array of 3 to 5 objects, each representing an evaluation criterion. Each object must have "criterion", "excellent", "satisfactory", and "needsImprovement" descriptions.
2.  **suggestedScoring**: An array of objects detailing how points are awarded. If test blocks are provided, create an entry for each block and a final "Total" entry. Each object must have "section", "points", and "description".

**Example Scoring Output:**
"suggestedScoring": [
    { "section": "Multiple Choice", "points": "5 points total", "description": "1 point for each correct answer." },
    { "section": "Open-ended Questions", "points": "10 points total", "description": "Up to 5 points per question based on clarity and accuracy." },
    { "section": "Total Score", "points": "15 points", "description": "The sum of all sections." }
]
`,
  });

  const { output } = await prompt(input, {model});
  if (!output) {
    throw new Error('Failed to generate a valid rubric.');
  }

  return output;
}
