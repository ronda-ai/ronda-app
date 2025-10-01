

import mongoose, { Schema, Document, Model } from 'mongoose';
import { IndividualStrategyStepStatus, StrategyStatus } from '@/modules/individual-relationship-strategy/application/dtos/individual-relationship-strategy.dto';

const stepStatuses: IndividualStrategyStepStatus[] = ['pending', 'completed', 'skipped'];
const strategyStatuses: StrategyStatus[] = ['not_started', 'in_progress', 'successful', 'partially_successful', 'did_not_work', 'needs_adjustment'];


const StrategyStepSchema = new Schema({
    text: { type: String, required: true },
    status: { type: String, enum: stepStatuses, default: 'pending' },
    feedback: { type: String },
}, { _id: false });

const IndividualRelationshipStrategySchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    title: { type: String, required: true },
    rationale: { type: String, required: true },
    steps: { type: [StrategyStepSchema], required: true },
    focus: { type: String, required: true },
    customPrompt: { type: String },
    status: { type: String, enum: strategyStatuses, default: 'not_started' },
    feedback: { type: String },
}, { timestamps: true });

export interface IIndividualRelationshipStrategyDocument extends Document {
    _id: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    title: string;
    rationale: string;
    steps: { text: string; status: IndividualStrategyStepStatus; feedback?: string; }[];
    focus: string;
    customPrompt?: string;
    status: StrategyStatus;
    feedback?: string;
    createdAt: Date;
    updatedAt: Date;
}

const IndividualRelationshipStrategyModel: Model<IIndividualRelationshipStrategyDocument> = mongoose.models.IndividualRelationshipStrategy || mongoose.model<IIndividualRelationshipStrategyDocument>('IndividualRelationshipStrategy', IndividualRelationshipStrategySchema);

export default IndividualRelationshipStrategyModel;
