

import mongoose, { Schema, Document, Model } from 'mongoose';

const ActivitySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    modality: { type: String, enum: ["Cozy Corner", "Center Stage", "Power Duo"], required: true },
}, { _id: false });

const CurriculumActivitySchema = new Schema({
    topic: { type: String, required: true },
    skills: { type: [String], required: true },
    language: { type: String, required: true },
    ageOrGrade: { type: String },
    country: { type: String },
    subject: { type: String },
    activities: { type: [ActivitySchema], required: true },
    feedback: { type: String },
    complexity: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    duration: { type: String, enum: ['short', 'medium', 'long'] },
    learningModality: { type: String },
    socialDynamic: { type: String },
    bloomLevel: { type: String },
    resourceConstraints: { type: [String] },
}, { timestamps: true });

export interface ICurriculumActivityDocument extends Document {
    _id: mongoose.Types.ObjectId;
    topic: string;
    skills: string[];
    language: string;
    ageOrGrade?: string;
    country?: string;
    subject?: string;
    activities: {
        title: string;
        description: string;
        modality: "Cozy Corner" | "Center Stage" | "Power Duo";
    }[];
    feedback?: string;
    complexity?: 'beginner' | 'intermediate' | 'advanced';
    duration?: 'short' | 'medium' | 'long';
    learningModality?: string;
    socialDynamic?: string;
    bloomLevel?: string;
    resourceConstraints?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const CurriculumActivityModel: Model<ICurriculumActivityDocument> = mongoose.models.CurriculumActivity || mongoose.model<ICurriculumActivityDocument>('CurriculumActivity', CurriculumActivitySchema);

export default CurriculumActivityModel;
