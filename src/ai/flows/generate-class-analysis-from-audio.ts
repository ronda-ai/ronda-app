
'use server';
/**
 * @fileOverview Analyzes a class audio recording for pedagogical insights.
 */

import { getAi } from '@/ai/ai';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';

const ClassAnalysisFromAudioInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "An audio recording of a class session, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.string().describe("The language of the analysis output."),
});
export type ClassAnalysisFromAudioInput = z.infer<typeof ClassAnalysisFromAudioInputSchema>;

const ClassAnalysisFromAudioOutputSchema = z.object({
    teacherTalkPercentage: z.number().describe("The estimated percentage of time the teacher spoke compared to the students."),
    questionAnalysis: z.string().describe("A qualitative analysis of the types of questions asked by the teacher (e.g., open vs. closed, recall vs. higher-order thinking)."),
    atmosphere: z.string().describe("An analysis of the overall classroom atmosphere (e.g., collaborative, tense, energetic, quiet)."),
    recommendations: z.string().describe("A list of 2-3 concrete pedagogical recommendations for the teacher based on the analysis, referencing MBE criteria where applicable."),
});
export type ClassAnalysisFromAudioDTO = z.infer<typeof ClassAnalysisFromAudioOutputSchema>;

export async function generateClassAnalysisFromAudio(input: ClassAnalysisFromAudioInput): Promise<ReadableStream<Uint8Array>> {
    const encoder = new TextEncoder();
    
    return new ReadableStream({
        async start(controller) {
            try {
                const ai = await getAi();

                const analysisPrompt = ai.definePrompt({
                    name: 'analyzeClassTranscript',
                    input: { schema: z.object({ transcript: z.string(), language: z.string() }) },
                    output: { schema: ClassAnalysisFromAudioOutputSchema },
                    prompt: `You are an expert pedagogical coach. Analyze the following classroom transcript. The entire analysis MUST be in the language: {{language}}.
                    
                    Transcript:
                    """
                    {{transcript}}
                    """
                    
                    Based on the transcript, provide a structured analysis with the following keys:
                    1.  teacherTalkPercentage: Estimate the percentage of time the teacher spoke versus the students.
                    2.  questionAnalysis: Analyze the types of questions the teacher asked (e.g., open-ended, closed-ended, recall, higher-order).
                    3.  atmosphere: Describe the overall classroom atmosphere (e.g., collaborative, teacher-led, energetic, quiet).
                    4.  recommendations: Provide 2-3 concrete, actionable pedagogical recommendations based on your analysis. Link them to the Chilean "Marco para la Buena Enseñanza" (MBE) where relevant (e.g., "To foster (C8), try...").
                    `,
                });


                 // Step 1: Transcription
                controller.enqueue(encoder.encode(JSON.stringify({ progress: 25, status: 'transcribing' }) + '\n'));
                const geminiProAudio = googleAI.model('gemini-1.5-pro-latest');
                const { text: transcript } = await ai.generate({
                    model: geminiProAudio,
                    prompt: `Transcribe the following classroom audio recording. Identify the main speaker as "Teacher" and other speakers as "Student 1", "Student 2", etc.
                    Audio: {{media url="${input.audioDataUri}"}}`,
                });
                
                if (!transcript) {
                    throw new Error("Transcription failed.");
                }
                
                // Step 2: Analysis
                controller.enqueue(encoder.encode(JSON.stringify({ progress: 75, status: 'analyzing' }) + '\n'));
                
                const { output: analysis } = await analysisPrompt({ transcript, language: input.language });
                
                if (!analysis) {
                    throw new Error("Analysis failed.");
                }

                // Final result
                controller.enqueue(encoder.encode(JSON.stringify({ progress: 100, result: analysis }) + '\n'));
                controller.close();
                
            } catch (error: any) {
                console.error("Error in class audio analysis flow:", error);
                controller.enqueue(encoder.encode(JSON.stringify({ error: error.message }) + '\n'));
                controller.close();
            }
        },
    });
}
