
import mongoose, { Schema, Document, Model } from 'mongoose';

const ProtocolStepSchema = new Schema({
    text: { type: String, required: true },
    assignedBrigadeId: { type: Schema.Types.ObjectId, ref: 'SafetyCommittee', required: false },
    assignedBrigadeName: { type: String, required: false },
}, { _id: false });

const SafetyProtocolSchema = new Schema({
    risk: { type: String, required: true },
    title: { type: String, required: true },
    beforeSteps: { type: [ProtocolStepSchema], default: [] },
    duringSteps: { type: [ProtocolStepSchema], default: [] },
    afterSteps: { type: [ProtocolStepSchema], default: [] },
}, { timestamps: true });

export interface ISafetyProtocolDocument extends Document {
    _id: mongoose.Types.ObjectId;
    risk: string;
    title: string;
    beforeSteps: { text: string; assignedBrigadeId?: mongoose.Types.ObjectId; assignedBrigadeName?: string; }[];
    duringSteps: { text: string; assignedBrigadeId?: mongoose.Types.ObjectId; assignedBrigadeName?: string; }[];
    afterSteps: { text: string; assignedBrigadeId?: mongoose.Types.ObjectId; assignedBrigadeName?: string; }[];
    createdAt: Date;
    updatedAt: Date;
}

const SafetyProtocolModel: Model<ISafetyProtocolDocument> = mongoose.models.SafetyProtocol || mongoose.model<ISafetyProtocolDocument>('SafetyProtocol', SafetyProtocolSchema);

export default SafetyProtocolModel;
