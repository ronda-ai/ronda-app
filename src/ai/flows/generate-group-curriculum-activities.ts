'use server';
/**
 * @fileOverview Generates curriculum activities specifically designed for a group of students.
 *
 * - `generateGroupCurriculumActivities`: Creates a list of 3 structured, collaborative activities.
 * - `GenerateGroupCurriculumActivitiesInput`: The input type for the function.
 * - `GenerateGroupCurriculumActivitiesOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const StudentSchemaForZod = z.object({
  name: z.string().describe("Anonymized name of the student, e.g., 'Student A'."),
  qualities: z.array(z.string()).describe("A list of the student's interests and strengths."),
  notes: z.string().optional().describe("Teacher's notes on the student, including disabilities or neurodiversity."),
});

const GenerateGroupCurriculumActivitiesInputSchema = z.object({
  topic: z.string().describe('The academic topic for the activities (e.g., "Fractions", "Photosynthesis").'),
  skills: z.array(z.string()).describe('A list of collaborative skills to focus on (e.g., "Teamwork", "Constructive Debate").'),
  language: z.string().describe('The language for the generated activities (e.g., "en" or "es").'),
  students: z.array(StudentSchemaForZod).min(2).describe('An array of 2 to 4 students in the group.'),
  ageOrGrade: z.string().optional().describe('The age or grade level of the students, crucial for adapting complexity.'),
  classInterests: z.array(z.string()).optional().describe('A list of general interests to use as thematic hooks.'),
  customPrompt: z.string().optional().describe('An additional instruction from the teacher to guide the AI.'),
});
export type GenerateGroupCurriculumActivitiesInput = z.infer<typeof GenerateGroupCurriculumActivitiesInputSchema>;

const ActivitySchema = z.object({
  title: z.string().describe("A short, engaging title for the activity."),
  description: z.string().describe("A detailed, step-by-step description of the activity."),
  modality: z.enum(["Cozy Corner", "Center Stage", "Power Duo"]).describe("The modality for the activity. 'Cozy Corner' is for parallel individual work within the group. 'Center Stage' is for group presentation. 'Power Duo' is for collaborative pair work within a larger group (if applicable) or the main group work.")
});

const GenerateGroupCurriculumActivitiesOutputSchema = z.object({
  activities: z.array(ActivitySchema).length(3).describe('A list of exactly 3 structured, group-focused activities.'),
});
export type GenerateGroupCurriculumActivitiesOutput = z.infer<typeof GenerateGroupCurriculumActivitiesOutputSchema>;

export async function generateGroupCurriculumActivities(
  input: GenerateGroupCurriculumActivitiesInput
): Promise<GenerateGroupCurriculumActivitiesOutput> {
  const ai = await getAi();
  const model = await getDynamicModel();
  
  const prompt = ai.definePrompt({
    name: 'generateGroupCurriculumActivitiesPrompt',
    input: { schema: GenerateGroupCurriculumActivitiesInputSchema },
    output: { schema: GenerateGroupCurriculumActivitiesOutputSchema },
    prompt: `You are an expert pedagogical designer specializing in collaborative and project-based learning. Your task is to create three distinct, engaging, and structured activities for a small group of students.

**CRITICAL INSTRUCTION:** All generated text MUST be in the language: {{language}}.

**Academic Focus:**
- **Topic:** {{topic}}
- **Skills to Develop:** {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

**Group Profile:**
- **Students:** {{#each students}}{{name}}{{#unless @last}}, {{/unless}}{{/each}}
- **Age/Grade:** {{#if ageOrGrade}}{{ageOrGrade}}{{else}}Not specified{{/if}}
- **Combined Interests & Strengths:** {{#each students}}{{#each qualities}}'{{this}}' {{/each}}{{/each}}
- **Considerations:** {{#each students}}{{#if notes}}{{name}}: {{notes}} {{/if}}{{/each}}

**Your Task:**
Generate a JSON object containing a list of exactly 3 activities. Each activity must be designed for this specific group. The activities should be varied and use the following modalities: "Center Stage", "Power Duo", and "Cozy Corner".

**MODALITY GUIDELINES (VERY IMPORTANT):**
- **"Center Stage":** This activity MUST involve the group presenting, performing, or sharing their work with the rest of the class.
- **"Power Duo":** This MUST be a collaborative task where students in the group work closely together to create a single product or solve a problem. If the group has 3 or 4 members, this can involve pairing up within the group.
- **"Cozy Corner":** This is for PARALLEL work. Design an activity where each member of the group works on the same task individually at their desk, but related to the group's overall goal. They can then share their individual results within the group.

**Example (Topic: Dinosaurs, Group: Student A, Student B):**
{
  "activities": [
    {
      "title": "Dinosaur Museum Curators",
      "description": "As a group, Student A and Student B will create a mini-museum exhibit. They must research one dinosaur each, then work together to create a single display that compares and contrasts their chosen dinosaurs.",
      "modality": "Power Duo"
    },
    {
      "title": "Fossil Dig Simulation",
      "description": "Each student in the group receives a 'fossil dig kit' (a container with sand and hidden objects). Individually, they must excavate the 'fossils' and document their findings in a field journal. They will then compare their findings with each other.",
      "modality": "Cozy Corner"
    },
    {
      "title": "Dino-Debate Presentation",
      "description": "The group will prepare and deliver a 2-minute presentation to the class, arguing which of their researched dinosaurs would win in a hypothetical fight, using evidence from their research.",
      "modality": "Center Stage"
    }
  ]
}

Now, generate the activities for the provided group and context. Ensure they are age-appropriate and engaging.`,
  });

  const { output } = await prompt(input, { model });

  if (!output?.activities || output.activities.length < 3) {
    // Fallback in case of AI failure
    return {
      activities: [
        { title: 'Group Brainstorm', description: 'As a group, brainstorm all the ideas you have about the topic on a shared whiteboard or large paper.', modality: 'Power Duo' },
        { title: 'Individual Research', description: 'Each student individually researches one sub-topic and writes down 3 key facts. Then, share your findings with the group.', modality: 'Cozy Corner' },
        { title: 'Group Summary', description: 'As a team, create a 1-minute summary of the most important points to present to the class.', modality: 'Center Stage' },
      ],
    };
  }

  return output;
}
