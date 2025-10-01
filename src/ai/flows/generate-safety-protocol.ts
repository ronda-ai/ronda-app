
'use server';

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const GenerateSafetyProtocolInputSchema = z.object({
  risk: z.string().describe("The specific risk to generate a protocol for (e.g., 'Earthquake', 'Fire', 'Bullying')."),
  language: z.string().describe('The language for the generated protocol (e.g., "en" or "es").'),
});
export type GenerateSafetyProtocolInput = z.infer<typeof GenerateSafetyProtocolInputSchema>;

const ProtocolStepSchema = z.object({
    text: z.string().describe("A single, clear, actionable step."),
});

const GenerateSafetyProtocolOutputSchema = z.object({
  title: z.string().describe("A clear and concise title for the action protocol."),
  beforeSteps: z.array(ProtocolStepSchema).describe("A list of preventive steps to take before the event occurs."),
  duringSteps: z.array(ProtocolStepSchema).describe("A list of clear, actionable steps to take during the event."),
  afterSteps: z.array(ProtocolStepSchema).describe("A list of recovery and follow-up steps to take after the event."),
});
export type GenerateSafetyProtocolOutput = z.infer<typeof GenerateSafetyProtocolOutputSchema>;

export async function generateSafetyProtocol(input: GenerateSafetyProtocolInput): Promise<GenerateSafetyProtocolOutput> {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateSafetyProtocolPrompt',
        input: { schema: GenerateSafetyProtocolInputSchema },
        output: { schema: GenerateSafetyProtocolOutputSchema },
        prompt: `You are a school safety expert and emergency planner. Your task is to generate a clear, concise, and actionable safety protocol for a specific risk.
The output MUST be in the specified language: {{language}}.

**Risk to Address:** "{{risk}}"

**Your Task:**
Generate a JSON object with four keys: "title", "beforeSteps", "duringSteps", and "afterSteps".

1.  **title**: Create a clear title for the protocol, such as "Action Protocol for: {{risk}}".
2.  **beforeSteps**: An array of objects, where each object has a "text" key containing a single preventive measure to be taken before the event. Generate 2-4 steps.
3.  **duringSteps**: An array of objects, where each object has a "text" key containing a clear, simple, direct instruction for what to do during the emergency. Use imperative verbs. Generate 3-5 steps.
4.  **afterSteps**: An array of objects, where each object has a "text" key containing a single step for recovery and follow-up after the event has concluded. Generate 2-4 steps.

**Example (risk: 'Fire'):**
{
  "title": "Action Protocol for: Fire",
  "beforeSteps": [
    { "text": "Know the evacuation routes from your classroom." },
    { "text": "Participate seriously in fire drills." },
    { "text": "Keep hallways and exits clear of obstacles." }
  ],
  "duringSteps": [
    { "text": "Activate the nearest fire alarm." },
    { "text": "Evacuate the building calmly and quickly using the designated route." }
  ],
  "afterSteps": [
    { "text": "Do not re-enter the building until authorized." },
    { "text": "Report any missing persons to your teacher immediately." }
  ]
}

Now, generate the action protocol for the specified risk.
`,
    });

    const { output } = await prompt(input, { model });
    if (!output) {
      throw new Error("AI failed to generate a valid safety protocol.");
    }
    return output;
}
