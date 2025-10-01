
'use server';

/**
 * @fileOverview Generates a full plan for a lightning round game.
 *
 * - `generateLightningRound`: Creates a sequence of challenges for students.
 * - `GenerateLightningRoundInput`: The input type for the function.
 * - `GenerateLightningRoundOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const ChallengeSchema = z.object({
  studentName: z.string().describe("The name or alias of the student who will perform the challenge."),
  challenge: z.string().describe("A very short, fun, physical action for the student to perform immediately. It should be a direct command."),
});

const PastRoundSchema = z.object({
    plan: z.array(ChallengeSchema)
});

const GenerateLightningRoundInputSchema = z.object({
  students: z.array(z.string()).describe("A list of all present students (as aliases) who can participate."),
  duration: z.number().describe("The total duration of the game in seconds."),
  interval: z.number().describe("The interval in seconds between each challenge."),
  category: z.enum(['sound', 'face', 'gesture', 'imitation']).describe("The category of challenges to generate."),
  language: z.string().describe('The language for the generated challenges (e.g., "en" or "es").'),
  customPrompt: z.string().optional().describe('An additional instruction from the teacher to guide the AI.'),
  negativePrompt: z.string().optional().describe('A prompt describing what the AI should avoid generating.'),
  roundHistory: z.array(PastRoundSchema).optional().describe("A list of past rounds to ensure variety.")
});
export type GenerateLightningRoundInput = z.infer<typeof GenerateLightningRoundInputSchema>;

const InternalLightningRoundInputSchema = GenerateLightningRoundInputSchema.extend({
    numberOfChallenges: z.number(),
});

const GenerateLightningRoundOutputSchema = z.object({
  plan: z.array(ChallengeSchema).describe("The full sequence of challenges for the lightning round."),
});
export type GenerateLightningRoundOutput = z.infer<typeof GenerateLightningRoundOutputSchema>;

export async function generateLightningRound(
  input: GenerateLightningRoundInput
): Promise<GenerateLightningRoundOutput> {
  const result = await generateLightningRoundFlow(input);
  if (!result?.plan || result.plan.length === 0) {
    // Fallback in case of AI failure
    const numberOfChallenges = Math.floor(input.duration / input.interval);
    const plan = Array.from({ length: numberOfChallenges }).map(() => ({
        studentName: input.students[Math.floor(Math.random() * input.students.length)],
        challenge: input.language === 'es' ? "¡Sonríe a un compañero!" : "Smile at a classmate!"
    }));
    return { plan };
  }
  return result;
}

const generateLightningRoundFlow = async (input: GenerateLightningRoundInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const numberOfChallenges = Math.floor(input.duration / input.interval);

    const prompt = ai.definePrompt({
        name: 'generateLightningRoundPrompt',
        input: { schema: InternalLightningRoundInputSchema },
        output: { schema: GenerateLightningRoundOutputSchema },
        prompt: `You are a super fun, energetic, and slightly wacky game show host for a kids' classroom game.
Your job is to create a full game plan for a "Lightning Round".

**Game Rules:**
- The game will last for a total of {{duration}} seconds.
- A new challenge will be presented every {{interval}} seconds.
- This means you need to generate a list of approximately {{numberOfChallenges}} challenges.
- The challenges MUST be in the language: **{{language}}**.
- All challenges MUST fit the category: **{{category}}**.
- The participants are identified by these aliases: {{#each students}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.

{{#if customPrompt}}- **Teacher's Guidance:** You MUST follow this instruction: {{customPrompt}}{{/if}}
{{#if negativePrompt}}- **Things to Avoid:** You MUST avoid the following: {{negativePrompt}}{{/if}}
{{#if roundHistory.length}}
- **Recent History:** The following challenges have been used in recent rounds. Avoid repeating them.
{{#each roundHistory}}
    {{#each this.plan}}
    - "{{this.challenge}}"
    {{/each}}
{{/each}}
{{/if}}

**Your Task:**
Create a JSON object containing a "plan" which is an array of challenge objects. Each object must have a "studentName" (which MUST be one of the provided aliases) and a "challenge".
- Distribute the challenges fairly among the student aliases. Try not to repeat a student too many times in a row.
- Ensure the challenges are varied, creative, simple, and silly.
- The challenges must be things a student can do in 3-5 seconds from their seat.

**Category Examples:**
- **sound:** "Make a rooster crow!", "Whisper the word 'butterfly'", "Hum your favorite song"
- **face:** "Wink with your left eye", "Puff your cheeks like a fish", "Raise one eyebrow"
- **gesture:** "Give two thumbs up", "Make a peace sign", "Pretend to juggle"
- **imitation:** "Act like a sleepy cat", "Pretend you're lifting something very heavy", "Imitate a robot walking"

Now, generate the full game plan for the lightning round.
`
    });

    const { output } = await prompt({ ...input, numberOfChallenges }, { model });
    return output!;
};
