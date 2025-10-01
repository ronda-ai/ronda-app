
import { AIConfigurationDTO } from "@/modules/student/application/dtos/ai-configuration.dto";
import { SelectionMode } from "@/modules/student/domain/student.entity";
import mongoose, { Schema, Document, Model } from 'mongoose';

const AIConfigurationSchema = new Schema({
    subject: { type: String },
    ageOrGrade: { type: String },
    country: { type: String },
    challengeLocation: { type: String },
    customPrompt: { type: String },
    negativePrompt: { type: String },
    className: { type: String },
    classInterests: { type: [String] },
}, { _id: false });

const ChallengeSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    challenge: { type: String, required: true },
    tip: { type: String, required: true },
    status: { type: String, enum: ['pending', 'evaluated', 'rejected'], default: 'pending' },
    rating: { type: String, enum: ['needs-support', 'met-expectations', 'exceeded-expectations'] },
    feedback: { type: String },
    attempts: { type: Number },
    aiConfiguration: { type: AIConfigurationSchema },
    mood: { type: String },
    selectionMode: { type: String, enum: ['random', 'weighted', 'lightning', 'pair', 'personalized-individual', 'personalized-multiple'] },
}, { timestamps: true });

export interface IChallengeDocument extends Document {
    _id: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    challenge: string;
    tip: string;
    status: 'pending' | 'evaluated' | 'rejected';
    rating?: 'needs-support' | 'met-expectations' | 'exceeded-expectations';
    feedback?: string;
    attempts?: number;
    aiConfiguration?: Partial<AIConfigurationDTO>;
    mood?: string;
    selectionMode?: SelectionMode;
    createdAt: Date;
    updatedAt: Date;
}

const ChallengeModel: Model<IChallengeDocument> = mongoose.models.Challenge || mongoose.model<IChallengeDocument>('Challenge', ChallengeSchema);

export default ChallengeModel;
