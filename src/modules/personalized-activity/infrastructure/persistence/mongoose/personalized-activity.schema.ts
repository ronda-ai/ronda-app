
import mongoose, { Schema, Document, Model } from 'mongoose';
import { PersonalizedActivityStepStatus } from '@/modules/personalized-activity/application/dtos/personalized-activity.dto';

const stepStatuses: PersonalizedActivityStepStatus[] = ['pending', 'in-progress', 'completed', 'skipped'];

const PersonalizedActivityStepSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    modality: { type: String, enum: ["Cozy Corner", "Center Stage", "Power Duo"], required: true },
    status: { type: String, enum: stepStatuses, required: true, default: 'pending' },
    feedback: { type: String },
}, { _id: false });

const PersonalizedActivitySchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    topic: { type: String, required: true },
    skills: { type: [String], required: true },
    themes: { type: [String], required: true },
    activities: { type: [PersonalizedActivityStepSchema], required: true },
    feedback: { type: String },
}, { timestamps: true });

export interface IPersonalizedActivityDocument extends Document {
    _id: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    topic: string;
    skills: string[];
    themes: string[];
    activities: {
        title: string;
        description: string;
        modality: "Cozy Corner" | "Center Stage" | "Power Duo";
        status: PersonalizedActivityStepStatus;
        feedback?: string;
    }[];
    feedback?: string;
    createdAt: Date;
    updatedAt: Date;
}

const PersonalizedActivityModel: Model<IPersonalizedActivityDocument> = mongoose.models.PersonalizedActivity || mongoose.model<IPersonalizedActivityDocument>('PersonalizedActivity', PersonalizedActivitySchema);

export default PersonalizedActivityModel;
