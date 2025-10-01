import { ICollaborativeStoryRepository } from "../../../domain/interfaces/collaborative-story-repository.interface";
import { CreateCollaborativeStoryDTO } from "../../../application/dtos/create-collaborative-story.dto";
import { CollaborativeStory } from "../../../domain/collaborative-story.entity";

export class SupabaseCollaborativeStoryRepository implements ICollaborativeStoryRepository {
    async create(data: CreateCollaborativeStoryDTO): Promise<CollaborativeStory> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<CollaborativeStory[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<CollaborativeStory | null> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, data: Partial<Omit<CollaborativeStory, "id" | "createdAt" | "updatedAt">>): Promise<CollaborativeStory | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
