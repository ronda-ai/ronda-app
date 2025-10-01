
import mongoose from "mongoose";

export class MbeConsultation {
    constructor(
        public id: any,
        public question: string,
        public answer: string,
        public createdAt: Date,
        public studentContextId?: mongoose.Types.ObjectId,
    ) {}
}

export class MbeDocument {
    constructor(
        public id: any,
        public content: string,
        public embedding: number[],
        public sourceUrl: string,
        public createdAt: Date,
    ) {}
}
