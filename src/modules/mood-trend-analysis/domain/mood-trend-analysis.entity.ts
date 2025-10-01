
import mongoose from "mongoose";
import { Insight } from "../application/dtos/mood-trend-analysis.dto";

export class MoodTrendAnalysis {
    constructor(
        public id: any,
        public analysis: Insight[],
        public isClassroomLevel: boolean,
        public createdAt: Date,
        public studentId?: mongoose.Types.ObjectId,
    ) {}
}
