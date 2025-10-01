import { StoryChapter } from '../../domain/collaborative-story.entity';

export interface CollaborativeStoryDTO {
    id: string;
    title: string;
    characters: string[];
    setting: string;
    chapters: StoryChapter[];
    isFinished: boolean;
    allowDialogues?: boolean;
    customPrompt?: string;
    negativePrompt?: string;
    narratorVoice?: string;
    fullStoryAudioUrl?: string;
    createdAt: string;
}
