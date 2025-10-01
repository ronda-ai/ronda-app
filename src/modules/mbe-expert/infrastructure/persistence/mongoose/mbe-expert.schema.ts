
import mongoose, { Schema, Document, Model } from 'mongoose';

const MbeDocumentSchema = new Schema({
    content: { type: String, required: true },
    embedding: { type: [Number], required: true },
    sourceUrl: { type: String, required: true },
}, { timestamps: true });

export interface IMbeDocument extends Document {
    _id: mongoose.Types.ObjectId;
    content: string;
    embedding: number[];
    sourceUrl: string;
    createdAt: Date;
}

const MbeDocumentModel: Model<IMbeDocument> = mongoose.models.MbeDocument || mongoose.model<IMbeDocument>('MbeDocument', MbeDocumentSchema);

export default MbeDocumentModel;
