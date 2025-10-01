
'use server';

/**
 * @fileOverview Generates a personalized challenge for a student based on their qualities.
 *
 * - `generateStudentChallenge`: A function that creates a fun, contextual mission for a student.
 * - `GenerateStudentChallengeInput`: The input type for the generateStudentChallenge function.
 * - `GenerateStudentChallengeOutput`: The return type for the generateStudentChallenge function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { Gender } from '@/modules/student/domain/student.entity';
import { z } from 'genkit';

const StudentSchema = z.object({
  name: z.string().describe("A generic alias for the student, like 'Student A'."),
  qualities: z.array(z.string()).describe('A list of qualities or interests of the student.'),
  age: z.number().optional().describe('The age of the student.'),
  notes: z.string().optional().describe('General notes or observations about the student from the teacher.'),
  disability: z.string().optional().describe('Specific information about a student\'s disability. This is critical information for adapting the challenge to be inclusive and supportive.'),
  neurodiversity: z.string().optional().describe('Specific information about a student\'s neurodiversity (e.g., ADHD, Autism). This is critical information for adapting the challenge to be inclusive and supportive.'),
  fears: z.array(z.string()).optional().describe('A list of fears or anxieties the student has. The AI should be very careful to avoid these topics.'),
  goodRelations: z.array(z.string()).optional().describe("A list of aliases for students this student has a good relationship with."),
  badRelations: z.array(z.string()).optional().describe("A list of aliases for students this student has a bad relationship with."),
  gender: z.custom<Gender>().optional().describe('The gender of the student. Can be female, male, non-binary, other, or prefer-not-to-say.'),
});

const ChallengeSchema = z.object({
    challenge: z.string(),
    tip: z.string(),
});

const GenerateStudentChallengeInputSchema = z.object({
  students: z.array(StudentSchema).describe('An array containing one to three students.'),
  language: z.string().describe('The language for the generated challenge (e.g., "en" or "es").'),
  selectionMode: z.string().describe('The current selection mode (e.g., "random", "dice", "pair", "personalized-individual", "personalized-multiple").'),
  subject: z.string().optional().describe('The classroom subject for the challenge (e.g., "History", "Science").'),
  ageOrGrade: z.string().optional().describe('The age group or grade of the students (e.g., "8 years old", "3rd Grade").'),
  country: z.string().optional().describe('The country the classroom is in, for cultural context.'),
  challengeLocation: z.string().optional().describe('Where the challenge should take place. "at-desk" means a low-pressure challenge at their seat. "in-front" means a challenge at the front of the classroom. "does-not-matter" means the location is not specified.'),
  customPrompt: z.string().optional().describe('An additional instruction from the teacher to guide the AI.'),
  negativePrompt: z.string().optional().describe('A prompt describing what the AI should avoid generating.'),
  challengeHistory: z.array(ChallengeSchema).optional().describe('A list of recently generated challenges to avoid repetition.'),
  className: z.string().optional().describe('The name of the class.'),
  classInterests: z.array(z.string()).optional().describe('A list of general interests for the whole class.'),
});
export type GenerateStudentChallengeInput = z.infer<typeof GenerateStudentChallengeInputSchema>;

// Internal schema includes boolean flags for easier use in Handlebars prompt
const InternalChallengeInputSchema = GenerateStudentChallengeInputSchema.extend({
    isInFront: z.boolean(),
    isAtDesk: z.boolean(),
});

const GenerateStudentChallengeOutputSchema = z.object({
  challenge: z.string().describe('The personalized and fun challenge generated for the student(s).'),
  tip: z.string().describe('A helpful tip or a concrete example of how to complete the challenge.'),
});
export type GenerateStudentChallengeOutput = z.infer<typeof GenerateStudentChallengeOutputSchema>;

export async function generateStudentChallenge(
  input: GenerateStudentChallengeInput
): Promise<GenerateStudentChallengeOutput> {
  const result = await generateStudentChallengeFlow(input);
  // If the flow returns a nullish value, it means the model likely failed to adhere to the schema.
  // We check for this and can return a default/fallback challenge.
  if (!result?.challenge) {
    // This provides a safe fallback in case of an unexpected model response.
    return { 
      challenge: "Explain the last concept in your own words.",
      tip: "For example, you could say 'So, what I understood is that photosynthesis is how plants eat sunlight!'"
    };
  }
  return result;
}

const generateStudentChallengeFlow = async (input: GenerateStudentChallengeInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    // Create boolean flags for easier and safer use in the Handlebars prompt.
    const isInFront = input.challengeLocation === 'in-front';
    const isAtDesk = input.challengeLocation === 'at-desk';

    const prompt = ai.definePrompt({
        name: 'generateStudentChallengePrompt',
        input: { schema: InternalChallengeInputSchema },
        output: { schema: GenerateStudentChallengeOutputSchema },
        prompt: `You are a creative and empathetic assistant for a teacher. Your goal is to generate a fun, short, and engaging classroom challenge for one to three students, along with a helpful tip or example. The challenge must be highly personalized based on the students' details and the classroom context.

**VERY IMPORTANT:** The final "challenge" and "tip" you generate MUST be in the following language: {{language}}. This is a strict requirement.

Crucially, the challenges should be designed to foster positive development, especially in areas like:
- **Optimism:** Frame challenges in a positive, empowering way.
- **Overcoming Shyness:** Create low-pressure opportunities for participation.
- **Collaboration:** If multiple students are selected, the challenge MUST be a collaborative task.
- **Social-Emotional Learning:** Use relationship data to make thoughtful pairings. If students have a bad relationship, create a simple, low-stakes challenge that promotes positive interaction. If they have a good relationship, create a challenge that leverages their synergy.
- **Scenic Presentation:** Encourage clear communication and sharing ideas with the class.

**Student Details:**
{{#each students}}
- **Name:** {{name}} (This is a temporary alias for privacy, use it in your response)
{{#if age}}- **Age:** {{age}} years old{{/if}}
{{#if gender}}- **Gender:** {{gender}}{{/if}}
- **Qualities:** {{#each qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}} (Use these as thematic context. **Do not** create a challenge that simply repeats one of these qualities. For example, if a quality is "good at drawing", do not ask them to draw something. Instead, use it as a hint for their personality and create a related but novel challenge.)
{{#if disability}}- **Disability Information:** {{disability}} (CRITICAL: Adapt the challenge to be fully inclusive and supportive of this student's needs. For example, if a student has dyslexia, create a challenge that doesn't rely heavily on rapid reading or writing.) {{/if}}
{{#if neurodiversity}}- **Neurodiversity Information:** {{neurodiversity}} (CRITICAL: Adapt the challenge to be fully inclusive and supportive of this student's needs. For example, if a student has ADHD, consider a challenge that is short and allows for movement.) {{/if}}
{{#if fears}}- **Fears:** {{#each fears}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}} (VERY IMPORTANT: Be extremely careful and empathetic about these fears. Do NOT create a challenge related to these topics. For example, if a student fears spiders, do not mention insects at all.) {{/if}}
{{#if notes}}- **General Notes:** {{notes}} (Pay attention to any additional context provided by the teacher.) {{/if}}
{{#if goodRelations}}- **Good Relations with:** {{#each goodRelations}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}
{{#if badRelations}}- **Bad Relations with:** {{#each badRelations}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}
{{/each}}


**Classroom Context:**
{{#if className}}- **Class Name:** {{className}}{{/if}}
{{#if classInterests.length}}- **General Class Interests:** {{#each classInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}} (Use these interests to make the challenge more engaging for everyone).{{/if}}
{{#if subject}}- **Current Subject:** {{subject}}{{/if}}
{{#if ageOrGrade}}- **Age/Grade Level:** {{ageOrGrade}}{{/if}}
{{#if country}}- **Country:** {{country}} (for cultural context, like holidays or local examples){{/if}}
{{#if challengeLocation}}- **Challenge Spotlight:** {{challengeLocation}}. If 'at-desk', the challenge should be something the student can do from their seat. If 'in-front', it can involve going to the whiteboard or the front of the class. Be mindful of student fears (like public speaking) when creating 'in-front' challenges. If 'does-not-matter', the location is flexible.{{/if}}
{{#if customPrompt}}- **Teacher's Guidance:** {{customPrompt}}{{/if}}
{{#if negativePrompt}}- **Things to Avoid:** {{negativePrompt}}{{/if}}

**Challenge Context:**
- **Selection Mode:** {{selectionMode}}

{{#if challengeHistory}}
**Previous Challenges (Avoid Repeating These):**
{{#each challengeHistory}}
- "{{challenge}}"
{{/each}}
{{/if}}

**Your Task:**
Based on all the context above, generate a single, creative, and **NEW** challenge and a helpful tip. It must be different from the previous challenges listed.
1.  **challenge**: The challenge must be a single sentence, be realistic for the classroom setting, and be relevant to the current **Subject**. If the subject is 'General', the challenge can be on any topic. Be disruptive, fun, and supportive.
    {{#if isInFront}}
    The challenge MUST start with "{{#each students}}{{name}}{{#unless @last}}, {{/unless}}{{/each}}, please come to the center stage and...".
    {{else if isAtDesk}}
    The challenge MUST start with "{{#each students}}{{name}}{{#unless @last}}, {{/unless}}{{/each}}, from your cozy corner...".
    {{else}}
    The challenge MUST address the student(s) by their alias(es) (e.g., "{{#each students}}{{name}}{{#unless @last}}, {{/unless}}{{/each}}, can you...").
    {{/if}}
    - If the selectionMode is 'pair' or 'personalized-multiple', the challenge must be designed for them to complete together. Use the relationship data to inform the nature of the challenge.
    - If the selectionMode is 'personalized-individual', the challenge must be highly specific and tailored to the student's individual qualities, notes, and interests.
2.  **tip**: The tip should be a concrete example of a great response or a clear hint to get the students started.

**Example Scenarios:**
- **Student:** 'Student A', **Qualities:** "Future programmer", "Shy", **Fears:** "Public speaking", **Mode:** "personalized-individual", **Subject:** "Math", **Location:** "at-desk"
  - **Challenge Idea:** A low-stakes challenge that leverages his interest in programming within math, respecting his preference for individual work and avoiding a big presentation.
  - **Generated Challenge:** "Student A, from your cozy corner, can you write a pseudo-code "if/else" statement on a piece of paper that describes how to check if a number is even or odd?"
  - **Generated Tip:** "You could start with 'IF number is divisible by 2 THEN...'"

- **Students:** 'Student B' & 'Student C', **Mode:** "pair", **Subject:** "History", **Location:** "in-front"
  - **Challenge Idea:** A collaborative task at the front of the class.
  - **Generated Challenge:** "Student B and Student C, please come to the center stage and act out a 30-second scene where two historical figures you've studied meet for the first time."
  - **Generated Tip:** "For example, imagine what Abraham Lincoln and Queen Victoria might talk about over tea!"

- **Student:** 'Student D', **Subject:** "English", **Location:** "does-not-matter"
  - **Challenge Idea:** A flexible challenge that doesn't specify location.
  - **Generated Challenge:** "Student D, can you think of a synonym for the word 'brave' and use it in a sentence?"
  - **Generated Tip:** "Think about words like 'courageous' or 'valiant'."

VERY IMPORTANT: You must always respond with a valid JSON object that adheres to the output schema. Do not under any circumstance return a null or empty response. Remember to respond in the required language: {{language}}.
`
    });
    
    // Call the prompt with the original input plus our new boolean flags.
    const { output } = await prompt({
            ...input,
            isInFront,
            isAtDesk,
        }, {model});

    return output!;
};
