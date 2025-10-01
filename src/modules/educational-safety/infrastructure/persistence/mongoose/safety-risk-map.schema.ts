
import mongoose, { Schema, Document, Model } from 'mongoose';

const riskPriorities = ['High', 'Medium', 'Low', 'Alto', 'Medio', 'Bajo'];

const RiskItemSchema = new Schema({
    risk: { type: String, required: true },
    priority: { type: String, enum: riskPriorities, required: true },
    justification: { type: String, required: true },
}, { _id: false });

const RiskMapSchema = new Schema({
    introduction: { type: String, required: true },
    naturalRisks: [RiskItemSchema],
    socialRisks: [RiskItemSchema],
    infrastructureRisks: [RiskItemSchema],
}, { _id: false });


const SafetyRiskMapSchema = new Schema({
    locationContext: { type: String, required: true },
    infrastructureContext: { type: String, required: true },
    socialContext: { type: String, required: true },
    analysisDepth: { type: String, enum: ['concise', 'moderate', 'exhaustive'], default: 'moderate' },
    title: { type: String, required: true },
    riskMap: { type: RiskMapSchema, required: true },
}, { timestamps: true });


export interface ISafetyRiskMapDocument extends Document {
    _id: mongoose.Types.ObjectId;
    locationContext: string;
    infrastructureContext: string;
    socialContext: string;
    analysisDepth: 'concise' | 'moderate' | 'exhaustive';
    title: string;
    riskMap: {
        introduction: string;
        naturalRisks: { risk: string; priority: 'High' | 'Medium' | 'Low' | 'Alto' | 'Medio' | 'Bajo'; justification: string; }[];
        socialRisks: { risk: string; priority: 'High' | 'Medium' | 'Low' | 'Alto' | 'Medio' | 'Bajo'; justification: string; }[];
        infrastructureRisks: { risk: string; priority: 'High' | 'Medium' | 'Low' | 'Alto' | 'Medio' | 'Bajo'; justification: string; }[];
    };
    createdAt: Date;
    updatedAt: Date;
}

const SafetyRiskMapModel: Model<ISafetyRiskMapDocument> = mongoose.models.SafetyRiskMap || mongoose.model<ISafetyRiskMapDocument>('SafetyRiskMap', SafetyRiskMapSchema);

export default SafetyRiskMapModel;

    
