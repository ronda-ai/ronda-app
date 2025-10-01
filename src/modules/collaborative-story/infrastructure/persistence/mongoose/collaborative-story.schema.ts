import mongoose, { Schema, Document, Model } from 'mongoose';
import { StoryChapter } from '../../../domain/collaborative-story.entity';

const ChapterSchema = new Schema({
    number: { type: Number, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    illustration: { type: String },
    audioUrl: { type: String },
}, { _id: false });

const CollaborativeStorySchema = new Schema({
    title: { type: String, required: true },
    characters: { type: [String], required: true },
    setting: { type: String, required: true },
    chapters: { type: [ChapterSchema], required: true },
    isFinished: { type: Boolean, default: false },
    language: { type: String, default: 'en' },
    chapterLength: { type: String, enum: ['short', 'medium', 'long'], default: 'short' },
    allowDialogues: { type: Boolean, default: false },
    customPrompt: { type: String },
    negativePrompt: { type: String },
    narratorVoice: { type: String, default: 'Algenib' },
    fullStoryAudioUrl: { type: String },
}, { timestamps: true });

export interface ICollaborativeStoryDocument extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    characters: string[];
    setting: string;
    chapters: StoryChapter[];
    isFinished: boolean;
    language?: string;
    chapterLength?: 'short' | 'medium' | 'long';
    allowDialogues?: boolean;
    customPrompt?: string;
    negativePrompt?: string;
    narratorVoice?: string;
    fullStoryAudioUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const CollaborativeStoryModel: Model<ICollaborativeStoryDocument> = mongoose.models.CollaborativeStory || mongoose.model<ICollaborativeStoryDocument>('CollaborativeStory', CollaborativeStorySchema);

export default CollaborativeStoryModel;
