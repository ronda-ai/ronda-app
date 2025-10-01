
import mongoose, { Schema, Document, Model } from 'mongoose';
import { ActivityType } from '@/ai/flows/generate-digital-conviviality-activity';

const activityTypes: ActivityType[] = ['netiquette-challenge', 'digital-collaboration', 'positive-messaging'];

const DigitalConvivialityActivitySchema = new Schema({
    title: { type: String, required: true },
    introduction: { type: String, required: true },
    materials: { type: [String], default: [] },
    pedagogicalObjectives: { type: [String], required: true },
    steps: { type: [String], required: true },
    studentInstructions: { type: String, required: true },
    activityType: { type: String, enum: activityTypes, required: true },
    customPrompt: { type: String },
}, { timestamps: true });

export interface IDigitalConvivialityActivityDocument extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    introduction: string;
    materials: string[];
    pedagogicalObjectives: string[];
    steps: string[];
    studentInstructions: string;
    activityType: ActivityType;
    customPrompt?: string;
    createdAt: Date;
    updatedAt: Date;
}

export function getDigitalConvivialityActivityModel(): Model<IDigitalConvivialityActivityDocument> {
  return mongoose.models.DigitalConvivialityActivity || mongoose.model<IDigitalConvivialityActivityDocument>('DigitalConvivialityActivity', DigitalConvivialityActivitySchema);
}
