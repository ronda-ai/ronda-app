import { CreateCollaborativeStoryDTO } from "../../application/dtos/create-collaborative-story.dto";
import { CollaborativeStory } from "../collaborative-story.entity";

export interface ICollaborativeStoryRepository {
    create(data: CreateCollaborativeStoryDTO): Promise<CollaborativeStory>;
    findAll(): Promise<CollaborativeStory[]>;
    findById(id: string): Promise<CollaborativeStory | null>;
    update(id: string, data: Partial<Omit<CollaborativeStory, 'id' | 'createdAt' | 'updatedAt'>>): Promise<CollaborativeStory | null>;
    delete(id: string): Promise<void>;
}

    