
'use server';

/**
 * @fileOverview Generates a structured debate scenario for classroom use.
 * 
 * - `generateDebate`: Creates a debate topic with stances, guiding questions, rules, and a turn structure.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const TurnSchema = z.object({
  team: z.enum(['affirmative', 'negative', 'both', 'teacher']).describe("The team whose turn it is to speak ('affirmative', 'negative'), if it's a general discussion ('both'), or a teacher-led moment ('teacher')."),
  type: z.string().describe("The type of intervention (e.g., 'Opening Statement', 'Rebuttal', 'Cross-Examination', 'Closing Statement')."),
  durationSeconds: z.number().describe("The suggested duration for this turn in seconds."),
});

const GenerateDebateInputSchema = z.object({
  topic: z.string().describe('The academic or social topic for the debate.'),
  language: z.string().describe('The language for the generated debate (e.g., "en" or "es").'),
  complexity: z.enum(['beginner', 'intermediate', 'advanced']).describe('The complexity level of the arguments and vocabulary (beginner, intermediate, advanced).'),
  ageOrGrade: z.string().optional().describe("The age or grade level of the students. This is CRITICAL for adapting the debate's complexity and themes."),
  country: z.string().optional().describe("The country where the class is located, for cultural and contextual relevance."),
});

const GenerateDebateOutputSchema = z.object({
  topic: z.string().describe('The main debate topic, phrased as a clear, debatable question.'),
  affirmativeStance: z.string().describe('A clear and concise statement for the team arguing in favor of the topic.'),
  negativeStance: z.string().describe('A clear and concise statement for the team arguing against the topic.'),
  guidingQuestions: z.array(z.string()).min(3).max(5).describe('A list of 3-5 neutral, open-ended questions to guide the debate and help students structure their arguments.'),
  rules: z.array(z.string()).min(3).max(4).describe('A list of 3-4 simple, clear rules for the debate (e.g., "Respect each other\'s opinions", "Speak one at a time").'),
  turnStructure: z.array(TurnSchema).min(4).max(7).describe("A structured sequence of turns for the debate, including team, type, and duration."),
});

export async function generateDebate(
  input: z.infer<typeof GenerateDebateInputSchema>
): Promise<z.infer<typeof GenerateDebateOutputSchema>> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateDebatePrompt',
      input: { schema: GenerateDebateInputSchema },
      output: { schema: GenerateDebateOutputSchema },
      prompt: `You are an expert debate coach and educator. Your task is to create a structured, engaging, and age-appropriate debate scenario for a classroom.
The entire output MUST be in the specified language: {{language}}.

**CRITICAL CONTEXT:**
- **Age/Grade Level:** {{#if ageOrGrade}}{{ageOrGrade}}{{else}}Not specified{{/if}}
- **Country:** {{#if country}}{{country}}{{else}}Not specified{{/if}}
**Instruction:** You MUST adapt the vocabulary, argument depth, and examples to be suitable for the specified age, grade, and cultural context.

**Debate Topic:** {{topic}}
**Complexity Level:** {{complexity}} (Adapt vocabulary and argument depth accordingly. 'Beginner' should be very simple, 'advanced' can use more complex terms).

**Your Task:**
Generate a JSON object with the following structure:
1.  **topic**: Rephrase the provided topic as a clear, neutral, and debatable question.
2.  **affirmativeStance**: A concise, one-sentence statement for the team arguing FOR the motion.
3.  **negativeStance**: A concise, one-sentence statement for the team arguing AGAINST the motion.
4.  **guidingQuestions**: An array of 3-5 open-ended, neutral questions to help students prepare and structure their arguments. These should encourage critical thinking.
5.  **rules**: An array of 3-4 simple, positive rules for conducting a respectful and orderly debate.
6.  **turnStructure**: An array of 4 to 7 objects representing the debate's flow. Each object should have 'team', 'type', and 'durationSeconds'. A standard debate includes opening statements, rebuttals, and closing statements for each team.

**Example (language: en, topic: "School uniforms", complexity: intermediate):**
{
  "topic": "Should all students be required to wear a school uniform?",
  "affirmativeStance": "School uniforms create a more equal and focused learning environment.",
  "negativeStance": "School uniforms limit students' ability to express their individual identity.",
  "guidingQuestions": [
    "How do uniforms affect a student's sense of belonging?",
    "In what ways can clothing be a distraction in school?",
    "What is the connection between personal choice and responsibility?"
  ],
  "rules": [
    "Listen respectfully when someone else is speaking.",
    "Use facts and examples to support your points.",
    "Attack the idea, not the person."
  ],
  "turnStructure": [
    { "team": "affirmative", "type": "Opening Statement", "durationSeconds": 120 },
    { "team": "negative", "type": "Opening Statement", "durationSeconds": 120 },
    { "team": "affirmative", "type": "Rebuttal", "durationSeconds": 90 },
    { "team": "negative", "type": "Rebuttal", "durationSeconds": 90 },
    { "team": "teacher", "type": "Moderated Q&A", "durationSeconds": 180 },
    { "team": "affirmative", "type": "Closing Statement", "durationSeconds": 60 },
    { "team": "negative", "type": "Closing Statement", "durationSeconds": 60 }
  ]
}

Now, generate the debate scenario based on the provided inputs.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output?.topic) {
    const isSpanish = input.language === 'es';
    return {
      topic: isSpanish ? '¿Deberían los zoológicos seguir existiendo?' : 'Should zoos continue to exist?',
      affirmativeStance: isSpanish ? 'Los zoológicos son esenciales para la conservación de especies y la educación.' : 'Zoos are essential for species conservation and education.',
      negativeStance: isSpanish ? 'Los zoológicos son perjudiciales para el bienestar de los animales y deberían ser reemplazados por santuarios.' : 'Zoos are harmful to animal welfare and should be replaced by sanctuaries.',
      guidingQuestions: [
          isSpanish ? '¿Cuál es el propósito principal de un zoológico?' : 'What is the main purpose of a zoo?',
          isSpanish ? '¿Cómo impacta un zoológico en un animal salvaje?' : 'How does a zoo impact a wild animal?',
      ],
      rules: [
          isSpanish ? 'Habla uno a la vez.' : 'Speak one at a time.',
          isSpanish ? 'Respeta las opiniones de los demás.' : 'Respect others\' opinions.',
      ],
      turnStructure: [
          { team: 'affirmative', type: isSpanish ? 'Declaración de Apertura' : 'Opening Statement', durationSeconds: 120 },
          { team: 'negative', type: isSpanish ? 'Declaración de Apertura' : 'Opening Statement', durationSeconds: 120 },
          { team: 'affirmative', type: isSpanish ? 'Refutación' : 'Rebuttal', durationSeconds: 90 },
          { team: 'negative', type: isSpanish ? 'Refutación' : 'Rebuttal', durationSeconds: 90 },
      ]
    }
  }

  return output;
}
