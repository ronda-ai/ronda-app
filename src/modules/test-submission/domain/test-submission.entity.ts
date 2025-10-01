import mongoose from 'mongoose';

export interface Answer {
  questionId: string;
  answer: any;
  isCorrect: boolean;
}

export class TestSubmission {
  constructor(
    public id: any,
    public testId: mongoose.Types.ObjectId,
    public studentId: mongoose.Types.ObjectId,
    public answers: Answer[],
    public score: number,
    public maxScore: number,
    public submittedAt: Date
  ) {}
}
