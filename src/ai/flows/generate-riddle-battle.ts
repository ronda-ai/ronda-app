
'use server';

/**
 * @fileOverview Generates two unique riddles for a classroom game.
 *
 * - `generateRiddleBattle`: Creates a pair of riddles on a given topic.
 * - `GenerateRiddleBattleInput`: The input type for the function.
 * - `GenerateRiddleBattleOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const BattleHistoryItemSchema = z.object({
  topic: z.string().optional(),
  teamBlueRiddle: z.string(),
  teamRedRiddle: z.string(),
  winner: z.string().optional(),
  feedback: z.string().optional(),
  mood: z.string().optional(),
});


const GenerateRiddleBattleInputSchema = z.object({
  topic: z.string().optional().describe('An optional topic for the riddles (e.g., "animals", "history", "science"). If not provided, the riddles will be general.'),
  language: z.string().describe('The language for the generated riddles (e.g., "en" or "es").'),
  ageOrGrade: z.string().optional().describe('The age or grade level of the students, for context (e.g., "9 years old", "4th Grade").'),
  battleHistory: z.array(BattleHistoryItemSchema).optional().describe("A list of recent battles, including feedback, to help the AI understand what works well for this class."),
});
export type GenerateRiddleBattleInput = z.infer<typeof GenerateRiddleBattleInputSchema>;

const GenerateRiddleBattleOutputSchema = z.object({
  teamBlueRiddle: z.string().describe("A unique, creative, and age-appropriate riddle for Team Blue."),
  teamBlueAnswer: z.string().describe("The answer to Team Blue's riddle."),
  teamRedRiddle: z.string().describe("A unique, creative, and age-appropriate riddle for Team Red. It must be different from Team Blue's riddle."),
  teamRedAnswer: z.string().describe("The answer to Team Red's riddle."),
});
export type GenerateRiddleBattleOutput = z.infer<typeof GenerateRiddleBattleOutputSchema>;


export async function generateRiddleBattle(
  input: GenerateRiddleBattleInput
): Promise<GenerateRiddleBattleOutput> {
  const result = await generateRiddleBattleFlow(input);
  if (!result?.teamBlueRiddle) {
    // Fallback in case of AI failure
    if (input.language === 'es') {
        return {
            teamBlueRiddle: "Tengo ciudades, pero no casas. Tengo montañas, pero no árboles. Tengo agua, pero no peces. ¿Qué soy?",
            teamBlueAnswer: "Un mapa",
            teamRedRiddle: "Vuelo de día, de noche y no tengo plumas. ¿Qué soy?",
            teamRedAnswer: "El tiempo"
        }
    }
    return {
        teamBlueRiddle: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        teamBlueAnswer: "A map",
        teamRedRiddle: "What has an eye, but cannot see?",
        teamRedAnswer: "A needle"
    }
  }
  return result;
}

const generateRiddleBattleFlow = async (input: GenerateRiddleBattleInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateRiddleBattlePrompt',
        input: { schema: GenerateRiddleBattleInputSchema },
        output: { schema: GenerateRiddleBattleOutputSchema },
        prompt: `You are a fun and creative game master for an elementary school classroom. Your task is to generate a "Riddle Battle" for two teams, Team Blue and Team Red.
You must create two distinct, clever, and age-appropriate riddles. They should be challenging but solvable for the specified age group.
The riddles and answers MUST be in the following language: {{language}}.

**Context:**
{{#if topic}}
- **Riddle Topic:** {{topic}}
- **Instruction:** Both riddles must be related to this topic.
{{else}}
- **Riddle Topic:** General Knowledge
{{/if}}
{{#if ageOrGrade}}
- **Age/Grade Level:** {{ageOrGrade}}
- **Instruction:** CRITICAL - The complexity, vocabulary, and concepts of the riddles MUST be appropriate for this age/grade level.
{{/if}}

{{#if battleHistory.length}}
**Past Battle History & Feedback:**
You have access to the history of previous battles. Analyze this to improve your riddle generation.
- If feedback is positive and the mood is 'fun' or 'collaborative', consider creating similar types of riddles.
- If feedback is negative or the mood is 'tense', try a different style or topic.
- Learn from what has worked well before to make the game as engaging as possible.

{{#each battleHistory}}
- **Battle on Topic '{{this.topic}}'**:
  - Winner: {{this.winner}}
  - Mood: {{this.mood}}
  - Teacher Feedback: "{{this.feedback}}"
{{/each}}
{{/if}}

**Your Task:**
Generate a JSON object containing two unique riddles and their corresponding answers, one for each team.

**Example (Topic: Animals, Age: 7):**
{
  "teamBlueRiddle": "I have a long trunk, but I'm not a tree. I have big ears, but I can't hear you gossip. I'm very heavy, but I'm not a whale. What am I?",
  "teamBlueAnswer": "An elephant",
  "teamRedRiddle": "I wear a tuxedo, but I don't go to parties. I live in the cold, but I love to slide. I can't fly, but I can swim. What am I?",
  "teamRedAnswer": "A penguin"
}

Now, generate a new Riddle Battle based on the provided context.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};
