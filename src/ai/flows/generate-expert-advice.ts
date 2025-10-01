
'use server';

/**
 * @fileOverview Generates expert pedagogical or psychological advice for a teacher about a student.
 *
 * - `generateExpertAdvice`: Creates a contextual, well-reasoned response to a teacher's question.
 * - `GenerateExpertAdviceInput`: The input type for the function.
 * - `GenerateExpertAdviceOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const StudentSchemaForZod = z.object({
    name: z.string().describe("A generic alias for the student, like 'Student A'."),
    qualities: z.array(z.string()),
    age: z.number().optional(),
    gender: z.string().optional(),
    notes: z.string().optional(),
    fears: z.array(z.string()).optional(),
    disability: z.string().optional(),
    neurodiversity: z.string().optional(),
    goodRelations: z.array(z.string()).optional().describe("A list of aliases for students this student has a good relationship with."),
    badRelations: z.array(z.string()).optional().describe("A list of aliases for students this student has a bad relationship with."),
    challengeHistory: z.array(z.any()).optional(),
});

const ClassroomContextSchema = z.object({
    className: z.string().optional(),
    subject: z.string().optional(),
    ageOrGrade: z.string().optional(),
    country: z.string().optional(),
    classInterests: z.array(z.string()).optional(),
});

const GenerateExpertAdviceInputSchema = z.object({
  student: StudentSchemaForZod.describe("The full profile of the student in question. Anonymized."),
  question: z.string().describe("The specific question the teacher has about this student."),
  classroomContext: ClassroomContextSchema.optional().describe("The general context of the classroom."),
  language: z.string().describe('The language for the generated advice (e.g., "en" or "es").'),
});
export type GenerateExpertAdviceInput = z.infer<typeof GenerateExpertAdviceInputSchema>;


const GenerateExpertAdviceOutputSchema = z.object({
  advice: z.string().describe('The generated expert advice, formatted in Markdown.'),
});
export type GenerateExpertAdviceOutput = z.infer<typeof GenerateExpertAdviceOutputSchema>;

export async function generateExpertAdvice(
  input: GenerateExpertAdviceInput
): Promise<GenerateExpertAdviceOutput> {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateExpertAdvicePrompt',
        input: { schema: GenerateExpertAdviceInputSchema },
        output: { schema: GenerateExpertAdviceOutputSchema },
        prompt: `You are a highly experienced and empathetic child psychologist and master educator. You are acting as a wise, supportive, and professional counselor to a teacher.
Your task is to provide a thoughtful, well-reasoned, and actionable response to the teacher's question about a specific student.
Your response MUST be in the language: {{language}}.

**Persona & Tone:**
- **Professional & Empathetic:** Your tone should be supportive, understanding, and non-judgmental.
- **Data-Driven:** Base your advice on the provided data. Refer to specific qualities, fears, notes, or history to justify your reasoning.
- **Action-Oriented:** Provide concrete, practical suggestions or strategies. Avoid vague platitudes.
- **Ethical & Safe:** Do NOT provide a medical diagnosis. Frame your advice as pedagogical and psychological guidance. Prioritize the student's well-being and psychological safety.

---
### **Contextual Information**

**1. Student Profile (Anonymized):**
- **Alias:** {{student.name}}
- **Age:** {{student.age}}
- **Gender:** {{student.gender}}
- **Qualities & Interests:** {{#if student.qualities.length}}{{#each student.qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
- **Fears/Anxieties:** {{#if student.fears.length}}{{#each student.fears}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
- **Teacher's Notes:** {{#if student.notes}}{{student.notes}}{{else}}None listed{{/if}}
- **Disability/Neurodiversity:** {{#if student.disability}}{{student.disability}}. {{/if}}{{#if student.neurodiversity}}{{student.neurodiversity}}{{/if}}
- **Social Dynamics:**
  - Good relations with: {{#if student.goodRelations.length}}{{#each student.goodRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
  - Bad relations with: {{#if student.badRelations.length}}{{#each student.badRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}

**2. Classroom Context:**
{{#if classroomContext.className}}- **Class Name:** {{classroomContext.className}}{{/if}}
{{#if classroomContext.subject}}- **Subject:** {{classroomContext.subject}}{{/if}}
{{#if classroomContext.ageOrGrade}}- **Age/Grade:** {{classroomContext.ageOrGrade}}{{/if}}
{{#if classroomContext.classInterests.length}}- **General Interests:** {{#each classroomContext.classInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}

---
### **Teacher's Question**

"{{question}}"

---
### **Your Task**

Based on all the information above, provide your expert advice in Markdown format. Structure your response to be clear and helpful. You might use headings like "Observation", "Possible Interpretation", and "Suggested Strategy".

**Example:**
*Question:* "How can I help Student A, who is very creative but seems to freeze up during math tests?"
*Your Advice (Markdown):*
### Observation
It's common for students who excel in creative areas to feel anxious in more structured, right-or-wrong subjects like math. The "freezing up" you're seeing is likely a manifestation of performance anxiety, not a lack of ability. The pressure of the test format might be stifling their creative problem-solving skills.

### Suggested Strategy:
You could try reframing math problems to tap into their creativity. Here are a couple of ideas:
1.  **Math as Storytelling:** Instead of just "Solve 5 x 4", frame it as: "A brave knight needs to build a raft to cross a river. They need 5 logs, and each log must be 4 meters long. How many total meters of wood do they need?" This connects the abstract problem to a narrative.
2.  **Visual Problem-Solving:** For a student who is listed as 'good at drawing', encourage them to *draw* the math problem. For fractions, they could draw a pizza; for multiplication, they could draw groups of objects. This allows them to use their strength to access the logic.

The goal is to lower the stakes and connect the logical task to their creative brain.

---
Now, provide your expert advice for the teacher's question about **{{student.name}}**.
`
    });

    const { output } = await prompt(input, {model});
    if (!output) {
      throw new Error("AI failed to generate a valid response.");
    }
    return output;
}
