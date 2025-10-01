export interface Answer {
  questionId: string;
  answer: any;
  isCorrect: boolean;
}

export interface TestSubmissionDTO {
  id: string;
  testId: string;
  studentId: string;
  studentName: string;
  answers: Answer[];
  score: number;
  maxScore: number;
  submittedAt: string;
}
