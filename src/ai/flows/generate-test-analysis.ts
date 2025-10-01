
'use server';
import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { TestAnalysisInputSchema, TestAnalysisOutputSchema } from '@/modules/test-analysis/application/dtos/test-analysis.dto';
import { z } from 'genkit';

export async function generateTestAnalysis(
    input: z.infer<typeof TestAnalysisInputSchema>
): Promise<z.infer<typeof TestAnalysisOutputSchema>> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateTestAnalysisPrompt',
      input: { schema: TestAnalysisInputSchema },
      output: { schema: TestAnalysisOutputSchema },
      prompt: `You are an expert pedagogical assistant. Your task is to analyze a student's test results to provide insightful feedback to the teacher. Your entire response MUST be in the language: {{language}}.

**Test Title:** {{testTitle}}
**Student Name:** {{studentName}}
**Score:** {{score}} out of {{maxScore}}

**Student's Answers:**
{{#each questions}}
- **Question:** "{{this.question}}"
  - **Student's Answer:** "{{this.studentAnswer}}"
  - **Correct Answer:** "{{this.correctAnswer}}"
  - **Result:** {{#if this.isCorrect}}Correct{{else}}Incorrect{{/if}}
---
{{/each}}

**Your Task:**
Based on the student's performance, generate a structured analysis in JSON format with the following keys, ensuring all text is in {{language}}:
1.  **performanceSummary**: A brief, one-sentence summary of the student's overall performance.
2.  **strengths**: An array of 1-2 key areas, topics, or question types where the student performed well.
3.  **opportunities**: An array of 1-2 key areas, topics, or question types where the student struggled.
4.  **suggestion**: A concrete, actionable suggestion for the teacher to help the student improve in their areas of opportunity.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output) {
      throw new Error("Failed to generate test analysis.");
  }

  return output;
}
