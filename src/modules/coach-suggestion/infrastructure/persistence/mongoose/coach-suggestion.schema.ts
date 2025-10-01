
import mongoose, { Schema, Document, Model } from 'mongoose';
import { CoachSuggestion } from '../../../domain/coach-suggestion.entity';

const CoachSuggestionSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    title: { type: String, required: true },
    positiveAspects: { type: [String], required: true },
    areasForImprovement: { type: [String], required: true },
    suggestion: { type: String, required: true },
    deepeningQuestion: { type: String, required: true },
}, { timestamps: true });


export interface ICoachSuggestionDocument extends Omit<CoachSuggestion, 'id' | 'studentId' | 'createdAt'>, Document {
    _id: mongoose.Types.ObjectId;
    id: string;
    studentId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const CoachSuggestionModel: Model<ICoachSuggestionDocument> = mongoose.models.CoachSuggestion || mongoose.model<ICoachSuggestionDocument>('CoachSuggestion', CoachSuggestionSchema);

export default CoachSuggestionModel;
