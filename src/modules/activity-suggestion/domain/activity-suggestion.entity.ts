

import mongoose from "mongoose";

export class ActivitySuggestion {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public topics: string[],
        public themes: string[],
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}
