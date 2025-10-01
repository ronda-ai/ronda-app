
'use server';

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { z } from 'genkit';

const GenerateSafetyRiskMapInputSchema = z.object({
  locationContext: z.string().describe("Context about the school's geographical and urban/rural location."),
  infrastructureContext: z.string().describe("Context about the school's physical building and infrastructure."),
  socialContext: z.string().describe("Context about the social dynamics, community, and potential interpersonal issues."),
  language: z.string().describe('The language for the generated risk map (e.g., "en" or "es").'),
  analysisDepth: z.enum(['concise', 'moderate', 'exhaustive']).optional().default('moderate').describe("The desired depth of the analysis, which influences the number of risks identified in each category.")
});
export type GenerateSafetyRiskMapInput = z.infer<typeof GenerateSafetyRiskMapInputSchema>;

const RiskItemSchema = z.object({
    risk: z.string().describe("A concise name for the identified risk (e.g., 'Seismic Hazard', 'Overcrowded Hallways')."),
    priority: z.enum(['High', 'Medium', 'Low', 'Alto', 'Medio', 'Bajo']).describe("The priority level of the risk."),
    justification: z.string().describe("A brief explanation of why this is a risk, based on the provided context."),
});

const GenerateSafetyRiskMapOutputSchema = z.object({
  title: z.string().describe("A concise title for the risk map report (e.g., 'Preliminary School Safety Risk Assessment')."),
  riskMap: z.object({
      introduction: z.string().describe("A brief introductory paragraph for the report."),
      naturalRisks: z.array(RiskItemSchema).describe("A list of identified natural risks."),
      socialRisks: z.array(RiskItemSchema).describe("A list of identified social and community risks."),
      infrastructureRisks: z.array(RiskItemSchema).describe("A list of identified infrastructure-related risks."),
  }),
});
export type GenerateSafetyRiskMapOutput = z.infer<typeof GenerateSafetyRiskMapOutputSchema>;


export async function generateSafetyRiskMap(input: GenerateSafetyRiskMapInput): Promise<GenerateSafetyRiskMapOutput> {
    const ai = await getAi();
    const model = await getDynamicModel();
    const prompt = ai.definePrompt({
        name: 'generateSafetyRiskMapPrompt',
        input: { schema: GenerateSafetyRiskMapInputSchema },
        output: { schema: GenerateSafetyRiskMapOutputSchema },
        prompt: `You are an expert in school safety and risk assessment (Plan Integral de Seguridad Educativa - PISE). Your task is to analyze the provided context of a school and generate a prioritized risk map.
The entire output MUST be in the specified language: {{language}}.

**School Context:**
- **Location:** "{{locationContext}}"
- **Infrastructure:** "{{infrastructureContext}}"
- **Social & Community:** "{{socialContext}}"

**Analysis Depth:** {{analysisDepth}}
- 'concise': Identify 1-2 risks per category.
- 'moderate': Identify 2-4 risks per category.
- 'exhaustive': Identify 4-6 risks per category.

**Your Task:**
Generate a JSON object with two keys: "title" and "riskMap".

1.  **title**: Create a concise title for the report, like "Preliminary Risk Map for Educational Institution".
2.  **riskMap**: An object containing:
    - **introduction**: A brief introductory paragraph for the report.
    - **naturalRisks**: An array of risk items related to natural hazards.
    - **socialRisks**: An array of risk items related to social and community issues.
    - **infrastructureRisks**: An array of risk items related to the building and infrastructure.

For each risk item, provide the 'risk' (name), 'priority' ('High'/'Medium'/'Low' or localized equivalent), and 'justification'.

**Example (language: en, depth: concise):**
{
  "title": "Preliminary School Safety Risk Assessment",
  "riskMap": {
      "introduction": "Based on the provided information, the following preliminary risk map has been generated...",
      "naturalRisks": [{ "risk": "Earthquakes", "priority": "High", "justification": "Given the location in a seismic zone..." }],
      "socialRisks": [{ "risk": "Bullying", "priority": "Medium", "justification": "The mention of 'tensions between student groups'..." }],
      "infrastructureRisks": [{ "risk": "Outdated Electrical Systems", "priority": "Medium", "justification": "For buildings over 30 years old..." }]
  }
}

Now, generate the risk map based on the provided context and analysis depth.
`,
    });

    const { output } = await prompt(input, { model });
    if (!output) {
      throw new Error("AI failed to generate a valid risk map.");
    }
    return output;
}
