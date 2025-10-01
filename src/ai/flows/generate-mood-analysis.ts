
'use server';

/**
 * @fileOverview Generates an analysis of student mood trends based on challenge history.
 *
 * - `generateMoodAnalysis`: Creates a contextual insight based on student(s) mood data.
 * - `GenerateMoodAnalysisInput`: The input type for the function.
 * - `GenerateMoodAnalysisOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

// Schema for a single challenge entry, focusing on what's needed for analysis.
const ChallengeHistoryEntrySchema = z.object({
  challenge: z.string(),
  subject: z.string().optional(),
  selectionMode: z.string().optional(),
  challengeLocation: z.string().optional(),
  mood: z.string().optional(),
  rating: z.enum(['needs-support', 'met-expectations', 'exceeded-expectations']).optional(),
  studentName: z.string().optional().describe("The alias of the student who took this challenge, for classroom-level analysis."),
});

// Main input schema
const GenerateMoodAnalysisInputSchema = z.object({
  studentName: z.string().optional().describe("The name or alias of the specific student being analyzed. Omit for classroom-level analysis."),
  challengeHistory: z.array(ChallengeHistoryEntrySchema).describe("A list of challenges, including the context (subject, mode) and the resulting mood."),
  language: z.string().describe('The language for the generated analysis (e.g., "en" or "es").'),
});
export type GenerateMoodAnalysisInput = z.infer<typeof GenerateMoodAnalysisInputSchema>;

// --- NEW STRUCTURED OUTPUT SCHEMA ---
const InsightSchema = z.object({
    title: z.string().describe("A short, descriptive title for the insight (e.g., 'Anxiety in Math Challenges', 'Success in Collaborative Settings'). The title must be in the specified language."),
    description: z.string().describe("A detailed explanation of the observed pattern or trend, mentioning specific students (by alias), challenge types, or contexts."),
    studentsInvolved: z.array(z.string()).optional().describe("A list of student aliases involved in this specific insight."),
    suggestion: z.string().optional().describe("A concrete, actionable suggestion for the teacher to address the insight."),
    tags: z.array(z.string()).optional().describe("A list of 2-4 keywords related to the insight (e.g., 'collaboration', 'math anxiety', 'public speaking', 'confidence building'). These tags must be in the specified language and use spaces, not hyphens.")
});

const GenerateMoodAnalysisOutputSchema = z.object({
  insights: z.array(InsightSchema).min(1).max(3).describe("A list of 1 to 3 key insights derived from the mood trend data.")
});
export type GenerateMoodAnalysisOutput = z.infer<typeof GenerateMoodAnalysisOutputSchema>;


export async function generateMoodAnalysis(
  input: GenerateMoodAnalysisInput
): Promise<GenerateMoodAnalysisOutput> {
  const result = await generateMoodAnalysisFlow(input);
  if (!result?.insights || result.insights.length === 0) {
    return {
        insights: [{
            title: "No Clear Trend Detected",
            description: "Not enough mood data to detect a clear trend yet. Keep logging to get better insights!",
            tags: ["data-collection"]
        }]
    }
  }
  return result;
}

const generateMoodAnalysisFlow = async (input: GenerateMoodAnalysisInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    // We only want to analyze challenges that have a mood recorded.
    const relevantHistory = input.challengeHistory.filter(h => h.mood);
    
    // If there's not enough data, return a default message.
    if (relevantHistory.length < 3) {
        return {
            insights: [{
                title: input.language === 'es' ? "No Hay Tendencia Clara" : "No Clear Trend Detected",
                description: input.language === 'es' 
                    ? "No hay suficientes datos de ánimo para detectar una tendencia clara todavía. ¡Sigue registrando para obtener mejores ideas!"
                    : "Not enough mood data to detect a clear trend yet. Keep logging to get better insights!",
                tags: ["recopilación de datos"]
            }]
        }
    }
    
    const prompt = ai.definePrompt({
        name: 'generateMoodAnalysisPrompt',
        input: { schema: GenerateMoodAnalysisInputSchema },
        output: { schema: GenerateMoodAnalysisOutputSchema },
        prompt: `You are an expert educational psychologist with a talent for detecting subtle emotional patterns in students.
Your task is to analyze a history of classroom challenges and the self-reported moods of the students after each challenge.
Your goal is to provide a structured, professional analysis to the teacher.

**CRITICAL INSTRUCTION:** Your entire response, including titles, descriptions, suggestions, and tags, MUST be generated in the following language: {{language}}. This is the most important rule.

**Analysis Context:**
{{#if studentName}}
- **Scope:** Individual analysis for a student (alias: **{{studentName}}**).
{{else}}
- **Scope:** Classroom-level analysis. Look for trends across all provided data.
{{/if}}

**Challenge & Mood History:**
{{#each challengeHistory}}
- **Challenge:** "{{this.challenge}}" {{#if this.studentName}}for **{{this.studentName}}**{{/if}}
  - **Context:** Subject: {{#if this.subject}}{{this.subject}}{{else}}General{{/if}}, Mode: {{this.selectionMode}}, Location: {{this.challengeLocation}}
  - **Outcome:** {{#if this.mood}}Mood was **{{this.mood}}**{{else}}Mood not recorded{{/if}}{{#if this.rating}}, Rating was **{{this.rating}}**{{/if}}.
{{/each}}

**Your Task:**
Review the history above. Look for connections. Does a particular subject cause frustration? Does a specific location ("Center Stage" vs. "Cozy Corner") impact mood? Does a certain mode ("Power Duo" vs. "Random") lead to more enthusiasm?
Generate a JSON object containing a list of 1 to 3 "insights". Each insight object must have:
1.  **title:** A short, descriptive title for the insight (e.g., 'Ansiedad por el Rendimiento en Matemáticas', 'Éxito en Entornos Colaborativos'). The title must be in the specified language.
2.  **description:** A detailed explanation of the observed pattern, mentioning specific students (by alias), challenge types, or contexts.
3.  **studentsInvolved:** A list of the student aliases mentioned in the description.
4.  **suggestion:** A concrete, actionable suggestion for the teacher.
5.  **tags:** A list of 2-4 relevant keywords in the specified language. These tags must use spaces, not hyphens (e.g., 'ansiedad matemática', 'hablar en público').

**Example (language: es):**
{
  "insights": [
    {
      "title": "Ansiedad por el Rendimiento en 'Escenario Principal'",
      "description": "He observado que {{studentName}} reporta consistentemente estados de ánimo 'nervioso' durante los desafíos de 'Matemáticas', especialmente cuando está en el 'Escenario Principal'. Este patrón sugiere que la combinación de la materia y la presentación pública es una fuente significativa de estrés.",
      "studentsInvolved": ["{{studentName}}"],
      "suggestion": "Intenta el próximo desafío de matemáticas desde el 'Rincón Acogedor' para ver si un ambiente de menor presión reduce la ansiedad. Considera también un desafío 'Dúo Dinámico' con un compañero de apoyo.",
      "tags": ["ansiedad matemática", "hablar en público", "confianza"]
    }
  ]
}

Now, generate a new, insightful analysis based on the provided data for the specified scope.
`
    });

    const { output } = await prompt({ ...input, challengeHistory: relevantHistory }, {model});
    return output!;
};
