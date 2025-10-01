
import mongoose, { Schema, Document, Model } from 'mongoose';
import { DebateTeams, Turn } from '../../../domain/debate.entity';

const TurnSchema = new Schema({
    team: { type: String, enum: ['affirmative', 'negative', 'both', 'teacher'], required: true },
    type: { type: String, required: true },
    durationSeconds: { type: Number, required: true },
}, { _id: false });

const TeamsSchema = new Schema({
    affirmative: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    negative: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    unassigned: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
}, { _id: false });

const DebateSchema = new Schema({
    topic: { type: String, required: true },
    complexity: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    affirmativeStance: { type: String, required: true },
    negativeStance: { type: String, required: true },
    guidingQuestions: { type: [String], required: true },
    rules: { type: [String], required: true },
    turnStructure: { type: [TurnSchema], required: true },
    status: { type: String, enum: ['draft', 'live', 'closed'], default: 'draft' },
    liveId: { type: String, unique: true, sparse: true },
    teams: { type: TeamsSchema, default: () => ({ affirmative: [], negative: [], unassigned: [] }) },
    currentTurnIndex: { type: Number, default: -1 },
    turnStartedAt: { type: Date, default: null },
    isPaused: { type: Boolean, default: false },
    pausedAt: { type: Date, default: null },
    accumulatedPauseTime: { type: Number, default: 0 },
}, { timestamps: true });

export interface IDebateDocument extends Document {
    _id: mongoose.Types.ObjectId;
    topic: string;
    complexity: 'beginner' | 'intermediate' | 'advanced';
    affirmativeStance: string;
    negativeStance: string;
    guidingQuestions: string[];
    rules: string[];
    turnStructure: Turn[];
    status: 'draft' | 'live' | 'closed';
    liveId?: string;
    teams?: DebateTeams;
    currentTurnIndex: number;
    turnStartedAt: Date | null;
    isPaused: boolean;
    pausedAt: Date | null;
    accumulatedPauseTime: number;
    createdAt: Date;
    updatedAt: Date;
}

const DebateModel: Model<IDebateDocument> = mongoose.models.Debate || mongoose.model<IDebateDocument>('Debate', DebateSchema);

export default DebateModel;
