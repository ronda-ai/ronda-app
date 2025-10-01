
import mongoose, { Schema, Document, Model } from 'mongoose';

const FearUpdateSuggestionSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    fearToUpdate: { type: String, required: true },
    updateProposal: { type: String, required: true },
    originalSuggestionId: { type: Schema.Types.ObjectId, ref: 'FearManagementSuggestion', required: true },
}, { timestamps: true });


export interface IFearUpdateSuggestionDocument extends Document {
    _id: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    fearToUpdate: string;
    updateProposal: string;
    originalSuggestionId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const FearUpdateSuggestionModel: Model<IFearUpdateSuggestionDocument> = mongoose.models.FearUpdateSuggestion || mongoose.model<IFearUpdateSuggestionDocument>('FearUpdateSuggestion', FearUpdateSuggestionSchema);

export default FearUpdateSuggestionModel;
