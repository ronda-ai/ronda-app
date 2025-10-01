
import mongoose, { Schema, Document, Model } from 'mongoose';

const RiddleBattleSchema = new Schema({
    topic: { type: String },
    teamBlueRiddle: { type: String, required: true },
    teamBlueAnswer: { type: String, required: true },
    teamRedRiddle: { type: String, required: true },
    teamRedAnswer: { type: String, required: true },
    winner: { type: String, enum: ['teamBlue', 'teamRed', 'tie'] },
    feedback: { type: String },
    mood: { type: String },
}, { timestamps: true });

export interface IRiddleBattleDocument extends Document {
    _id: mongoose.Types.ObjectId;
    topic?: string;
    teamBlueRiddle: string;
    teamBlueAnswer: string;
    teamRedRiddle: string;
    teamRedAnswer: string;
    winner?: 'teamBlue' | 'teamRed' | 'tie';
    feedback?: string;
    mood?: string;
    createdAt: Date;
    updatedAt: Date;
}

const RiddleBattleModel: Model<IRiddleBattleDocument> = mongoose.models.RiddleBattle || mongoose.model<IRiddleBattleDocument>('RiddleBattle', RiddleBattleSchema);

export default RiddleBattleModel;
