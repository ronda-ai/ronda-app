
import mongoose, { Schema, Document, Model } from 'mongoose';
import { MaterialType } from '../../../application/dtos/language-support.dto';

const materialTypes: MaterialType[] = ['story', 'worksheet', 'vocabulary-list', 'dialogue-script'];

const LanguageSupportSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    nativeLanguage: { type: String, required: true },
    focusAreas: { type: [String], required: true },
    teacherGuide: { type: String, required: true },
    studentMaterial: { type: String, required: true },
    studentMaterialTranslation: { type: String, required: true },
    materialType: { type: String, enum: materialTypes, default: 'story' },
    feedback: { type: String },
    audioUrl: { type: String },
}, { timestamps: true });

export interface ILanguageSupportDocument extends Document {
    _id: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    nativeLanguage: string;
    focusAreas: string[];
    teacherGuide: string;
    studentMaterial: string;
    studentMaterialTranslation: string;
    materialType?: MaterialType;
    feedback?: string;
    audioUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const LanguageSupportModel: Model<ILanguageSupportDocument> = mongoose.models.LanguageSupport || mongoose.model<ILanguageSupportDocument>('LanguageSupport', LanguageSupportSchema);

export default LanguageSupportModel;
