
import mongoose, { Schema, Document, Model } from 'mongoose';
import { SupportPlan, SupportPlanStep } from '../../../domain/support-plan.entity';
import { SupportPlanStepStatus } from '../../../application/dtos/support-plan.dto';

const stepStatuses: SupportPlanStepStatus[] = ['pending', 'achieved', 'partially-achieved', 'not-achieved', 'discarded'];

const SupportPlanStepSchema = new Schema({
    text: { type: String, required: true },
    status: { type: String, enum: stepStatuses, required: true, default: 'pending' },
    feedback: { type: String },
}, { _id: false });

const SupportPlanSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    steps: { type: [SupportPlanStepSchema], required: true },
    teacherFeedback: { type: String },
}, { timestamps: true });

export interface ISupportPlanDocument extends Omit<SupportPlan, 'id' | 'studentId' | 'steps'>, Document {
    _id: mongoose.Types.ObjectId;
    id: string;
    studentId: mongoose.Types.ObjectId;
    steps: { text: string; status: SupportPlanStepStatus; feedback?: string }[];
}

const SupportPlanModel: Model<ISupportPlanDocument> = mongoose.models.SupportPlan || mongoose.model<ISupportPlanDocument>('SupportPlan', SupportPlanSchema);

export default SupportPlanModel;
