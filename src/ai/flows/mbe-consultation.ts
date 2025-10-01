
'use server';
import { getAi } from '@/ai/ai';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';
import { getDynamicModel } from '../utils';
import { resolve } from '@/services/bootstrap';
import { SERVICE_KEYS } from '@/config/service-keys';
import { IMbeExpertRepository } from '@/modules/mbe-expert/domain/interfaces/mbe-expert-repository.interface';

const getMbeExpertRepository = () => resolve<IMbeExpertRepository>(SERVICE_KEYS.MbeExpertRepository);
const embeddingModel = googleAI.embedder('text-embedding-004');

export const generateMbeConsultation = async (input: {
  question: string;
  student?: any;
  language: string;
}) => {
    const ai = await getAi();
    const model = await getDynamicModel();
    const mbeRepository = getMbeExpertRepository();

    const menuQAFlow = ai.defineFlow(
      {
        name: 'mbeConsultationFlow',
        inputSchema: z.object({
          question: z.string(),
          student: z.any().optional(),
          language: z.string(),
        }),
        outputSchema: z.object({ answer: z.string() }),
      },
      async ({ question, student, language }) => {
        console.log("[MBE-CONSULTATION-FLOW] QUESTION: ",question)
        const embeddingResponse = await ai.embed({
          embedder: embeddingModel,
          content: question,
        });
        console.log("[MBE-CONSULTATION-FLOW] embeddingResponse: ",embeddingResponse)
        // Correctly extract the embedding array
        const questionEmbedding = embeddingResponse[0].embedding;
        console.log("[MBE-CONSULTATION-FLOW] questionEmbedding: ",questionEmbedding)
        // Retrieve relevant documents from MongoDB
        const docs = await mbeRepository.findSimilar(questionEmbedding, 5);
        console.log("[MBE-CONSULTATION-FLOW] DOCS: ", docs)

        const studentContext = student ? `\nStudent context to consider: ${JSON.stringify(student)}` : '';

        const { text } = await ai.generate({
          model,
          prompt: `You are an expert pedagogical coach specializing in the Chilean "Marco para la Buena Enseñanza" (MBE). 
          A teacher has asked the following question: "${question}"
          ${studentContext}
          
          Use ONLY the context provided below from the official MBE documents to answer the question in the specified language: ${language}.
          Provide a detailed, practical, and well-founded answer. If the provided context is not sufficient to answer, state that you cannot answer with the given information.
          Cite the relevant criteria (e.g., A2, B1) in your response where applicable.
          
          CONTEXT:
          ---
          ${docs.map(d => d.content).join('\n---\n')}
          ---
          `,
        });

        return { answer: text };
      }
    );

    return await menuQAFlow(input);
};
