
'use server';
/**
 * @fileOverview Generates guided reflection questions for a teacher based on their thoughts about a class.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'zod';
import type { ReflectionGuidanceInput, ReflectionGuidanceOutput } from '@/modules/teacher-lab/application/dtos/reflection-guidance.dto';

const ReflectionGuidanceInputSchema = z.object({
  teacherReflection: z.string().describe("The teacher's free-form thoughts and feelings about a specific class or situation."),
  history: z.array(z.object({
      role: z.enum(['user', 'model']),
      text: z.string(),
  })).optional().describe("The history of the reflective conversation so far."),
  language: z.string().describe("The language for the generated questions."),
});

const ReflectionGuidanceOutputSchema = z.object({
  guidance: z.string().describe("The AI's response, which should be a set of 1-2 Socratic questions to guide the teacher's reflection, citing MBE criteria."),
});


export async function generateReflectionGuidance(input: ReflectionGuidanceInput): Promise<ReflectionGuidanceOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateReflectionGuidancePrompt',
      input: { schema: ReflectionGuidanceInputSchema },
      output: { schema: ReflectionGuidanceOutputSchema },
      prompt: `You are a master pedagogical coach, an expert in the Chilean "Marco para la Buena Enseñanza" (MBE). Your role is to act as a supportive, Socratic mentor for a teacher.
Your task is NOT to give solutions, but to ask insightful, open-ended questions that guide the teacher to reflect on their own practice and find their own answers.

**CRITICAL INSTRUCTION: Your entire response MUST be in the language: {{language}}.**

**Teacher's Reflection:**
"{{teacherReflection}}"

**Conversation History (if any):**
{{#each history}}
- **{{#if (eq role 'user')}}Teacher{{else}}Coach (You){{/if}}:** "{{text}}"
{{/each}}

**Your Task:**
Read the teacher's reflection and the conversation history. Based on this, generate a response containing 1-2 thoughtful, guiding questions. Your questions MUST connect the teacher's reflection to specific criteria of the MBE.

**MBE Criteria Reference (Abbreviated):**
- **Domain A (Preparation):** A1 (Content), A2 (Knows Students), A3 (Didactics), A4 (Coherence), A5 (Evaluation Plan).
- **Domain B (Environment):** B1 (Respect), B2 (High Expectations), B3 (Norms), B4 (Organization).
- **Domain C (Teaching):** C1 (Objectives), C2 (Strategies), C3 (Depth), C4 (Time), C5 (Thinking Skills), C6 (Monitoring).
- **Domain D (Professionalism):** D1 (Reflection), D2 (Collaboration), D3 (Guidance), D4 (Families), D5 (Policies).

**Example:**
*Teacher's Reflection:* "My class today was a disaster. The students were completely bored during my lecture on the French Revolution."

*Your Output (JSON):*
{
  "guidance": "Entiendo, esos días pueden ser frustrantes. Es una gran oportunidad para reflexionar (D1). Mencionas que estaban aburridos. Pensando en la preparación (Dominio A), ¿cómo crees que la actividad se conectó con los intereses y conocimientos previos de tus estudiantes (A2)? Y mirando hacia la enseñanza (Dominio C), ¿qué tipo de preguntas podrías haber hecho durante la clase para fomentar un pensamiento más activo (C8)?"
}

Now, generate your next guiding question(s) for the teacher.
`,
  });

  const { output } = await prompt(input, { model });
  if (!output) {
    throw new Error("AI failed to generate a valid guidance response.");
  }
  return output;
}
