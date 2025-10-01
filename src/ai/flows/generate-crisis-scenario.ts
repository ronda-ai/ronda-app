
'use server';

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'zod';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';

const CrisisScenarioChoiceSchema = z.object({
  text: z.string().describe("A brief description of a possible action the teacher can take."),
});

const SimulationLengthSchema = z.enum(['short', 'medium', 'complex']);
export type SimulationLength = z.infer<typeof SimulationLengthSchema>;

const GenerateCrisisScenarioInputSchema = z.object({
  language: z.string().describe('The language for the generated scenario (e.g., "en" or "es").'),
  crisisType: z.string().describe("The type of crisis to simulate (e.g., 'earthquake', 'fire', 'active intruder', 'medical emergency')."),
  simulationLength: SimulationLengthSchema.optional().default('medium').describe("The desired length of the simulation (short: ~5 turns, medium: ~10, complex: ~15)."),
  students: z.array(z.custom<Partial<StudentDTO>>()).optional().describe("An array of students involved in the scenario, to add realism."),
  history: z.array(z.object({
      role: z.enum(['user', 'model']),
      text: z.string(),
      evaluation: z.object({
          isCorrect: z.enum(['good', 'average', 'bad']),
          feedback: z.string(),
          scoreChange: z.number(),
      }).optional(),
  })).optional().describe("The history of the simulation conversation. 'user' is the teacher's choice, 'model' is the AI's response."),
  currentScore: z.number().optional().default(0).describe("The current score of the user in the simulation."),
});
export type GenerateCrisisScenarioInput = z.infer<typeof GenerateCrisisScenarioInputSchema>;

const GenerateCrisisScenarioOutputSchema = z.object({
  evaluation: z.object({
    isCorrect: z.enum(['good', 'average', 'bad']).describe("An evaluation of the user's last action: 'good' for a correct decision, 'average' for a partially correct or improvable one, and 'bad' for an incorrect or dangerous one."),
    feedback: z.string().describe("Constructive feedback explaining WHY the action was good, average, or bad, based on established safety protocols."),
    scoreChange: z.number().describe("The change in score resulting from the last action (e.g., +10, -5, 0)."),
  }).optional().describe("Evaluation of the user's most recent action. This should be omitted for the very first turn when there is no user action yet."),
  narrative: z.string().describe("The AI's response describing the new situation and consequences based on the user's last action."),
  choices: z.array(CrisisScenarioChoiceSchema).min(2).max(4).describe("A list of 2 to 4 distinct choices for the teacher to make next."),
  isFinalStep: z.boolean().describe("Whether this is the final step of the simulation."),
  finalSummary: z.string().optional().describe("If this is the final step, a summary of the overall performance and key takeaways."),
});
export type GenerateCrisisScenarioOutput = z.infer<typeof GenerateCrisisScenarioOutputSchema>;

export async function generateCrisisScenario(input: GenerateCrisisScenarioInput): Promise<GenerateCrisisScenarioOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateCrisisScenarioPrompt',
      input: { schema: GenerateCrisisScenarioInputSchema },
      output: { schema: GenerateCrisisScenarioOutputSchema },
      prompt: `You are an expert school safety simulator. Your task is to create an interactive, role-playing training scenario for a teacher. The entire simulation MUST be in the language: {{language}}.

**Persona:** You are the simulation narrator. Your tone should be serious and descriptive. Your goal is to train, not just to create drama. A positive outcome is possible with good decisions.

**Simulation Parameters:**
- **Crisis Type:** "{{crisisType}}"
- **Simulation Length:** "{{simulationLength}}" (short is ~5 interactions, medium ~10, complex ~15). You MUST conclude the simulation within this length.
- **Current Score:** {{currentScore}}

{{#if students.length}}
**Students Involved:** These students are in your class. Use their profiles to add realism. A student with 'fears' might react differently.
{{#each students}}
- **{{name}}:** Qualities: {{#each qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}. Fears: {{#if fears.length}}{{#each fears}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}.
{{/each}}
{{/if}}

**Scenario History:**
{{#each history}}
- **{{role}}:** "{{text}}"
{{/each}}
{{#unless history}}
This is the first step of the simulation.
{{/unless}}

---
**YOUR TASK:**

1.  **IF THIS IS THE VERY FIRST TURN (no history):**
    a.  Omit the 'evaluation' object. This is critical.
    b.  Generate the initial scenario narrative. Describe the scene and what the teacher perceives.
    c.  Provide 2-4 clear, distinct choices for their first action.
    d.  Set \`isFinalStep\` to \`false\`.

2.  **IF THIS IS ANY SUBSEQUENT TURN (history exists):**
    a.  **Evaluate the Teacher's Last Action:** The last entry in the history is always the user's choice. Analyze it. Based on official safety protocols for "{{crisisType}}", evaluate the action.
        - Set \`evaluation.isCorrect\` to 'good', 'average', or 'bad'. 'Good' choices follow best practices, 'bad' choices are dangerous.
        - Provide concise, constructive \`evaluation.feedback\` explaining *why* the choice was good or bad.
        - Assign a \`evaluation.scoreChange\` (e.g., +10 for a great choice, -5 for a poor one, 0 for a neutral one).
    b.  **Narrate the Consequence:** Describe the result of the teacher's action. The situation MUST evolve. Good choices should lead toward a positive resolution. Bad choices can worsen the situation but should offer a chance for recovery.
    c.  **Check for End State:** If the simulation has reached its natural conclusion OR the history is approaching the target length for a '{{simulationLength}}' simulation, set \`isFinalStep\` to \`true\`.
        - Provide a helpful \`finalSummary\` of the teacher's overall performance, key takeaways, and suggestions for improvement.
        - Do NOT provide new choices.
    d.  **Provide New Choices:** If the simulation is not over, present 2-4 new, distinct actions the teacher can take in the new situation.

**Example (Crisis: Fire, User just chose 'Evacuate'):**
{
  "evaluation": {
    "isCorrect": "good",
    "feedback": "Correct. Evacuating immediately is the right protocol. Checking the hallway first is a crucial safety step.",
    "scoreChange": 10
  },
  "narrative": "You open the classroom door and see light smoke in the hallway. The primary evacuation route to the west staircase is visibly hazy. Your students are lined up behind you, waiting for your instruction. The alarm continues to ring.",
  "choices": [
    { "text": "Proceed cautiously down the primary, hazy route." },
    { "text": "Turn back and use the clear secondary evacuation route at the east end of the hall." },
    { "text": "Return to the classroom, seal the door, and wait for rescue." }
  ],
  "isFinalStep": false
}

Now, generate the next step of the simulation.
`,
  });

  const { output } = await prompt(input, { model });
  if (!output) {
    throw new Error("AI failed to generate a valid crisis scenario step.");
  }
  return output;
}
