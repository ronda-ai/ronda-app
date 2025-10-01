
'use server';
/**
 * @fileOverview Generates a structured Project-Based Learning (PBL) plan.
 * 
 * - `generatePblProject`: Creates a PBL project plan.
 * - `GeneratePblProjectInput`: The input type for the function.
 * - `GeneratePblProjectOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const GeneratePblProjectInputSchema = z.object({
  topic: z.string().describe("The central theme or topic for the project."),
  skills: z.array(z.string()).describe("A list of key skills to develop during the project."),
  duration: z.string().describe("The estimated duration of the project (e.g., '1 week', '2 weeks', '1 month')."),
  language: z.string().describe('The language for the generated project plan (e.g., "en" or "es").'),
  ageOrGrade: z.string().optional().describe("The age or grade level of the students, crucial for adapting complexity."),
  subject: z.string().optional().describe("The academic subject to provide more context."),
});
export type GeneratePblProjectInput = z.infer<typeof GeneratePblProjectInputSchema>;

const GeneratePblProjectOutputSchema = z.object({
  essentialQuestion: z.string().describe("A compelling, open-ended question that will drive student inquiry throughout the project."),
  phases: z.string().describe("A breakdown of the project into logical phases (e.g., 'Phase 1: Research', 'Phase 2: Prototyping'). Must be in Markdown list format."),
  milestones: z.string().describe("A list of key deliverables or checkpoints to assess progress. Must be in Markdown list format."),
  finalProductSuggestion: z.string().describe("A suggestion for a tangible, creative final product that students will create to demonstrate their learning. Must be in Markdown list format."),
});
export type GeneratePblProjectOutput = z.infer<typeof GeneratePblProjectOutputSchema>;


export async function generatePblProject(input: GeneratePblProjectInput): Promise<GeneratePblProjectOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generatePblProjectPrompt',
      input: { schema: GeneratePblProjectInputSchema },
      output: { schema: GeneratePblProjectOutputSchema },
      prompt: `You are an expert in Project-Based Learning (PBL) curriculum design. Your task is to transform a simple topic into a structured, engaging, and comprehensive project plan for a classroom.
The entire output MUST be in the specified language: {{language}}.

**Project Foundation:**
- **Topic:** {{topic}}
- **Skills to Develop:** {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- **Estimated Duration:** {{duration}}
- **Age/Grade:** {{#if ageOrGrade}}{{ageOrGrade}}{{else}}Middle School{{/if}}
- **Subject:** {{#if subject}}{{subject}}{{else}}Interdisciplinary{{/if}}

**Your Task:**
Generate a JSON object with four keys: "essentialQuestion", "phases", "milestones", and "finalProductSuggestion".

1.  **essentialQuestion**: Formulate a single, powerful, open-ended question that will guide the students' inquiry. This question should be thought-provoking and connect the topic to a real-world problem or context. It should not have a simple "yes" or "no" answer.
2.  **phases**: Break down the project into logical, sequential phases. Format this as a Markdown list. Example: "- Phase 1: Research & Discovery\\n- Phase 2: Ideation & Design".
3.  **milestones**: Define key deliverables or checkpoints that mark progress through the phases. Format this as a Markdown list. Example: "- Week 1: Submit research summary\\n- Week 2: Present initial design sketches".
4.  **finalProductSuggestion**: Suggest 2-3 creative, tangible final products that students could create to demonstrate their learning. Format this as a Markdown list. Example: "- A short documentary video\\n- A physical prototype of a solution".

**Example:**
*Topic: "Urban Gardening"*
*Skills: "Research, Biology, Design"*
*Duration: "2 weeks"*

{
  "essentialQuestion": "How can we transform an unused space in our school into a sustainable food source for our community?",
  "phases": "- Week 1: Research & Site Analysis\\n- Week 2: Garden Design & Proposal Creation",
  "milestones": "- Day 3: Present findings on local plant viability.\\n- Day 7: Submit initial garden layout sketch.\\n- Day 10: Final proposal presentation.",
  "finalProductSuggestion": "- A detailed 3D model of the proposed garden.\\n- A formal written proposal to the school board, including a budget and timeline.\\n- A presentation campaign to gather support from other students."
}

Now, generate the project plan for the provided topic.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output) {
      throw new Error("Failed to generate a PBL project plan.");
  }

  return output;
}

    