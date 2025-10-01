import { CreateCollaborativeStoryDTO } from "../../application/dtos/create-collaborative-story.dto";
import { CollaborativeStoryDTO } from "../../application/dtos/collaborative-story.dto";
import { StoryChapter } from '../collaborative-story.entity';

export interface ICollaborativeStoryService {
    createStory(dto: CreateCollaborativeStoryDTO): Promise<CollaborativeStoryDTO>;
    getAllStories(): Promise<CollaborativeStoryDTO[]>;
    addChapter(id: string, chapter: StoryChapter): Promise<CollaborativeStoryDTO | null>;
    updateChapter(storyId: string, chapterIndex: number, chapterData: Partial<StoryChapter>): Promise<CollaborativeStoryDTO | null>;
    finishStory(id: string): Promise<CollaborativeStoryDTO | null>;
    deleteStory(id: string): Promise<void>;
    processChapter(input: any): Promise<CollaborativeStoryDTO>;
    generateStoryStarters(language: string): Promise<{ characters: string; setting: string }>;
    generateContributionSuggestion(input: any): Promise<{ suggestion: string }>;
    generateIllustration(prompt: string, language: string): Promise<{ imageUrl: string }>;
    generateFullStoryAudio(storyId: string): Promise<CollaborativeStoryDTO | null>;
}
