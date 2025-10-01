
import mongoose, { Schema, Document, Model } from 'mongoose';

const PulseItemSchema = new Schema({
    mbeCriterion: { type: String, required: true },
    description: { type: String, required: true },
}, { _id: false });

const ClassroomPulseSchema = new Schema({
    strengths: [PulseItemSchema],
    challenges: [PulseItemSchema],
}, { timestamps: true });

export interface IClassroomPulseDocument extends Document {
    _id: mongoose.Types.ObjectId;
    strengths: { mbeCriterion: string; description: string; }[];
    challenges: { mbeCriterion: string; description: string; }[];
    createdAt: Date;
}

const ClassroomPulseModel: Model<IClassroomPulseDocument> = mongoose.models.ClassroomPulse || mongoose.model<IClassroomPulseDocument>('ClassroomPulse', ClassroomPulseSchema);

export default ClassroomPulseModel;
