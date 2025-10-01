
import mongoose, { Schema, Document, Model } from 'mongoose';

const AdaptationSuggestionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    reasoning: { type: String, required: true },
}, { _id: false });

const ActivityAdaptationSchema = new Schema({
    originalActivity: { type: String, required: true },
    suggestions: { type: [AdaptationSuggestionSchema], required: true },
    ageOrGrade: { type: String },
    country: { type: String },
    subject: { type: String },
}, { timestamps: true });

export interface IActivityAdaptationDocument extends Document {
    _id: mongoose.Types.ObjectId;
    originalActivity: string;
    suggestions: {
        title: string;
        description: string;
        reasoning: string;
    }[];
    ageOrGrade?: string;
    country?: string;
    subject?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ActivityAdaptationModel: Model<IActivityAdaptationDocument> = mongoose.models.ActivityAdaptation || mongoose.model<IActivityAdaptationDocument>('ActivityAdaptation', ActivityAdaptationSchema);

export default ActivityAdaptationModel;
