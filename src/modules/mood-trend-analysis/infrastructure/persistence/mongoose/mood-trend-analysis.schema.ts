
import mongoose, { Schema, Document, Model } from 'mongoose';
import { MoodTrendAnalysis } from '../../../domain/mood-trend-analysis.entity';

const InsightSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    studentsInvolved: { type: [String] },
    suggestion: { type: String },
    tags: { type: [String] },
}, { _id: false });


const MoodTrendAnalysisSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: false },
    analysis: { type: [InsightSchema], required: true },
    isClassroomLevel: { type: Boolean, required: true, default: false },
}, { timestamps: true });


export interface IMoodTrendAnalysisDocument extends Omit<MoodTrendAnalysis, 'id'>, Document {
    _id: mongoose.Types.ObjectId;
    id: string;
}

const MoodTrendAnalysisModel: Model<IMoodTrendAnalysisDocument> = mongoose.models.MoodTrendAnalysis || mongoose.model<IMoodTrendAnalysisDocument>('MoodTrendAnalysis', MoodTrendAnalysisSchema);

export default MoodTrendAnalysisModel;
