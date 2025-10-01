
import mongoose, { Schema, Document, Model } from 'mongoose';

const TestAnalysisSchema = new Schema({
    submissionId: { type: Schema.Types.ObjectId, ref: 'TestSubmission', required: true, unique: true },
    performanceSummary: { type: String, required: true },
    strengths: { type: [String], required: true },
    opportunities: { type: [String], required: true },
    suggestion: { type: String, required: true },
}, { timestamps: true });


export interface ITestAnalysisDocument extends Document {
    _id: mongoose.Types.ObjectId;
    submissionId: mongoose.Types.ObjectId;
    performanceSummary: string;
    strengths: string[];
    opportunities: string[];
    suggestion: string;
    createdAt: Date;
    updatedAt: Date;
}

const TestAnalysisModel: Model<ITestAnalysisDocument> = mongoose.models.TestAnalysis || mongoose.model<ITestAnalysisDocument>('TestAnalysis', TestAnalysisSchema);

export default TestAnalysisModel;
