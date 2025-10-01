

import mongoose, { Schema, Document, Model } from 'mongoose';

const RubricCriterionSchema = new Schema({
    criterion: { type: String, required: true },
    excellent: { type: String, required: true },
    satisfactory: { type: String, required: true },
    needsImprovement: { type: String, required: true },
}, { _id: false });

const ScoringSectionSchema = new Schema({
    section: { type: String, required: true },
    points: { type: String, required: true },
    description: { type: String, required: true },
}, { _id: false });


const RubricSuggestionSchema = new Schema({
    activityDescription: { type: String, required: true },
    criteria: { type: [RubricCriterionSchema], required: true },
    suggestedScoring: { type: [ScoringSectionSchema] },
}, { timestamps: true });

export interface IRubricSuggestionDocument extends Document {
    _id: mongoose.Types.ObjectId;
    activityDescription: string;
    criteria: {
        criterion: string;
        excellent: string;
        satisfactory: string;
        needsImprovement: string;
    }[];
    suggestedScoring: {
        section: string;
        points: string;
        description: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const RubricSuggestionModel: Model<IRubricSuggestionDocument> = mongoose.models.RubricSuggestion || mongoose.model<IRubricSuggestionDocument>('RubricSuggestion', RubricSuggestionSchema);

export default RubricSuggestionModel;
