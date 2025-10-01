
import { CollaborativeStory } from "../../domain/collaborative-story.entity";
import { CollaborativeStoryDTO } from "../dtos/collaborative-story.dto";

export class CollaborativeStoryMapper {
    public static toDTO(story: CollaborativeStory): CollaborativeStoryDTO {
        return {
            id: story.id,
            title: story.title,
            characters: story.characters,
            setting: story.setting,
            chapters: story.chapters.map(c => ({
                number: c.number,
                title: c.title,
                text: c.text,
                illustration: c.illustration,
                audioUrl: c.audioUrl,
            })),
            isFinished: story.isFinished,
            allowDialogues: story.allowDialogues,
            customPrompt: story.customPrompt,
            negativePrompt: story.negativePrompt,
            narratorVoice: story.narratorVoice,
            fullStoryAudioUrl: story.fullStoryAudioUrl,
            createdAt: story.createdAt.toISOString(),
        };
    }
}
