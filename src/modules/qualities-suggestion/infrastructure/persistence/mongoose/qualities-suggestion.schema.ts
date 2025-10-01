
import mongoose, { Schema, Document, Model } from 'mongoose';
import { QualitiesSuggestion } from '../../../domain/qualities-suggestion.entity';

const QualitiesSuggestionSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    suggestions: { type: [String], required: true },
}, { timestamps: true });


export interface IQualitiesSuggestionDocument extends Omit<QualitiesSuggestion, 'id' | 'studentId'>, Document {
    _id: mongoose.Types.ObjectId;
    id: string;
    studentId: mongoose.Types.ObjectId;
}

const QualitiesSuggestionModel: Model<IQualitiesSuggestionDocument> = mongoose.models.QualitiesSuggestion || mongoose.model<IQualitiesSuggestionDocument>('QualitiesSuggestion', QualitiesSuggestionSchema);

export default QualitiesSuggestionModel;
