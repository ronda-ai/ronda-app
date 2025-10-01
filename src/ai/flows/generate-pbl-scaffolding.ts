
'use server';
/**
 * @fileOverview Generates an on-the-fly scaffolding plan for a PBL team.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const StudentProfileSchema = z.object({
  name: z.string().describe("The student's anonymized alias (e.g., 'Student A')."),
  qualities: z.array(z.string()).describe("The student's interests and strengths."),
});

const GeneratePblScaffoldingInputSchema = z.object({
  team: z.array(StudentProfileSchema).describe("An array of the students in the team."),
  problem: z.string().describe("The teacher's description of the problem the team is facing."),
  language: z.string().describe('The language for the generated suggestion (e.g., "en" or "es").'),
});
export type GeneratePblScaffoldingInput = z.infer<typeof GeneratePblScaffoldingInputSchema>;

const GeneratePblScaffoldingOutputSchema = z.object({
  microActivity: z.string().describe("A concrete, short (5-15 min) activity to help the team overcome their specific obstacle. Must be in Markdown format."),
  guidingQuestions: z.string().describe("A list of 2-3 open-ended questions the teacher can ask to guide the team's reflection and problem-solving. Must be in Markdown list format."),
});
export type GeneratePblScaffoldingOutput = z.infer<typeof GeneratePblScaffoldingOutputSchema>;

export async function generatePblScaffolding(input: GeneratePblScaffoldingInput): Promise<GeneratePblScaffoldingOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generatePblScaffoldingPrompt',
      input: { schema: GeneratePblScaffoldingInputSchema },
      output: { schema: GeneratePblScaffoldingOutputSchema },
      prompt: `You are an expert PBL facilitator and educational coach. Your task is to provide a quick, actionable intervention plan for a student team that is facing a specific problem.
Your response MUST be in the language: {{language}}.

**Team Profile:**
{{#each team}}
- **{{name}}:** Qualities: {{#each qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

**Problem Description:**
"{{problem}}"

**Your Task:**
Generate a JSON object with two keys: "microActivity" and "guidingQuestions".

1.  **microActivity**: Design a very short (5-15 minute) and highly specific activity that directly addresses the problem. It should leverage the students' qualities if possible. Provide clear, step-by-step instructions in Markdown format.
2.  **guidingQuestions**: Formulate 2-3 open-ended questions that the teacher can ask the team to help them reflect and find their own solution. Format this as a Markdown list.

**Example:**
*Problem:* "The team is stuck and doesn't know how to start their research on renewable energy."
*Team:* Student A (Creative), Student B (Organized)

{
  "microActivity": "### 5-Minute 'Question Burst'\\n1. Set a timer for 5 minutes.\\n2. Tell the team their only goal is to write down as many questions as they can about renewable energy. No idea is too silly.\\n3. **Student B (Organized)** can be the scribe.\\n4. **Student A (Creative)**'s job is to encourage wild and unusual questions.\\n5. When the time is up, they will have a long list of research starting points.",
  "guidingQuestions": "- Looking at your list of questions, which one seems the most interesting to start with?\\n- Which question, if answered, would help you answer many of the others?\\n- How could you divide these questions among the team members?"
}

Now, generate an intervention for the provided team and problem.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output) {
    throw new Error("Failed to generate a scaffolding suggestion.");
  }

  return output;
}
