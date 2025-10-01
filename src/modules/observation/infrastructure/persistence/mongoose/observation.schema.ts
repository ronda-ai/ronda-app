
import mongoose, { Schema, Document, Model } from 'mongoose';
import { Observation } from '../../../domain/observation.entity';
import { ObservationType } from '@/modules/observation/application/dtos/observation.dto';

const observationTypes: ObservationType[] = ['positive', 'negative', 'neutral', 'academic', 'social-emotional'];

const ObservationSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    observation: { type: String, required: true },
    type: { type: String, enum: observationTypes, required: true },
    tags: { type: [String], default: [] },
    deepeningQuestion: { type: String },
}, { timestamps: true });


export interface IObservationDocument extends Omit<Observation, 'id' | 'studentId' | 'createdAt'>, Document {
    _id: mongoose.Types.ObjectId;
    id: string;
    studentId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const ObservationModel: Model<IObservationDocument> = mongoose.models.Observation || mongoose.model<IObservationDocument>('Observation', ObservationSchema);

export default ObservationModel;
