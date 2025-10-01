
import mongoose, { Schema, Document, Model } from 'mongoose';

const SkillSchema = new Schema({
    name: { type: String, required: true, unique: true },
}, { timestamps: true });

export interface ISkillDocument extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
}

const SkillModel: Model<ISkillDocument> = mongoose.models.Skill || mongoose.model<ISkillDocument>('Skill', SkillSchema);

export default SkillModel;
