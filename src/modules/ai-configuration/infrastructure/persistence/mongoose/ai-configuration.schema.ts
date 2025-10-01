import mongoose, { Schema, Document, Model } from 'mongoose';

const ThemeColorsSchema = new Schema({
    name: { type: String },
    primary: { type: String },
    background: { type: String },
    accent: { type: String },
}, { _id: false });

const AIConfigurationSchema = new Schema({
    className: { type: String, default: 'My Classroom' },
    classInterests: { type: [String], default: [] },
    subject: { type: String, default: 'general' },
    ageOrGrade: { type: String, default: '8 years old' },
    country: { type: String, default: 'USA' },
    challengeLocation: { type: String, default: 'does-not-matter' },
    customPrompt: { type: String },
    negativePrompt: { type: String },
    plugin: { type: String, default: 'googleai' },
    modelName: { type: String, default: 'gemini-1.5-flash-latest' },
    ollamaBaseUrl: { type: String },
    analysisLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    theme: { type: ThemeColorsSchema, default: {} },
}, { timestamps: true });


export interface IAIConfigurationDocument extends Document {
    _id: mongoose.Types.ObjectId;
    className?: string;
    classInterests?: string[];
    subject: string;
    ageOrGrade: string;
    country: string;
    challengeLocation: string;
    customPrompt?: string;
    negativePrompt?: string;
    plugin?: string;
    modelName?: string;
    ollamaBaseUrl?: string;
    analysisLevel?: 'low' | 'medium' | 'high';
    theme?: {
        name?: string;
        primary?: string;
        background?: string;
        accent?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const AIConfigurationModel: Model<IAIConfigurationDocument> = mongoose.models.AIConfiguration || mongoose.model<IAIConfigurationDocument>('AIConfiguration', AIConfigurationSchema);

export default AIConfigurationModel;
