
import mongoose from "mongoose";

export class FearUpdateSuggestion {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public fearToUpdate: string,
        public updateProposal: string,
        public originalSuggestionId: mongoose.Types.ObjectId,
        public createdAt: Date
    ) {}
}
