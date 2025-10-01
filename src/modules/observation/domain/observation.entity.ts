
import mongoose from "mongoose";
import { ObservationType } from "../application/dtos/observation.dto";

export class Observation {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public observation: string,
        public type: ObservationType,
        public tags: string[],
        public createdAt: Date,
        public deepeningQuestion?: string,
    ) {}
}
