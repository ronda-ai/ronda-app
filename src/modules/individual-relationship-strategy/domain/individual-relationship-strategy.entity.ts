

import mongoose from "mongoose";
import { StrategyStatus, IndividualStrategyStepStatus } from '../application/dtos/individual-relationship-strategy.dto';

export interface StrategyStep {
    text: string;
    status: IndividualStrategyStepStatus;
    feedback?: string;
}

export class IndividualRelationshipStrategy {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public title: string,
        public rationale: string,
        public steps: StrategyStep[],
        public focus: string,
        public status: StrategyStatus,
        public createdAt: Date,
        public updatedAt: Date,
        public customPrompt?: string,
        public feedback?: string
    ) {}
}
