
// This schema is a placeholder and not used for database operations currently.
import mongoose, { Schema, Document, Model } from 'mongoose';

const ImprovedObservationSchema = new Schema({
    originalObservation: { type: String, required: true },
    improvedObservation: { type: String, required: true },
}, { timestamps: true });

export interface IImprovedObservationDocument extends Document {
    _id: mongoose.Types.ObjectId;
    originalObservation: string;
    improvedObservation: string;
    createdAt: Date;
    updatedAt: Date;
}

const ImprovedObservationModel: Model<IImprovedObservationDocument> = mongoose.models.ImprovedObservation || mongoose.model<IImprovedObservationDocument>('ImprovedObservation', ImprovedObservationSchema);

export default ImprovedObservationModel;
