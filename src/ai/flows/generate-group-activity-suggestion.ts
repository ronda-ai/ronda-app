
'use server';

/**
 * @fileOverview Generates suggestions for group activities and formations.
 *
 * - `generateGroupActivitySuggestion`: Creates a list of suggested groups, skills, themes, and a teacher tip.
 * - `GenerateGroupActivitySuggestionInput`: The input type for the function.
 * - `GenerateGroupActivitySuggestionOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const StudentChallengeHistorySchemaForZod = z.object({
  challenge: z.string(),
  rating: z.enum(['needs-support', 'met-expectations', 'exceeded-expectations']).optional(),
  feedback: z.string().optional(),
  selectionMode: z.string().optional(),
});

const ObservationSchemaForZod = z.object({
    observation: z.string(),
    type: z.enum(['positive', 'negative', 'neutral', 'academic', 'social-emotional']),
    createdAt: z.string(),
});

const StudentSchemaForZod = z.object({
    id: z.string(),
    name: z.string(),
    qualities: z.array(z.string()),
    age: z.number().optional(),
    notes: z.string().optional(),
    fears: z.array(z.string()).optional(),
    disability: z.string().optional(),
    neurodiversity: z.string().optional(),
    goodRelations: z.array(z.string()).optional(),
    badRelations: z.array(z.string()).optional(),
    challengeHistory: z.array(StudentChallengeHistorySchemaForZod),
    observations: z.array(ObservationSchemaForZod).optional(),
});


const GenerateGroupActivitySuggestionInputSchema = z.object({
  students: z.array(StudentSchemaForZod).describe("The full list of students in the classroom."),
  language: z.string().describe('The language for the generated suggestions (e.g., "en" or "es").'),
});
export type GenerateGroupActivitySuggestionInput = z.infer<typeof GenerateGroupActivitySuggestionInputSchema>;


const GenerateGroupActivitySuggestionOutputSchema = z.object({
  suggestedGroups: z.array(z.array(z.string())).describe("An array of 2-3 suggested groups, where each group is an array of student names."),
  suggestedSkills: z.array(z.string()).describe("A list of 2-3 collaborative skills that would be beneficial for the groups to develop (e.g., 'Shared Leadership', 'Constructive Debate')."),
  suggestedThemes: z.array(z.string()).describe("A list of 2-3 engaging themes for group activities based on collective student interests."),
  teacherTip: z.string().describe("A concise, actionable tip for the teacher on how to facilitate the group dynamics, manage potential conflicts, or leverage positive relationships."),
});
export type GenerateGroupActivitySuggestionOutput = z.infer<typeof GenerateGroupActivitySuggestionOutputSchema>;


export async function generateGroupActivitySuggestion(
  input: GenerateGroupActivitySuggestionInput
): Promise<GenerateGroupActivitySuggestionOutput> {
  const result = await generateGroupActivitySuggestionFlow(input);
  if (!result?.teacherTip) {
    return {
        suggestedGroups: [["Ana", "Juan"], ["Sofia", "Carlos"]],
        suggestedSkills: ['collaboration', 'communication'],
        suggestedThemes: ["Jungle Adventure", "Building a City"],
        teacherTip: "Try to give each group a clear role to ensure everyone participates. For example, one student can be the 'builder' and the other the 'designer'."
    }
  }
  return result;
}

const generateGroupActivitySuggestionFlow = async (input: GenerateGroupActivitySuggestionInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateGroupActivitySuggestionPrompt',
        input: { schema: GenerateGroupActivitySuggestionInputSchema },
        output: { schema: GenerateGroupActivitySuggestionOutputSchema },
        prompt: `You are an expert educational psychologist and a master of classroom social dynamics. Your task is to analyze a list of students and suggest optimal group formations for collaborative activities.
Your primary goal is to foster a positive and productive learning environment. The suggestions should be subtle and aimed at improving relationships, not forcing them.

**Key Principles:**
1.  **Balance:** Create groups that are balanced in terms of skills and personalities. Avoid putting all the dominant students in one group.
2.  **Improve Dynamics:** If there are students with "bad relations", consider pairing them in a low-stakes, non-competitive task that requires cooperation. If that seems too risky, separate them. For students with "good relations", leverage their synergy by pairing them for more complex tasks.
3.  **Inclusivity:** Pay close attention to students' notes, disabilities, and neurodiversities to create a psychologically safe environment for them.
4.  **Actionable Advice:** The teacher tip MUST be concrete, practical, and focus on managing the group dynamics.

The suggestions you generate MUST be in the following language: {{language}}.

**Classroom Roster:**
{{#each students}}
- **Name:** {{name}}
  - **Qualities/Interests:** {{#each qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  - **Social Relations:**
    - Good with: {{#if goodRelations.length}}{{#each goodRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
    - Bad with: {{#if badRelations.length}}{{#each badRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
  - **Notes (Disability/Neurodiversity/Fears/etc.):** {{#if notes}}{{notes}}. {{/if}}{{#if disability}}{{disability}}. {{/if}}{{#if neurodiversity}}{{neurodiversity}}. {{/if}}{{#if fears}}Fears: {{#each fears}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}. {{/if}}
  - **Recent Observations:**
    {{#if observations.length}}
      {{#each observations}} - [{{type}}] "{{observation}}"
      {{/each}}
    {{else}}
     - No specific observations.
    {{/if}}
  - **Performance in Group Challenges:**
    {{#if challengeHistory.length}}
        {{#each challengeHistory}}
        - In "{{this.challenge}}", received a '{{this.rating}}' rating. Teacher feedback: "{{this.feedback}}"
        {{/each}}
    {{else}}
     - No relevant group challenge history.
    {{/if}}
{{/each}}

**Your Task:**
Generate a JSON object with four keys: "suggestedGroups", "suggestedSkills", "suggestedThemes", and "teacherTip".

1.  **suggestedGroups:** Propose 2-3 distinct group configurations (pairs or trios). Provide just the names.
2.  **suggestedSkills:** Suggest 2-3 collaborative skills for the activities (e.g., "Active Listening", "Shared Leadership", "Giving Constructive Feedback").
3.  **suggestedThemes:** Suggest 2-3 creative themes based on the combined interests of the students.
4.  **teacherTip:** Provide one single, powerful tip for the teacher to effectively manage these groups.

**Example:**
*Input Context:* Carlos (shy) has a bad relation with Martina (dominant). Ana works well with Carlos.
*Output (JSON):*
{
  "suggestedGroups": [
    ["Carlos", "Ana"],
    ["Martina", "Sofia"]
  ],
  "suggestedSkills": ["Role negotiation", "Shared problem-solving"],
  "suggestedThemes": ["Mystery Solving", "Inventing a new sport"],
  "teacherTip": "For the group with Martina and Sofia, consider assigning clear roles like 'Lead Investigator' and 'Scribe' to ensure Martina doesn't dominate the task. This gives Sofia a defined space to contribute."
}

Now, generate your analysis and suggestions for the provided classroom roster.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};
