

import mongoose, { Schema, Document, Model } from 'mongoose';

const PrincipleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { _id: false });

const NormSchema = new Schema({
    principle: { type: String, required: true },
    norm: { type: String, required: true },
}, { _id: false });

const ConsequenceSchema = new Schema({
    level: { type: Number, required: true },
    description: { type: String, required: true },
    restorativeAction: { type: String, required: true },
}, { _id: false });

const DigitalPactSchema = new Schema({
    title: { type: String, required: true },
    principles: { type: [PrincipleSchema], required: true },
    norms: { type: [NormSchema], required: true },
    consequences: { type: [ConsequenceSchema], required: true },
    version: { type: Number, default: 1 },
    publishedAt: { type: Date },
}, { timestamps: true });

export interface IDigitalPactDocument extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    principles: { title: string; description: string; }[];
    norms: { principle: string; norm: string; }[];
    consequences: { level: number; description: string; restorativeAction: string; }[];
    version: number;
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export function getDigitalPactModel(): Model<IDigitalPactDocument> {
  return mongoose.models.DigitalPact || mongoose.model<IDigitalPactDocument>('DigitalPact', DigitalPactSchema);
}
