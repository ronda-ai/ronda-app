/**
 * @fileOverview Generates speech from a given text using a TTS model.
 */

import { getAi } from '@/ai/ai';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';
import wav from 'wav';

export const GenerateSpeechInputSchema = z.object({
  text: z.string().describe("The text to be converted to speech."),
  narratorVoice: z.string().optional().describe("The voice to use for the narrator."),
});
export type GenerateSpeechInput = z.infer<typeof GenerateSpeechInputSchema>;

const GenerateSpeechOutputSchema = z.object({
  audioUrl: z.string().describe("The base64 encoded string of the raw PCM audio data."),
});
export type GenerateSpeechOutput = z.infer<typeof GenerateSpeechOutputSchema>;

export async function generateSpeechFromText(input: GenerateSpeechInput): Promise<GenerateSpeechOutput> {
  const ai = await getAi();
  
  const ttsModel = googleAI.model('gemini-2.5-flash-preview-tts');

  const { media } = await ai.generate({
    model: ttsModel,
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: input.narratorVoice || 'Algenib' },
        },
      },
    },
    prompt: input.text,
  });

  if (!media) {
    throw new Error('No audio media returned from the TTS model.');
  }

  // Return raw PCM data as a base64 string
  const audioUrl = media.url.substring(media.url.indexOf(',') + 1);
  
  return { audioUrl };
}
