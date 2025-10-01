
'use server';

/**
 * @fileOverview Generates an illustration for a story chapter.
 *
 * - `generateStoryIllustration`: Creates an image from a text prompt.
 * - `GenerateStoryIllustrationInput`: The input type for the function.
 * - `GenerateStoryIllustrationOutput`: The return type for the function.
 */

import { getAi } from '@/ai/ai';
import { getDynamicModel } from '@/ai/utils';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';

const GenerateStoryIllustrationInputSchema = z.object({
  prompt: z.string().describe("A descriptive prompt based on a story chapter to generate an illustration from."),
  language: z.string().describe('The language of the prompt (e.g., "en" or "es").'),
});
export type GenerateStoryIllustrationInput = z.infer<typeof GenerateStoryIllustrationInputSchema>;


const GenerateStoryIllustrationOutputSchema = z.object({
  imageUrl: z.string().describe("The data URI of the generated image, encoded in Base64."),
});
export type GenerateStoryIllustrationOutput = z.infer<typeof GenerateStoryIllustrationOutputSchema>;


export async function generateStoryIllustration(
  input: GenerateStoryIllustrationInput
): Promise<GenerateStoryIllustrationOutput> {
  const result = await generateStoryIllustrationFlow(input);
  if (!result?.imageUrl) {
    throw new Error("Image generation failed to return a URL.");
  }
  return result;
}

const generateStoryIllustrationFlow = async (input: GenerateStoryIllustrationInput) => {
    const ai = await getAi();
    
    const model = googleAI.model('imagen-4.0-fast-generate-001');

    const { media } = await ai.generate({
        model,
        prompt: `Children's book illustration style, magical and whimsical, cinematic lighting. Scene: ${input.prompt}`,
        config: {
            responseModalities: ['IMAGE'],
        }
    });

    if (!media) {
      throw new Error('No media returned from image generation model.');
    }
    
    return { imageUrl: media.url };
};
