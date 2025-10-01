
import mongoose, { Schema, Document, Model } from 'mongoose';

const GroupActivitySuggestionSchema = new Schema({
    teacherTip: { type: String, required: true },
    suggestedGroups: { type: [[String]], required: true },
    suggestedSkills: { type: [String], required: true },
    suggestedThemes: { type: [String], required: true },
}, { timestamps: true });

export interface IGroupActivitySuggestionDocument extends Document {
    _id: mongoose.Types.ObjectId;
    teacherTip: string;
    suggestedGroups: string[][];
    suggestedSkills: string[];
    suggestedThemes: string[];
    createdAt: Date;
    updatedAt: Date;
}

const GroupActivitySuggestionModel: Model<IGroupActivitySuggestionDocument> = mongoose.models.GroupActivitySuggestion || mongoose.model<IGroupActivitySuggestionDocument>('GroupActivitySuggestion', GroupActivitySuggestionSchema);

export default GroupActivitySuggestionModel;

    