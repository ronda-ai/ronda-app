
import { RemediationStatus, RemediationStepStatus } from '@/modules/relationship-remediation/application/dtos/relationship-remediation.dto';
import mongoose, { Schema, Document, Model } from 'mongoose';

const remediationStatuses: RemediationStatus[] = ['not_started', 'in_progress', 'successful', 'partially_successful', 'did_not_work', 'needs_adjustment'];
const stepStatuses: RemediationStepStatus[] = ['pending', 'completed', 'skipped'];

const RemediationStepSchema = new Schema({
    text: { type: String, required: true },
    status: { type: String, enum: stepStatuses, default: 'pending' },
    feedback: { type: String },
}, { _id: false });


const RelationshipRemediationSchema = new Schema({
    studentIds: [{ type: Schema.Types.ObjectId, ref: 'Student', required: true }],
    focus: { type: String, required: true },
    customPrompt: { type: String },
    strategyTitle: { type: String, required: true },
    steps: { type: [RemediationStepSchema], required: true },
    status: { type: String, enum: remediationStatuses, default: 'not_started' },
    feedback: { type: String },
}, { timestamps: true });

export interface IRelationshipRemediationDocument extends Document {
    _id: mongoose.Types.ObjectId;
    studentIds: mongoose.Types.ObjectId[];
    focus: string;
    customPrompt?: string;
    strategyTitle: string;
    steps: {
        text: string;
        status: RemediationStepStatus;
        feedback?: string;
    }[];
    status: RemediationStatus;
    feedback?: string;
    createdAt: Date;
    updatedAt: Date;
}

const RelationshipRemediationModel: Model<IRelationshipRemediationDocument> = mongoose.models.RelationshipRemediation || mongoose.model<IRelationshipRemediationDocument>('RelationshipRemediation', RelationshipRemediationSchema);

export default RelationshipRemediationModel;
