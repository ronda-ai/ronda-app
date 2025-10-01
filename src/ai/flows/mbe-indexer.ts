
'use server';
import { getAi } from '@/ai/ai';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';
import { chunk } from '@/lib/chunker';
import { resolve } from '@/services/bootstrap';
import { SERVICE_KEYS } from '@/config/service-keys';
import { IMbeExpertRepository } from '@/modules/mbe-expert/domain/interfaces/mbe-expert-repository.interface';
import pdf from 'pdf-parse';

const getMbeExpertRepository = () => resolve<IMbeExpertRepository>(SERVICE_KEYS.MbeExpertRepository);
const embeddingModel = googleAI.embedder('text-embedding-004');

const chunkingConfig = {
  minLength: 1000,
  maxLength: 2000,
  splitter: "sentence" as const,
  overlap: 100,
};

async function extractTextFromPdf(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch PDF from URL: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdf(buffer);
    return data.text;
}

// We need to retrieve `ai` asynchronously, so we wrap the flow definition.
export const indexMbeDocument = async (input: { url: string }) => {
  const ai = await getAi();
  const indexerFlow = ai.defineFlow(
    {
      name: 'indexMbeDocumentFlow',
      inputSchema: z.object({ url: z.string().describe('URL of the PDF document') }),
      outputSchema: z.object({
        success: z.boolean(),
        documentsIndexed: z.number(),
        error: z.string().optional(),
      }),
    },
    async ({ url }) => {
      const mbeRepository = getMbeExpertRepository();
      try {
        const pdfTxt = await ai.run('extract-text', () => extractTextFromPdf(url));
        const chunks = await ai.run('chunk-it', async () => chunk(pdfTxt, chunkingConfig));
        
        const documents = await Promise.all(chunks.map(async (text) => {
            const embeddingResponse = await ai.embed({
                embedder: embeddingModel,
                content: text,
            });
            // The embedding is the first element of the array in the response
            const embedding = embeddingResponse[0].embedding; 
            return { content: text, embedding, sourceUrl: url, createdAt: new Date() };
        }));
        
        await mbeRepository.deleteAll(); // Clear old documents before indexing
        await mbeRepository.createMany(documents);

        return {
          success: true,
          documentsIndexed: documents.length,
        };
      } catch (err) {
        return {
          success: false,
          documentsIndexed: 0,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }
  );
  
  return await indexerFlow(input);
};
