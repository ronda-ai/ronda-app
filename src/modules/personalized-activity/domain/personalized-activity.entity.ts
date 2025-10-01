
import mongoose from "mongoose";
import { PersonalizedActivityStepStatus } from "../application/dtos/personalized-activity.dto";

export interface PersonalizedActivityStep {
    title: string;
    description: string;
    modality: "Cozy Corner" | "Center Stage" | "Power Duo";
    status: PersonalizedActivityStepStatus;
    feedback?: string;
}

export class PersonalizedActivity {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public topic: string,
        public skills: string[],
        public themes: string[],
        public activities: PersonalizedActivityStep[],
        public createdAt: Date,
        public updatedAt: Date,
        public feedback?: string,
    ) {}
}
