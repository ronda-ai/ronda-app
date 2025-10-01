
import mongoose, { Schema, Document, Model } from 'mongoose';
import { FearManagementStepStatus } from '../../../application/dtos/fear-management-suggestion.dto';

const stepStatuses: FearManagementStepStatus[] = ['pending', 'completed', 'skipped'];

const FearManagementStepSchema = new Schema({
    text: { type: String, required: true },
    status: { type: String, enum: stepStatuses, default: 'pending' },
    feedback: { type: String },
}, { _id: false });


const FearManagementSuggestionSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    targetedFear: { type: String, required: true },
    title: { type: String, required: true },
    rationale: { type: String, required: true },
    steps: { type: [FearManagementStepSchema], required: true },
    deepeningQuestion: { type: String, required: true },
    teacherFeedback: { type: String },
}, { timestamps: true });


export interface IFearManagementSuggestionDocument extends Document {
    _id: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    targetedFear: string;
    title: string;
    rationale: string;
    steps: { text: string; status: FearManagementStepStatus; feedback?: string }[];
    deepeningQuestion: string;
    teacherFeedback?: string;
    createdAt: Date;
    updatedAt: Date;
}

const FearManagementSuggestionModel: Model<IFearManagementSuggestionDocument> = mongoose.models.FearManagementSuggestion || mongoose.model<IFearManagementSuggestionDocument>('FearManagementSuggestion', FearManagementSuggestionSchema);

export default FearManagementSuggestionModel;
