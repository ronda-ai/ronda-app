
export type BloomLevel = 'Remembering' | 'Understanding' | 'Applying' | 'Analyzing' | 'Evaluating' | 'Creating';

export interface QuestionAnalysis {
  question: string;
  bloomLevel: BloomLevel;
  justification: string;
  suggestion: string;
}

export interface QuestionAnalysisInput {
  questions: string[];
  language: string;
}

export interface QuestionAnalysisOutput {
  analyses: QuestionAnalysis[];
  summary: string;
}
