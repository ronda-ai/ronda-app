
import mongoose from "mongoose";
import { FearManagementStepStatus } from "../application/dtos/fear-management-suggestion.dto";

export interface FearManagementStep {
    text: string;
    status: FearManagementStepStatus;
    feedback?: string;
}

export class FearManagementSuggestion {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public targetedFear: string,
        public title: string,
        public rationale: string,
        public steps: FearManagementStep[],
        public deepeningQuestion: string,
        public createdAt: Date,
        public teacherFeedback?: string
    ) {}
}
