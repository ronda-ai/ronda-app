
import mongoose from "mongoose";

export class TestAnalysis {
    constructor(
        public id: any,
        public submissionId: mongoose.Types.ObjectId,
        public performanceSummary: string,
        public strengths: string[],
        public opportunities: string[],
        public suggestion: string,
        public createdAt: Date
    ) {}
}
