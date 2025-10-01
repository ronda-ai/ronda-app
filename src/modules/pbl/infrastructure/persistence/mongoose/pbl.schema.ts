

import mongoose, { Schema, Document, Model } from 'mongoose';

const PblProjectSchema = new Schema({
    topic: { type: String, required: true },
    skills: { type: [String], required: true },
    duration: { type: String, required: true },
    essentialQuestion: { type: String, required: true },
    phases: { type: String, required: true },
    milestones: { type: String, required: true },
    finalProductSuggestion: { type: String, required: true },
    ageOrGrade: { type: String },
}, { timestamps: true });

export interface IPblProjectDocument extends Document {
    _id: mongoose.Types.ObjectId;
    topic: string;
    skills: string[];
    duration: string;
    essentialQuestion: string;
    phases: string;
    milestones: string;
    finalProductSuggestion: string;
    ageOrGrade?: string;
    createdAt: Date;
    updatedAt: Date;
}

const PblProjectModel: Model<IPblProjectDocument> = mongoose.models.PblProject || mongoose.model<IPblProjectDocument>('PblProject', PblProjectSchema);

export default PblProjectModel;
