
'use server';
/**
 * @fileOverview Generates strategic teams and roles for a Project-Based Learning (PBL) project.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const TeamMemberSchema = z.object({
  name: z.string().describe("The anonymized name of the student."),
  role: z.string().describe("A specific, project-relevant role assigned to this student (e.g., 'Project Manager', 'Lead Researcher', 'Creative Director')."),
  justification: z.string().describe("A brief, evidence-based justification for why this student is a good fit for this role, referencing their qualities or past performance."),
});

const TeamSchema = z.object({
  teamName: z.string().describe("A creative and thematic name for the team (e.g., 'The Eco-Innovators', 'The Time Travelers')."),
  members: z.array(TeamMemberSchema).describe("An array of the members in this team, each with an assigned role."),
  rationale: z.string().describe("A brief explanation of the strategic thinking behind this team's composition, referencing the selected grouping criteria."),
});

const GeneratePblTeamsInputSchema = z.object({
  projectTopic: z.string(),
  projectSkills: z.array(z.string()),
  teamSize: z.number().int().min(2),
  criteria: z.enum(['balanced', 'social-remediation', 'synergy']),
  students: z.array(z.object({
    id: z.string(),
    name: z.string(),
    qualities: z.array(z.string()),
    fears: z.array(z.string()).optional(),
    goodRelations: z.array(z.string()).optional(),
    badRelations: z.array(z.string()).optional(),
  })),
  language: z.string(),
  ageOrGrade: z.string().optional().describe("The age or grade level of the students. THIS IS A CRITICAL piece of context."),
});
export type GeneratePblTeamsInput = z.infer<typeof GeneratePblTeamsInputSchema>;

const GeneratePblTeamsOutputSchema = z.object({
  teams: z.array(TeamSchema),
});
export type GeneratePblTeamsOutput = z.infer<typeof GeneratePblTeamsOutputSchema>;

export async function generatePblTeams(
  input: GeneratePblTeamsInput
): Promise<GeneratePblTeamsOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
      name: 'generatePblTeamsPrompt',
      input: { schema: GeneratePblTeamsInputSchema },
      output: { schema: GeneratePblTeamsOutputSchema },
      prompt: `You are an expert educational sociologist and team dynamics facilitator. Your task is to form strategic student teams for a project, based on a specific pedagogical criterion. You must also assign a relevant and **AGE-APPROPRIATE** role to each student within their team.
Your response MUST be in the language: {{language}}.

**CRITICAL CONTEXT:**
- **Age/Grade:** {{#if ageOrGrade}}{{ageOrGrade}}{{else}}Not specified (assume middle school){{/if}}
- **Instruction:** You MUST consider this age/grade level. The roles and justifications you provide must be realistic and appropriate for students of this age. For example, do not assign a role like "Data Analyst" to a 6-year-old. Instead, a more suitable role might be "Official Counter" or "Question Asker".

**Project Details:**
- **Topic:** {{projectTopic}}
- **Key Skills:** {{#each projectSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

**Team Formation Parameters:**
- **Team Size:** {{teamSize}} students per team.
- **Grouping Criteria:** **{{criteria}}**

**Student Roster (Anonymized):**
{{#each students}}
- **Name:** {{name}}
  - **Qualities/Interests:** {{#if qualities.length}}{{#each qualities}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
  - **Fears:** {{#if fears.length}}{{#each fears}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
  - **Good Relations with:** {{#if goodRelations.length}}{{#each goodRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}
  - **Bad Relations with:** {{#if badRelations.length}}{{#each badRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}
{{/each}}

**Your Task:**
Based on the **Grouping Criteria** and the **CRITICAL Age/Grade Context**, form teams of {{teamSize}} students. For each team, you must:
1.  **Create a creative team name.**
2.  **Assign each student a project-specific and AGE-APPROPRIATE role** (e.g., 'Lead Designer', 'Data Analyst', 'Presenter').
3.  **Provide a brief justification for each role assignment**, linking it to the student's qualities in an age-appropriate way.
4.  **Write a rationale** explaining *why* the team was formed this way, according to the selected criteria.

**Criteria Guidelines:**
- **'balanced':** Create teams with a mix of different skills and personalities. For example, pair a creative student with an organized one. The rationale should explain how the members' skills complement each other.
- **'social-remediation':** If possible, create at least one team with two students who have a 'bad relation'. The project should be a low-stakes, cooperative task. The rationale should explain how this activity could help improve their relationship.
- **'synergy':** Group students with similar interests and qualities to maximize engagement and flow. The rationale should highlight their shared interests.

**Example Output (Age: 14):**
{
  "teams": [
    {
      "teamName": "The Data Detectives",
      "members": [
        {
          "name": "Student A",
          "role": "Project Manager",
          "justification": "Known for being 'organized' and 'a leader', perfect for keeping the team on track."
        },
        {
          "name": "Student B",
          "role": "Lead Researcher",
          "justification": "Their quality of 'curious' makes them ideal for digging deep into the project topic."
        }
      ],
      "rationale": "This is a balanced team. Student A's organizational skills complement Student B's research abilities, ensuring both a well-managed process and in-depth content."
    }
  ]
}

Now, generate the teams.
`,
  });

  const { output } = await prompt(input, {model});
  
  if (!output?.teams) {
    throw new Error("AI failed to generate valid teams.");
  }

  return output;
}
