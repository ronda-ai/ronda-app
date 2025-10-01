
'use server';

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'zod';
import type { QuestionAnalysisInput, QuestionAnalysisOutput } from '@/modules/teacher-lab/application/dtos/question-analysis.dto';

// Zod schemas are now defined locally within the flow file.
const BloomLevelSchema = z.enum(['Remembering', 'Understanding', 'Applying', 'Analyzing', 'Evaluating', 'Creating']);

const QuestionAnalysisSchema = z.object({
  question: z.string().describe("The original question text."),
  bloomLevel: BloomLevelSchema.describe("The classified Bloom's Taxonomy level."),
  justification: z.string().describe("A brief justification for the classification."),
  suggestion: z.string().describe("A suggestion on how to elevate the question to a higher cognitive level."),
});

const QuestionAnalysisInputSchema = z.object({
  questions: z.array(z.string()).min(1).describe("An array of questions to be analyzed."),
  language: z.string().describe("The language for the analysis and suggestions."),
});

const QuestionAnalysisOutputSchema = z.object({
  analyses: z.array(QuestionAnalysisSchema).describe("An array of analysis objects for each provided question."),
  summary: z.string().describe("A brief overall summary of the question set, highlighting patterns and general recommendations."),
});


export async function generateQuestionAnalysis(input: QuestionAnalysisInput): Promise<QuestionAnalysisOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateQuestionAnalysisPrompt',
      input: { schema: QuestionAnalysisInputSchema },
      output: { schema: QuestionAnalysisOutputSchema },
      prompt: `You are an expert pedagogical coach specializing in cognitive science and curriculum design. Your task is to analyze a list of classroom questions provided by a teacher and classify them according to Bloom's Taxonomy. For each question, provide a justification for its classification and a concrete suggestion to elevate it to a higher cognitive level. The response MUST be in the language: {{language}}.

**Bloom's Taxonomy Levels (from lowest to highest):**
1.  **Remembering:** Recalling facts and basic concepts. (e.g., "What is...?", "List the...")
2.  **Understanding:** Explaining ideas or concepts. (e.g., "Explain...", "Summarize...")
3.  **Applying:** Using information in new situations. (e.g., "How would you use...?", "Solve...")
4.  **Analyzing:** Drawing connections among ideas. (e.g., "Compare...", "What is the relationship between...?")
5.  **Evaluating:** Justifying a stand or decision. (e.g., "Do you agree...?", "Critique...")
6.  **Creating:** Producing new or original work. (e.g., "Design...", "Invent...")

**Teacher's Questions to Analyze:**
{{#each questions}}
- "{{this}}"
{{/each}}

---
**YOUR TASK:**

Generate a JSON object with two keys: "analyses" and "summary".

1.  **analyses**: An array of objects. For each question provided by the teacher, create an object with:
    a.  **question**: The original question text.
    b.  **bloomLevel**: The classified level from Bloom's Taxonomy.
    c.  **justification**: A brief, clear explanation of *why* it fits that level.
    d.  **suggestion**: A concrete, rewritten version of the question that elevates it to a higher level of thinking (e.g., from 'Remembering' to 'Analyzing' or 'Creating').

2.  **summary**: A single, concise paragraph summarizing the overall cognitive demand of the question set. Identify any dominant patterns (e.g., "mostly recall-based") and provide a general recommendation for improvement.

**Example:**
*Input Questions:* ["What is photosynthesis?", "Why is photosynthesis important for plants?"]

{
  "analyses": [
    {
      "question": "What is photosynthesis?",
      "bloomLevel": "Remembering",
      "justification": "This question asks for the recall of a definition.",
      "suggestion": "How would you design an experiment to prove that plants need light for photosynthesis?"
    },
    {
      "question": "Why is photosynthesis important for plants?",
      "bloomLevel": "Understanding",
      "justification": "This requires explaining a concept, not just defining it.",
      "suggestion": "Critique the argument that artificial light is just as good for plant growth as natural sunlight. Justify your position with evidence."
    }
  ],
  "summary": "The current questions focus on recall and basic comprehension. To deepen student thinking, try incorporating more questions that require them to design, critique, or analyze concepts, moving them towards the 'Creating' and 'Evaluating' levels of the taxonomy."
}

Now, analyze the provided list of questions.
`,
  });

  const { output } = await prompt(input, { model });
  if (!output) {
    throw new Error("AI failed to generate a valid question analysis.");
  }
  return output;
}
