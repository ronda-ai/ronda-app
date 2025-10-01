/**
 * @fileOverview Generates multi-speaker speech from a given story text using a TTS model.
 */

import { getAi } from '@/ai/ai';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';
import wav from 'wav';
import { GenerateSpeechInputSchema } from './generate-speech-from-text';

// Re-using the same simple input schema
export type GenerateMultiSpeakerSpeechInput = z.infer<typeof GenerateSpeechInputSchema>;

export const GenerateMultiSpeakerSpeechOutputSchema = z.object({
  audioUrl: z.string().describe("The data URI of the generated multi-speaker audio file."),
});
export type GenerateMultiSpeakerSpeechOutput = z.infer<typeof GenerateMultiSpeakerSpeechOutputSchema>;


// Extracts up to 2 unique speaker names from the dialogue script.
// One will be the Narrator, the other will be the main character.
function getSpeakersFromText(text: string): string[] {
    const speakerRegex = /^([a-zA-Z0-9_]+):/gm;
    const speakers = new Set<string>();
    let match;
    while ((match = speakerRegex.exec(text)) !== null) {
        speakers.add(match[1]);
    }
    
    const speakerArray = Array.from(speakers);
    const prioritySpeakers = new Set<string>();
    
    // Find the narrator, case-insensitively
    const narratorIndex = speakerArray.findIndex(s => s.toLowerCase() === 'narrator');

    if (narratorIndex !== -1) {
        prioritySpeakers.add(speakerArray[narratorIndex]);
    } else if (speakerArray.length > 0) {
        // If no "Narrator", use the first speaker as the narrator voice
        prioritySpeakers.add(speakerArray[0]);
    }

    // Find the first non-narrator character
    const firstChar = speakerArray.find(s => s.toLowerCase() !== 'narrator');
    if (firstChar) {
        prioritySpeakers.add(firstChar);
    }
    
    // If we still don't have two speakers, fill it up to meet the API requirement
    if (prioritySpeakers.size < 2 && speakerArray.length > 0) {
        const remaining = speakerArray.find(s => !prioritySpeakers.has(s));
        if (remaining) {
            prioritySpeakers.add(remaining);
        }
    }
    
    // Fallback for texts with only one speaker type, ensuring we always have two distinct speaker names for the API.
    while (prioritySpeakers.size < 2) {
        prioritySpeakers.add(`Speaker${prioritySpeakers.size + 1}`);
    }

    return Array.from(prioritySpeakers).slice(0, 2);
}


export async function generateMultiSpeakerSpeech(input: GenerateMultiSpeakerSpeechInput): Promise<GenerateMultiSpeakerSpeechOutput> {
  const ai = await getAi();
  
  const ttsModel = googleAI.model('gemini-2.5-flash-preview-tts');
  
  const uniqueSpeakers = getSpeakersFromText(input.text);
  
  if (uniqueSpeakers.length !== 2) {
      console.warn(`Multi-speaker TTS requires exactly 2 voices, but found ${uniqueSpeakers.length}. Adjusting...`);
      while(uniqueSpeakers.length < 2) uniqueSpeakers.push(`Speaker${uniqueSpeakers.length + 1}`);
      if(uniqueSpeakers.length > 2) uniqueSpeakers.splice(2);
  }

  // Define voice configurations for narrator and characters. The API requires exactly 2.
  const speakerConfigs = [
    {
      speaker: uniqueSpeakers[0],
      voiceConfig: { prebuiltVoiceConfig: { voiceName: input.narratorVoice || 'Algenib' } },
    },
    {
      speaker: uniqueSpeakers[1],
      voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Achernar' } },
    },
  ];

  const { media } = await ai.generate({
    model: ttsModel,
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        multiSpeakerVoiceConfig: {
          speakerVoiceConfigs: speakerConfigs,
        },
      },
    },
    prompt: input.text,
  });

  if (!media) {
    throw new Error('No audio media returned from the TTS model.');
  }

  // Return base64 encoded PCM data
  const audioUrl = media.url.substring(media.url.indexOf(',') + 1);

  return { audioUrl };
}
