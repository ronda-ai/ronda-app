
import mongoose from "mongoose";

export class ConcernAnalysis {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public analysis: string,
        public createdAt: Date
    ) {}
}
