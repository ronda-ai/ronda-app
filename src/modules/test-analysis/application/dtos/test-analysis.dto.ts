import { z } from 'zod';
import { TestBlock } from '@/modules/test/domain/test.entity';

export const TestAnalysisInputSchema = z.object({
  testTitle: z.string(),
  studentName: z.string(),
  questions: z.array(z.object({
    question: z.string(),
    studentAnswer: z.string(),
    correctAnswer: z.string(),
    isCorrect: z.boolean()
  })),
  score: z.number(),
  maxScore: z.number(),
  language: z.string(),
});

export const TestAnalysisOutputSchema = z.object({
  performanceSummary: z.string().describe("A brief, one-sentence summary of the student's overall performance."),
  strengths: z.array(z.string()).describe("A list of 1-2 key areas or topics where the student performed well."),
  opportunities: z.array(z.string()).describe("A list of 1-2 key areas or topics where the student struggled."),
  suggestion: z.string().describe("A concrete, actionable suggestion for the teacher to help the student improve in their areas of opportunity."),
});

export type TestAnalysisDTO = z.infer<typeof TestAnalysisOutputSchema>;

export interface FullTestAnalysisDTO extends TestAnalysisDTO {
  id: string;
  submissionId: string;
  createdAt: string;
}
