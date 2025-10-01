
'use server';

/**
 * @fileOverview Generates a pedagogical suggestion for a teacher based on student data.
 *
 * - `generateCoachSuggestion`: Creates a contextual suggestion for a teacher to support a student.
 * - `GenerateCoachSuggestionInput`: The input type for the generateCoachSuggestion function.
 * - `GenerateCoachSuggestionOutput`: The return type for the generateCoachSuggestion function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

// We can reuse the StudentDTO schema structure for the input, but we need to define it with Zod.
// This ensures runtime validation of the data we pass to the flow.
const StudentChallengeSchemaForZod = z.object({
  challenge: z.string(),
  tip: z.string(),
  status: z.enum(['pending', 'evaluated', 'rejected']),
  rating: z.enum(['needs-support', 'met-expectations', 'exceeded-expectations']).optional(),
  feedback: z.string().optional(),
  attempts: z.number().optional(),
  aiConfiguration: z.any().optional(), // Keeping this flexible for now
});

const ObservationSchemaForZod = z.object({
    observation: z.string(),
    type: z.enum(['positive', 'negative', 'neutral', 'academic', 'social-emotional']),
    createdAt: z.string(),
});

const StudentSchemaForZod = z.object({
    name: z.string().describe("A generic alias for the student, like 'Student A'."),
    qualities: z.array(z.string()),
    age: z.number().optional(),
    notes: z.string().optional(),
    fears: z.array(z.string()).optional(),
    disability: z.string().optional(),
    neurodiversity: z.string().optional(),
    goodRelations: z.array(z.string()).optional().describe("A list of aliases for students this student has a good relationship with."),
    badRelations: z.array(z.string()).optional().describe("A list of aliases for students this student has a bad relationship with."),
    isAbsent: z.boolean(),
    challengeHistory: z.array(StudentChallengeSchemaForZod),
    gender: z.enum(['female', 'male', 'non-binary', 'other', 'prefer-not-to-say']).optional(),
    participation: z.number(),
});


const GenerateCoachSuggestionInputSchema = z.object({
  student: StudentSchemaForZod.describe("The student for whom the suggestion is being generated."),
  observations: z.array(ObservationSchemaForZod).optional().describe("A list of qualitative observations made by the teacher about the student."),
  language: z.string().describe('The language for the generated suggestion (e.g., "en" or "es").'),
});
export type GenerateCoachSuggestionInput = z.infer<typeof GenerateCoachSuggestionInputSchema>;


const GenerateCoachSuggestionOutputSchema = z.object({
  title: z.string().describe("A short, engaging title for the overall insight."),
  positiveAspects: z.array(z.string()).describe("A list of 2-3 bullet points identifying the student's strengths, interests, or positive patterns."),
  areasForImprovement: z.array(z.string()).describe("A list of 1-2 bullet points identifying the key challenges or areas for growth."),
  suggestion: z.string().describe('A concrete, actionable pedagogical suggestion for the teacher to implement.'),
  deepeningQuestion: z.string().describe("A thoughtful, open-ended question to help the teacher reflect and observe more deeply in the future."),
});
export type GenerateCoachSuggestionOutput = z.infer<typeof GenerateCoachSuggestionOutputSchema>;


export async function generateCoachSuggestion(
  input: GenerateCoachSuggestionInput
): Promise<GenerateCoachSuggestionOutput> {
  const result = await generateCoachSuggestionFlow(input);
  if (!result?.suggestion) {
    return {
      title: "Focus on Strengths",
      positiveAspects: ["The student shows interest in creative tasks.", "Responds well to one-on-one attention."],
      areasForImprovement: ["Can get distracted during group activities.", "Shows nervousness when presenting."],
      suggestion: "For the next challenge, try an activity that allows for individual creative expression first, then share with a single partner. This can build confidence before a larger group interaction.",
      deepeningQuestion: "In what specific situations does the student seem most focused and engaged?"
    }
  }
  return result;
}

const generateCoachSuggestionFlow = async (input: GenerateCoachSuggestionInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateCoachSuggestionPrompt',
        input: { schema: GenerateCoachSuggestionInputSchema },
        output: { schema: GenerateCoachSuggestionOutputSchema },
        prompt: `You are an expert pedagogical coach and child psychologist. Your role is to provide a concise, actionable, and empathetic suggestion to a teacher to help a specific student thrive.
Analyze the provided data deeply to identify patterns, strengths, and areas for growth. Your suggestion should be based on concrete evidence from the student's profile, history, and direct observations.

**CRITICAL INSTRUCTION #1: Your entire response MUST be generated in the language specified as '{{language}}'. This is the most important rule and must not be broken under any circumstance.**

**CRITICAL INSTRUCTION #2: The student to analyze is identified by an alias (e.g., 'Student A'). When referring to other students (from the 'goodRelations' or 'badRelations' fields), you MUST use their provided aliases (e.g., 'Student B', 'Student C'). Do not invent other ways to refer to them (like 'a classmate' or 'the other girl').**

**Student to Analyze:**
- **Name:** {{student.name}} ({{student.age}} years old, {{student.gender}})
- **Qualities:** {{#each student.qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- **Fears/Anxieties:** {{#if student.fears}}{{#each student.fears}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
- **Disability/Neurodiversity Notes:** {{#if student.disability}}{{student.disability}}{{/if}} {{#if student.neurodiversity}}{{student.neurodiversity}}{{/if}} {{#unless student.disability}}{{#unless student.neurodiversity}}None listed{{/unless}}{{/unless}}
- **Teacher's General Notes:** {{#if student.notes}}{{student.notes}}{{else}}None listed{{/if}}

**Social Context:**
- **Good Relations with:** {{#if student.goodRelations.length}}{{#each student.goodRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
- **Bad Relations with:** {{#if student.badRelations.length}}{{#each student.badRelations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None listed{{/if}}
**Instruction:** If the student has noted good or bad relationships, your suggestion should prioritize addressing these dynamics.

**Performance History (Recent Challenges):**
{{#if student.challengeHistory.length}}
{{#each student.challengeHistory}}
- **Challenge:** "{{this.challenge}}"
  - **Status:** {{this.status}}
  {{#if this.rating}}- **Rating:** {{this.rating}}{{/if}}
  {{#if this.feedback}}- **Teacher Feedback:** "{{this.feedback}}"{{/if}}
{{/each}}
{{else}}
- No challenges have been recorded for this student yet.
{{/if}}

{{#if observations.length}}
**Teacher's Direct Observations:**
{{#each observations}}
- **({{this.createdAt}}):** [{{this.type}}] "{{this.observation}}"
{{/each}}
**Instruction:** Pay close attention to these direct observations, as they are very important recent context.
{{/if}}


**Your Task:**
Based on ALL the data above, generate a structured pedagogical analysis. Your response MUST be a JSON object with the following keys:
1.  **title**: A short, engaging title for the overall insight (e.g., "Leveraging Creativity to Improve Focus").
2.  **positiveAspects**: A list of 2-3 bullet points identifying the student's strengths, interests, or positive patterns.
3.  **areasForImprovement**: A list of 1-2 bullet points identifying the key challenges or areas for growth.
4.  **suggestion**: A concrete, actionable pedagogical suggestion for the teacher to implement. Frame it as a helpful observation and direct advice.
5.  **deepeningQuestion**: A thoughtful, open-ended question to help the teacher reflect and observe more deeply in the future.

**Example (Student is creative but shy, struggles with presentations, has a bad relation with Student C):**
{
  "title": "Fomentando la Confianza a través del Arte",
  "positiveAspects": [
    "Demuestra una gran creatividad e imaginación, especialmente en tareas de dibujo.",
    "Trabaja bien de forma independiente y produce trabajos de alta calidad cuando se concentra."
  ],
  "areasForImprovement": [
    "Muestra una ansiedad significativa durante los desafíos de hablar en público, lo que lleva a calificaciones de 'necesita apoyo'.",
    "Duda en compartir ideas verbalmente en un grupo grande, especialmente si Student C está presente."
  ],
  "suggestion": "He notado que Student A sobresale en tareas creativas pero tiene dificultades con las presentaciones. Para el próximo desafío, podrías intentar una actividad en la que dibuje su respuesta en la pizarra en lugar de explicarla verbalmente. Esto aprovecha su fortaleza para generar confianza de una manera de baja presión.",
  "deepeningQuestion": "¿En qué situaciones no verbales Student A parece más cómodo compartiendo sus conocimientos con sus compañeros?"
}

Now, generate a new, insightful, and structured analysis for **{{student.name}}**.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};
