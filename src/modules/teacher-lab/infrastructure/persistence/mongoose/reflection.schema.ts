
import mongoose, { Schema, Document, Model } from 'mongoose';

const ReflectionMessageSchema = new Schema({
    role: { type: String, enum: ['user', 'model'], required: true },
    text: { type: String, required: true },
}, { _id: false });

const ReflectionSchema = new Schema({
    history: [ReflectionMessageSchema]
}, { timestamps: true });

export interface IReflectionDocument extends Document {
    _id: mongoose.Types.ObjectId;
    history: {
        role: 'user' | 'model';
        text: string;
    }[];
    createdAt: Date;
}

const ReflectionModel: Model<IReflectionDocument> = mongoose.models.Reflection || mongoose.model<IReflectionDocument>('Reflection', ReflectionSchema);

export default ReflectionModel;
