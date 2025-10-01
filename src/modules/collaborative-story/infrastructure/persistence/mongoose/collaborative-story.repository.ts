import { dbConnect } from "@/lib/mongodb";
import { ICollaborativeStoryRepository } from "../../../domain/interfaces/collaborative-story-repository.interface";
import { CreateCollaborativeStoryDTO } from "../../../application/dtos/create-collaborative-story.dto";
import { CollaborativeStory } from "../../../domain/collaborative-story.entity";
import CollaborativeStoryModel, { ICollaborativeStoryDocument } from "./collaborative-story.schema";
import mongoose from "mongoose";

export class MongooseCollaborativeStoryRepository implements ICollaborativeStoryRepository {

    private toDomain(doc: ICollaborativeStoryDocument): CollaborativeStory {
        return new CollaborativeStory(
            doc._id.toString(),
            doc.title,
            doc.characters,
            doc.setting,
            doc.chapters,
            doc.isFinished,
            doc.createdAt,
            doc.updatedAt,
            doc.language,
            doc.chapterLength,
            doc.allowDialogues,
            doc.customPrompt,
            doc.negativePrompt,
            doc.narratorVoice,
            doc.fullStoryAudioUrl
        );
    }
    
    async create(data: CreateCollaborativeStoryDTO): Promise<CollaborativeStory> {
        await dbConnect();
        const newStory = await CollaborativeStoryModel.create(data);
        return this.toDomain(newStory);
    }

    async findAll(): Promise<CollaborativeStory[]> {
        await dbConnect();
        const stories = await CollaborativeStoryModel.find().sort({ createdAt: -1 }).limit(10).exec();
        return stories.map(this.toDomain);
    }

    async findById(id: string): Promise<CollaborativeStory | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await CollaborativeStoryModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }

    async update(id: string, data: Partial<Omit<CollaborativeStory, 'id' | 'createdAt' | 'updatedAt'>>): Promise<CollaborativeStory | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        
        // When updating nested arrays like 'chapters', it's safer to fetch, modify, and save.
        const storyDoc = await CollaborativeStoryModel.findById(id);
        if (!storyDoc) return null;

        Object.assign(storyDoc, data);

        const updatedDoc = await storyDoc.save();
        return this.toDomain(updatedDoc);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await CollaborativeStoryModel.findByIdAndDelete(id).exec();
    }
}
