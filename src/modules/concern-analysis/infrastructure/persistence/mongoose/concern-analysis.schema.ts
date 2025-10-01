
import mongoose, { Schema, Document, Model } from 'mongoose';
import { ConcernAnalysis } from '../../../domain/concern-analysis.entity';

const ConcernAnalysisSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    analysis: { type: String, required: true },
}, { timestamps: true });


export interface IConcernAnalysisDocument extends Omit<ConcernAnalysis, 'id' | 'studentId' | 'createdAt'>, Document {
    _id: mongoose.Types.ObjectId;
    id: string;
    studentId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const ConcernAnalysisModel: Model<IConcernAnalysisDocument> = mongoose.models.ConcernAnalysis || mongoose.model<IConcernAnalysisDocument>('ConcernAnalysis', ConcernAnalysisSchema);

export default ConcernAnalysisModel;
