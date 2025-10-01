
import mongoose from "mongoose";
import { SupportPlanStepStatus } from "../application/dtos/support-plan.dto";

export interface SupportPlanStep {
    text: string;
    status: SupportPlanStepStatus;
    feedback?: string;
}

export class SupportPlan {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public steps: SupportPlanStep[],
        public createdAt: Date,
        public updatedAt: Date,
        public teacherFeedback?: string
    ) {}
}
