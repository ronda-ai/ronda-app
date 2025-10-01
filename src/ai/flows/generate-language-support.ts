
'use server';

/**
 * @fileOverview Generates linguistic support materials for a student.
 *
 * - `generateLanguageSupport`: Creates a teacher guide and student material.
 * - `GenerateLanguageSupportInput`: The input type for the function.
 * - `GenerateLanguageSupportOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';
import { MaterialType } from '@/modules/language-support/application/dtos/language-support.dto';

const StudentSchemaForZod = z.object({
    name: z.string(),
    age: z.number().optional(),
    qualities: z.array(z.string()).optional(),
    notes: z.string().optional(),
    fears: z.array(z.string()).optional(),
});

const GenerateLanguageSupportInputSchema = z.object({
  student: StudentSchemaForZod.describe("The student needing language support."),
  nativeLanguage: z.string().describe("The student's native language (e.g., 'Spanish', 'Mandarin Chinese')."),
  instructionLanguage: z.string().describe("The primary language of instruction in the classroom (e.g., 'English', 'German')."),
  focusAreas: z.array(z.string()).describe("A list of areas to focus on (e.g., 'reading', 'writing', 'social-emotional')."),
});
export type GenerateLanguageSupportInput = z.infer<typeof GenerateLanguageSupportInputSchema>;

const GenerateLanguageSupportOutputSchema = z.object({
  teacherGuide: z.string().describe("A guide for the teacher in the language of instruction, explaining the activity and its pedagogical goals. It MUST start with a descriptive Markdown H3 title (e.g., '### Exploring Emotions Story')."),
  studentMaterial: z.string().describe("The actual, ready-to-use material for the student. It MUST be written entirely and exclusively in the student's native language, which is '{{nativeLanguage}}'. No other languages should be present in this field. DO NOT add any 'illustration:' placeholders."),
  studentMaterialTranslation: z.string().describe("A direct translation of the 'studentMaterial' into the 'instructionLanguage'. This is for the teacher's reference. MUST be in markdown format."),
  materialType: z.enum(['story', 'worksheet', 'vocabulary-list', 'dialogue-script']).describe("The type of material generated. Choose the most fitting option: 'story' for narratives, 'worksheet' for exercises or questions, 'vocabulary-list' for a list of words, 'dialogue-script' for a conversation."),
});
export type GenerateLanguageSupportOutput = z.infer<typeof GenerateLanguageSupportOutputSchema>;

export async function generateLanguageSupport(
  input: GenerateLanguageSupportInput
): Promise<GenerateLanguageSupportOutput> {
  const result = await generateLanguageSupportFlow(input);
  if (!result?.teacherGuide) {
    return {
        teacherGuide: `### Teacher Guide (for ${input.student.name})\n\n**Goal:** Reinforce vocabulary related to classroom objects.\n\n**Activity:** Use the bilingual flashcards with the student. Start by showing the picture and saying the word in ${input.instructionLanguage}. Then, show the word in their native language (${input.nativeLanguage}) to build a connection.`,
        studentMaterial: `### Classroom Objects\n\n*   **Book**\n*   **Pencil**\n*   **Desk**\n*   **Chair**`,
        studentMaterialTranslation: `### Objetos de la Clase\n\n*   **Libro**\n*   **Lápiz**\n*   **Escritorio**\n*   **Silla**`,
        materialType: 'vocabulary-list'
    }
  }
  return result;
}

const generateLanguageSupportFlow = async (input: GenerateLanguageSupportInput) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateLanguageSupportPrompt',
        input: { schema: GenerateLanguageSupportInputSchema },
        output: { schema: GenerateLanguageSupportOutputSchema },
        prompt: `You are an expert in bilingual education and inclusive pedagogy. Your task is to create a practical, culturally-sensitive language support material for a specific student.
The output MUST be a JSON object with four keys: "teacherGuide", "studentMaterial", "studentMaterialTranslation", and "materialType".

1.  **teacherGuide**: This must be written in **{{instructionLanguage}}**. It should be a clear, concise guide for the teacher. **Crucially, it MUST start with a descriptive Markdown H3 title (e.g., '### Story for Reading Comprehension')** that summarizes the activity's purpose based on the focus areas. It should explain *what* the material is, *why* it's useful for the selected focus areas, and *how* to use it effectively with the student.
2.  **studentMaterial**: **CRITICAL RULE: This must be written entirely and exclusively in the student's native language: {{nativeLanguage}}. Do NOT mix languages in this field. Do NOT include any 'illustration:' placeholders or similar visual cues.** This should be the actual, ready-to-use material for the student. It should be creative and engaging, formatted in Markdown.
3.  **studentMaterialTranslation**: This must be a direct, accurate translation of the 'studentMaterial' content into **{{instructionLanguage}}**. This is for the teacher's reference.
4.  **materialType**: Classify the generated material. Choose one of the following: 'story', 'worksheet', 'vocabulary-list', 'dialogue-script'.

**Student Profile:**
- **Name:** {{student.name}} (This is a generic alias)
- **Age:** {{#if student.age}}{{student.age}} years old{{else}}Not specified{{/if}} (CRITICAL: The vocabulary, themes, and complexity of the 'studentMaterial' must be perfectly suited for this age.)
- **Interests/Qualities:** {{#if student.qualities}}{{#each student.qualities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Not specified{{/if}}
- **Teacher's Notes:** {{#if student.notes}}{{student.notes}}{{else}}None{{/if}}

**Support Request:**
- **Student's Native Language:** {{nativeLanguage}}
- **Language of Instruction:** {{instructionLanguage}}
- **Focus Areas:** {{#each focusAreas}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

**VERY IMPORTANT FOR WORKSHEETS:** If you generate a 'worksheet' for the 'studentMaterial', it is meant to be printed. You MUST include lines for the student to write on. Use a long series of underscores like this: \`________________________\` after each question or prompt.

**Example (Focus: writing, 'worksheet' type):**
- **studentMaterial:**
  \`\`\`markdown
  ### Mi Día
  1.  Hoy me siento: ________________________
  2.  Algo que aprendí hoy fue: ________________________
  3.  Dibuja algo que te hizo feliz hoy.
  \`\`\`

Now, generate a new and unique language support material based on the provided student profile and support request.
`
    });

    const { output } = await prompt(input, {model});
    return output!;
};


    