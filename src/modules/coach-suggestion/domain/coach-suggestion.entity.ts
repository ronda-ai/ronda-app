
import mongoose from "mongoose";

export class CoachSuggestion {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public title: string,
        public positiveAspects: string[],
        public areasForImprovement: string[],
        public suggestion: string,
        public deepeningQuestion: string,
        public createdAt: Date
    ) {}
}
