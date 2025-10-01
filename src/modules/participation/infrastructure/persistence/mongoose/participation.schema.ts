
import { Participation } from '@/modules/participation/domain/participation.entity';
import mongoose, { Schema, Document, Model } from 'mongoose';


const ParticipationSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });


export interface IParticipationDocument extends Omit<Participation, 'id' | 'studentId'>, Document {
    _id: mongoose.Types.ObjectId;
    id: string;
    studentId: mongoose.Types.ObjectId;
}

const ParticipationModel: Model<IParticipationDocument> = mongoose.models.Participation || mongoose.model<IParticipationDocument>('Participation', ParticipationSchema);

export default ParticipationModel;
