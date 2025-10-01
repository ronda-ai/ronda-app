
import mongoose, { Schema, Document, Model } from 'mongoose';

const ChallengeSchema = new Schema({
    studentName: { type: String, required: true },
    challenge: { type: String, required: true },
}, { _id: false });

const LightningRoundSchema = new Schema({
    duration: { type: Number, required: true },
    interval: { type: Number, required: true },
    category: { type: String, required: true },
    plan: { type: [ChallengeSchema], required: true },
    feedback: { type: String },
}, { timestamps: true });

export interface ILightningRoundDocument extends Document {
    _id: mongoose.Types.ObjectId;
    duration: number;
    interval: number;
    category: string;
    plan: {
        studentName: string;
        challenge: string;
    }[];
    feedback?: string;
    createdAt: Date;
    updatedAt: Date;
}

const LightningRoundModel: Model<ILightningRoundDocument> = mongoose.models.LightningRound || mongoose.model<ILightningRoundDocument>('LightningRound', LightningRoundSchema);

export default LightningRoundModel;
