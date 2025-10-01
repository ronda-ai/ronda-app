import mongoose, { Schema, Document, Model } from 'mongoose';

const AnswerSchema = new Schema(
  {
    questionId: { type: String, required: true },
    answer: { type: Schema.Types.Mixed, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { _id: false }
);

const TestSubmissionSchema = new Schema(
  {
    testId: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    answers: { type: [AnswerSchema], required: true },
    score: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export interface ITestSubmissionDocument extends Document {
  _id: mongoose.Types.ObjectId;
  testId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  answers: {
    questionId: string;
    answer: any;
    isCorrect: boolean;
  }[];
  score: number;
  maxScore: number;
  submittedAt: Date;
}

const TestSubmissionModel: Model<ITestSubmissionDocument> =
  mongoose.models.TestSubmission ||
  mongoose.model<ITestSubmissionDocument>(
    'TestSubmission',
    TestSubmissionSchema
  );

export default TestSubmissionModel;
