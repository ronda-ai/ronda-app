

import mongoose, { Schema, Document, Model } from 'mongoose';
import { RubricSuggestion } from '@/modules/rubric-suggestion/domain/rubric-suggestion.entity';
import { TestStatus } from '../../../domain/test.entity';

const testStatuses: TestStatus[] = ['draft', 'live', 'closed'];

const MultipleChoiceOptionSchema = new Schema({
    text: { type: String, required: true },
}, { _id: false });

const QuestionSchema = new Schema({
    id: { type: String, required: true },
    text: { type: String, required: true },
    options: { type: [MultipleChoiceOptionSchema], required: false },
    answer: { type: Schema.Types.Mixed, required: false }, // Can be string, number, or boolean
}, { _id: false });

const TestBlockSchema = new Schema({
    id: { type: String, required: true },
    type: { type: String, enum: ['multiple-choice', 'true-false', 'open-ended'], required: true },
    title: { type: String, required: true },
    questions: { type: [QuestionSchema], required: true },
}, { _id: false });

const TestSchema = new Schema({
    storyId: { type: String, required: true }, // Can be ObjectId or a topic string
    storyTitle: { type: String, required: true },
    title: { type: String, required: true },
    blocks: { type: [TestBlockSchema], required: true },
    rubricId: { type: Schema.Types.ObjectId, ref: 'RubricSuggestion', required: true },
    status: { type: String, enum: testStatuses, default: 'draft' },
    liveId: { type: String, unique: true, sparse: true },
    activeStudentIds: { type: [String], default: [] },
}, { timestamps: true });

export interface ITestDocument extends Document {
    _id: mongoose.Types.ObjectId;
    storyId: string;
    storyTitle: string;
    title: string;
    blocks: {
        id: string;
        type: 'multiple-choice' | 'true-false' | 'open-ended';
        title: string;
        questions: {
            id: string;
            text: string;
            options?: { text: string }[];
            answer?: string | number | boolean;
        }[];
    }[];
    rubricId: mongoose.Types.ObjectId | RubricSuggestion;
    status: TestStatus;
    liveId?: string;
    activeStudentIds?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const TestModel: Model<ITestDocument> = mongoose.models.Test || mongoose.model<ITestDocument>('Test', TestSchema);

export default TestModel;
