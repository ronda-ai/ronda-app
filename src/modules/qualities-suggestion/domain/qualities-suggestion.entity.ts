
import mongoose from "mongoose";

export class QualitiesSuggestion {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public suggestions: string[],
        public createdAt: Date
    ) {}
}
