

import mongoose, { Schema, Document, Model } from 'mongoose';

const ActivitySuggestionSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    topics: { type: [String], required: true },
    themes: { type: [String], required: true },
}, { timestamps: true });

export interface IActivitySuggestionDocument extends Document {
    _id: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    topics: string[];
    themes: string[];
    createdAt: Date;
    updatedAt: Date;
}

const ActivitySuggestionModel: Model<IActivitySuggestionDocument> = mongoose.models.ActivitySuggestion || mongoose.model<IActivitySuggestionDocument>('ActivitySuggestion', ActivitySuggestionSchema);

export default ActivitySuggestionModel;
