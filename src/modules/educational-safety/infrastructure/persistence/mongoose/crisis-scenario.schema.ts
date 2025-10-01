
import mongoose, { Schema, Document, Model } from 'mongoose';

const ChoiceSchema = new Schema({
    text: { type: String, required: true },
}, { _id: false });

const EvaluationSchema = new Schema({
    isCorrect: { type: String, enum: ['good', 'average', 'bad'], required: true },
    feedback: { type: String, required: true },
    scoreChange: { type: Number, required: true },
}, { _id: false });

const InitialScenarioSchema = new Schema({
    narrative: { type: String, required: true },
    choices: { type: [ChoiceSchema], required: true },
    isFinalStep: { type: Boolean, required: true },
    evaluation: { type: EvaluationSchema },
    finalSummary: { type: String },
}, { _id: false });


const CrisisScenarioSchema = new Schema({
    crisisType: { type: String, required: true },
    simulationLength: { type: String, enum: ['short', 'medium', 'complex'], default: 'short' },
    studentIds: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    initialScenario: { type: InitialScenarioSchema, required: true },
}, { timestamps: true });

CrisisScenarioSchema.virtual('students', {
    ref: 'Student',
    localField: 'studentIds',
    foreignField: '_id',
    justOne: false,
});

CrisisScenarioSchema.set('toObject', { virtuals: true });
CrisisScenarioSchema.set('toJSON', { virtuals: true });

export interface ICrisisScenarioDocument extends Document {
    _id: mongoose.Types.ObjectId;
    crisisType: string;
    simulationLength?: 'short' | 'medium' | 'complex';
    studentIds?: mongoose.Types.ObjectId[];
    students?: any[]; // For population
    initialScenario: {
        narrative: string;
        choices: { text: string }[];
        isFinalStep: boolean;
        evaluation?: {
            isCorrect: 'good' | 'average' | 'bad';
            feedback: string;
            scoreChange: number;
        };
        finalSummary?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const CrisisScenarioModel: Model<ICrisisScenarioDocument> = mongoose.models.CrisisScenario || mongoose.model<ICrisisScenarioDocument>('CrisisScenario', CrisisScenarioSchema);

export default CrisisScenarioModel;
