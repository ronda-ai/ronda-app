
import mongoose, { Schema, Document, Model } from 'mongoose';

const StrategySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    simulatedOutcome: { type: String, required: true },
}, { _id: false });

const DigitalConflictScenarioSchema = new Schema({
    title: { type: String, required: true },
    topics: { type: [String], default: [] },
    scenario: { type: String, required: true },
    strategies: { type: [StrategySchema], required: true },
}, { timestamps: true });

export interface IDigitalConflictScenarioDocument extends Document {
     _id: mongoose.Types.ObjectId;
     title: string;
     topics?: string[];
     scenario: string;
     strategies: { name: string; description: string; simulatedOutcome: string; }[];
     createdAt: Date;
     updatedAt: Date;
}

export function getDigitalConflictScenarioModel(): Model<IDigitalConflictScenarioDocument> {
  return mongoose.models.DigitalConflictScenario || mongoose.model<IDigitalConflictScenarioDocument>('DigitalConflictScenario', DigitalConflictScenarioSchema);
}
