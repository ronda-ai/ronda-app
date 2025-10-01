
import mongoose, { Schema, Document, Model } from 'mongoose';
import { BloomLevel } from '@/modules/teacher-lab/application/dtos/question-analysis.dto';

const bloomLevels: BloomLevel[] = ['Remembering', 'Understanding', 'Applying', 'Analyzing', 'Evaluating', 'Creating'];

const QuestionAnalysisDetailSchema = new Schema({
    question: { type: String, required: true },
    bloomLevel: { type: String, enum: bloomLevels, required: true },
    justification: { type: String, required: true },
    suggestion: { type: String, required: true },
}, { _id: false });

const QuestionAnalysisSchema = new Schema({
    analyses: [QuestionAnalysisDetailSchema],
    summary: { type: String, required: true },
}, { timestamps: true });

export interface IQuestionAnalysisDocument extends Document {
    _id: mongoose.Types.ObjectId;
    analyses: {
        question: string;
        bloomLevel: BloomLevel;
        justification: string;
        suggestion: string;
    }[];
    summary: string;
    createdAt: Date;
}

export function getQuestionAnalysisModel(): Model<IQuestionAnalysisDocument> {
    return mongoose.models.QuestionAnalysis || mongoose.model<IQuestionAnalysisDocument>('QuestionAnalysis', QuestionAnalysisSchema);
}
