import { z } from 'zod';
import { TestBlock } from '@/modules/test/domain/test.entity';

export const RubricCriterionSchema = z.object({
  criterion: z.string().describe("The name of the evaluation criterion (e.g., 'Clarity of Explanation', 'Teamwork', 'Creativity')."),
  excellent: z.string().describe("Description of what constitutes excellent performance for this criterion."),
  satisfactory: z.string().describe("Description of what constitutes satisfactory or sufficient performance."),
  needsImprovement: z.string().describe("Description of what constitutes a performance that needs improvement."),
});

export const ScoringSectionSchema = z.object({
    section: z.string().describe("The title of the test section (e.g., 'Multiple Choice', 'Open-ended Questions')."),
    points: z.string().describe("The points awarded for this section (e.g., '5 points total', '2 points per question')."),
    description: z.string().describe("A brief explanation of how points are awarded in this section."),
});

const ExistingRubricSchema = z.object({
  criteria: z.array(RubricCriterionSchema).optional(),
  suggestedScoring: z.array(ScoringSectionSchema).optional(),
});

export const GenerateRubricInputSchema = z.object({
  activityDescription: z.string().describe('A summary of the activity or test being evaluated.'),
  language: z.string().describe('The language for the generated rubric (e.g., "en" or "es").'),
  ageOrGrade: z.string().optional().describe('The age or grade level of the students, for context (e.g., "9 years old", "4th Grade").'),
  subject: z.string().optional().describe('The academic subject, to provide broader context for the activity.'),
  blocks: z.array(z.custom<TestBlock>()).optional().describe("An array of question blocks from the test, including type and question count. This is CRITICAL for generating a scoring guide."),
  existingRubric: ExistingRubricSchema.optional().describe("An optional existing rubric to refine or update.")
});
export type GenerateRubricInput = z.infer<typeof GenerateRubricInputSchema>;

export const GenerateRubricOutputSchema = z.object({
  criteria: z.array(RubricCriterionSchema).min(3).max(5).describe('A list of 3 to 5 general evaluation criteria.'),
  suggestedScoring: z.array(ScoringSectionSchema).describe("An array of scoring sections, detailing how points are awarded for each part of the test."),
});
export type GenerateRubricOutput = z.infer<typeof GenerateRubricOutputSchema>;
