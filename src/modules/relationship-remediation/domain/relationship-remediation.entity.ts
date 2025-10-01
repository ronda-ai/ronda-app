
import mongoose from "mongoose";
import { RemediationStatus, RemediationStep } from "../application/dtos/relationship-remediation.dto";

export class RelationshipRemediation {
    constructor(
        public id: any,
        public studentIds: mongoose.Types.ObjectId[],
        public focus: string,
        public strategyTitle: string,
        public steps: RemediationStep[],
        public status: RemediationStatus,
        public createdAt: Date,
        public customPrompt?: string,
        public feedback?: string,
    ) {}
}
