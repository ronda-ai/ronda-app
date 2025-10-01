
'use server';

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'zod';

const ScenarioChoiceSchema = z.object({
  text: z.string().describe("A brief, actionable choice for the teacher."),
});

const ScenarioEvaluationSchema = z.object({
    isCorrect: z.enum(['good', 'average', 'bad']).describe("An evaluation of the user's last action."),
    feedback: z.string().describe("Constructive feedback explaining WHY the action was good, average, or bad, based on the MBE."),
    mbeCriterias: z.array(z.string()).describe("A list of 1-3 specific MBE criteria codes (e.g., 'B1', 'C4') relevant to the feedback."),
});

const ClassroomClimateScenarioInputSchema = z.object({
  language: z.string().describe('The language for the generated scenario (e.g., "en" or "es").'),
  studentAliases: z.array(z.string()).describe("A list of anonymized student names to use in the scenario."),
  scenarioDescription: z.string().optional().describe("A description of the classroom situation to simulate. This is the starting point."),
  simulationLength: z.enum(['short', 'medium', 'complex']).optional().default('medium').describe("The desired length of the simulation (short: ~3-4 interactions, medium ~5-6, complex ~7-8)."),
  history: z.array(z.object({
      role: z.enum(['user', 'model']),
      text: z.string(),
      evaluation: ScenarioEvaluationSchema.optional(),
  })).optional().describe("The history of the simulation conversation."),
});

const ClassroomClimateScenarioOutputSchema = z.object({
  evaluation: ScenarioEvaluationSchema.optional().describe("Evaluation of the user's most recent action. Omit for the first turn."),
  narrative: z.string().describe("The AI's response describing the new situation and consequences."),
  choices: z.array(ScenarioChoiceSchema).max(4).describe("A list of 2 to 4 distinct choices for the teacher to make next. Should be an empty array if isFinalStep is true."),
  isFinalStep: z.boolean().describe("Whether this is the final step of the simulation."),
  finalSummary: z.string().optional().describe("If this is the final step, a summary of the overall performance and key takeaways."),
});


export type ClassroomClimateScenarioInput = z.infer<typeof ClassroomClimateScenarioInputSchema>;
export type ClassroomClimateScenarioOutput = z.infer<typeof ClassroomClimateScenarioOutputSchema>;

export async function generateClassroomClimateScenario(input: ClassroomClimateScenarioInput): Promise<ClassroomClimateScenarioOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generateClassroomClimateScenarioPrompt',
      input: { schema: ClassroomClimateScenarioInputSchema },
      output: { schema: ClassroomClimateScenarioOutputSchema },
      prompt: `You are an expert pedagogical coach specializing in classroom management and social-emotional learning. Your task is to create an interactive, role-playing training scenario for a teacher based on the Chilean "Marco para la Buena Enseñanza" (MBE). The entire simulation MUST be in the language: {{language}}.

**Persona:** You are the simulation narrator. Your tone should be descriptive and insightful, like a supportive mentor. Your goal is to help the teacher practice their decision-making in a safe environment.

**MBE Criteria Reference (Focus on Domain B & C):**
- **B1:** Establish a climate of respectful relationships.
- **B2:** Show high expectations for all students.
- **B3:** Establish and maintain consistent classroom norms.
- **B4:** Establish an organized work environment.
- **C1:** Communicate class objectives.
- **C2:** Use varied teaching strategies.
- **C4:** Optimize available time for teaching.
- **C8:** Promote critical and creative thinking.

**Simulation Length:** "{{simulationLength}}" (short is ~3-4 interactions, medium ~5-6, complex ~7-8). You should guide the scenario towards a natural conclusion within this length.

**Student Aliases to use:** {{#each studentAliases}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

**Scenario History (if any):**
{{#each history}}
- **{{#if (eq role 'user')}}Teacher{{else}}Coach (You){{/if}}:** "{{text}}"
  {{#if evaluation}}
  - **Evaluation:** {{evaluation.feedback}} (Criteria: {{#each evaluation.mbeCriterias}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}})
  {{/if}}
{{/each}}
{{#unless history}}
This is the first step of the simulation.
{{/unless}}

---
**YOUR TASK:**

1.  **IF THIS IS THE VERY FIRST TURN (no history):**
    a.  Omit the 'evaluation' object. This is critical.
    b.  Generate an initial classroom management scenario based on the teacher's description: "{{#if scenarioDescription}}{{scenarioDescription}}{{else}}A common classroom disruption{{/if}}". Describe the scene and what the teacher perceives. Use at least two of the provided student aliases.
    c.  Provide 3-4 clear, distinct choices for their first action. These choices should represent different pedagogical approaches (e.g., direct, indirect, group-focused).
    d. Set \`isFinalStep\` to \`false\`.

2.  **IF THIS IS ANY SUBSEQUENT TURN (history exists):**
    a.  **Evaluate the Teacher's Last Action:** The last entry in the history is always the user's choice. Analyze it based on the MBE criteria (especially Domain B and C).
        - Set \`evaluation.isCorrect\` to 'good', 'average', or 'bad'. 'Good' choices align well with MBE. 'Bad' choices might escalate the situation or ignore a key pedagogical principle.
        - Provide concise, constructive \`evaluation.feedback\` explaining *why* the choice was good, average, or bad, explicitly referencing 1-2 MBE criteria codes (e.g., "This aligns well with B1...").
        - Populate the \`evaluation.mbeCriterias\` array with the codes you referenced (e.g., ["B1", "C4"]).
    b.  **Narrate the Consequence:** Describe the result of the teacher's action. The situation MUST evolve realistically. Good choices should de-escalate or resolve the issue. Bad choices might worsen it but should still offer a path to recovery.
    c.  **Check for End State:** If the situation has reached a natural conclusion (either resolved or clearly concluded) OR the history length is approaching the target for a '{{simulationLength}}' simulation, set \`isFinalStep\` to \`true\`.
        - Provide a helpful \`finalSummary\` of the teacher's overall performance, key takeaways, and suggestions for improvement.
        - Set \`choices\` to an empty array.
    d.  **Provide New Choices:** If the simulation is not over, set \`isFinalStep\` to \`false\` and present 2-4 new, distinct actions the teacher can take in the new situation.

**Example (First Turn):**
{
  "narrative": "You are explaining fractions at the whiteboard. You notice Student A whispering and laughing with Student B, and a couple of students nearby seem distracted by them.",
  "choices": [
    { "text": "Stop the class and publicly reprimand Student A and Student B." },
    { "text": "Walk closer to their desks while continuing to speak, making eye contact with them." },
    { "text": "Ignore it for now and plan to speak with them privately after class." }
  ],
  "isFinalStep": false
}

**Example (Subsequent Turn, User chose option 2):**
{
  "evaluation": {
    "isCorrect": "good",
    "feedback": "Excellent choice. This is a subtle and effective way to manage behavior without disrupting the entire class, maintaining a respectful environment (B1) and optimizing learning time (C4).",
    "mbeCriterias": ["B1", "C4"]
  },
  "narrative": "As you get closer, Student A and Student B stop talking and refocus on your explanation. The other students also settle down. You now have the class's full attention again. You finish explaining the concept of equivalent fractions.",
  "choices": [
    { "text": "Ask the whole class a comprehension-check question." },
    { "text": "Assign a quick practice problem for students to solve individually." },
    { "text": "Move directly into the next part of the lesson." }
  ],
  "isFinalStep": false
}

Now, generate the next step of the simulation.
`,
  });

  const { output } = await prompt(input, { model });
  if (!output) {
    throw new Error("AI failed to generate a valid classroom climate scenario step.");
  }
  return output;
}

      