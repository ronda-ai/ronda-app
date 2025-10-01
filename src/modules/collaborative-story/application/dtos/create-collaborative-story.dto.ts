
import { CollaborativeStory } from "../../domain/collaborative-story.entity";

export type CreateCollaborativeStoryDTO = Omit<CollaborativeStory, 'id' | 'createdAt' | 'updatedAt'>;
