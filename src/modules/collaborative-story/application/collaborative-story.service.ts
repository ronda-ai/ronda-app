import { generateStoryChapter} from "@/ai/flows/generate-story-chapter";
import { generateFinalChapter } from "@/ai/flows/generate-final-chapter";
import { ICollaborativeStoryRepository } from "../domain/interfaces/collaborative-story-repository.interface";
import { ICollaborativeStoryService } from "../domain/interfaces/collaborative-story-service.interface";
import { CreateCollaborativeStoryDTO } from "./dtos/create-collaborative-story.dto";
import { CollaborativeStoryDTO } from "./dtos/collaborative-story.dto";
import { CollaborativeStoryMapper } from "./mappers/collaborative-story.mapper";
import { generateStoryStarters } from "@/ai/flows/generate-story-starters";
import { generateStoryContributionSuggestion } from "@/ai/flows/generate-story-contribution-suggestion";
import { StoryChapter } from "../domain/collaborative-story.entity";
import { generateStoryIllustration } from "@/ai/flows/generate-story-illustration";
import { eventBus, SystemEvent } from "@/lib/event-bus/event-bus";
import { hasDialogue } from "@/lib/utils";
import { IStorageService } from "@/modules/storage/domain/interfaces/storage-service.interface";
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";

const getStorageService = () => container.resolve<IStorageService>(SERVICE_KEYS.StorageService);

export class CollaborativeStoryService implements ICollaborativeStoryService {
    constructor(private readonly repository: ICollaborativeStoryRepository) {}

    async createStory(dto: CreateCollaborativeStoryDTO): Promise<CollaborativeStoryDTO> {
        const newStory = await this.repository.create(dto);
        return CollaborativeStoryMapper.toDTO(newStory);
    }
    
    async getAllStories(): Promise<CollaborativeStoryDTO[]> {
        const stories = await this.repository.findAll();
        return stories.map(CollaborativeStoryMapper.toDTO);
    }

    async addChapter(id: string, chapter: StoryChapter): Promise<CollaborativeStoryDTO | null> {
        const story = await this.repository.findById(id);
        if (!story) return null;
        
        story.chapters.push(chapter);
        
        const updatedStory = await this.repository.update(id, { chapters: story.chapters });
        if (!updatedStory) return null;
        
        eventBus.publish(SystemEvent.CHAPTER_CREATED, { 
            storyId: updatedStory.id, 
            chapterIndex: updatedStory.chapters.length - 1, 
            text: chapter.text,
            allowDialogues: updatedStory.allowDialogues || false,
            narratorVoice: updatedStory.narratorVoice,
        });

        return CollaborativeStoryMapper.toDTO(updatedStory);
    }
    
    async updateChapter(storyId: string, chapterIndex: number, chapterData: Partial<StoryChapter>): Promise<CollaborativeStoryDTO | null> {
        const story = await this.repository.findById(storyId);
        if (!story || !story.chapters[chapterIndex]) return null;

        // Use a functional update to avoid direct mutation issues
        const updatedChapters = story.chapters.map((chapter, index) => {
            if (index === chapterIndex) {
                return { ...chapter, ...chapterData };
            }
            return chapter;
        });

        const updatedStory = await this.repository.update(storyId, { chapters: updatedChapters });
        if (!updatedStory) return null;

        return CollaborativeStoryMapper.toDTO(updatedStory);
    }

    async finishStory(id: string): Promise<CollaborativeStoryDTO | null> {
        const story = await this.repository.findById(id);
        if (!story) return null;
        
        const result = await generateFinalChapter({
            characters: story.characters,
            setting: story.setting,
            language: story.language || 'en',
            previousChapters: story.chapters.map(c => c.text),
            chapterLength: story.chapterLength || 'short',
            allowDialogues: story.allowDialogues || false,
            customPrompt: story.customPrompt,
            negativePrompt: story.negativePrompt
        });

        const finalChapter: StoryChapter = { 
            number: story.chapters.length + 1,
            title: result.finalChapterTitle,
            text: result.finalChapterContent 
        };

        const updatedChapters = [...story.chapters, finalChapter];
        const updatedStory = await this.repository.update(id, { isFinished: true, chapters: updatedChapters });
        
        if (!updatedStory) return null;
        
        eventBus.publish(SystemEvent.CHAPTER_CREATED, { 
            storyId: updatedStory.id, 
            chapterIndex: updatedStory.chapters.length - 1, 
            text: finalChapter.text,
            allowDialogues: hasDialogue(finalChapter.text),
            narratorVoice: updatedStory.narratorVoice
        });
        
        return CollaborativeStoryMapper.toDTO(updatedStory);
    }

    async deleteStory(id: string): Promise<void> {
        const storageService = getStorageService();
        const storyToDelete = await this.repository.findById(id);

        if (storyToDelete) {
            console.log(`Deleting story ${id}. Found ${storyToDelete.chapters.length} chapters.`);
            for (const chapter of storyToDelete.chapters) {
                if (chapter.audioUrl) {
                    console.log(`Deleting chapter audio file: ${chapter.audioUrl}`);
                    await storageService.deleteByFilename(chapter.audioUrl);
                }
            }
            if (storyToDelete.fullStoryAudioUrl) {
                 console.log(`Deleting full story audio file: ${storyToDelete.fullStoryAudioUrl}`);
                 await storageService.deleteByFilename(storyToDelete.fullStoryAudioUrl);
            }
        }
        await this.repository.delete(id);
    }

    async processChapter(input: any): Promise<CollaborativeStoryDTO> {
        const { storyId, ...storyData } = input;
        
        if (storyId) {
            const story = await this.repository.findById(storyId);
            if(!story) throw new Error("Story not found");

            const result = await generateStoryChapter({
                ...story,
                language: story.language || 'en',
                allowDialogues: story.allowDialogues || false,
                chapterLength: story.chapterLength || 'short',
                previousChapters: story.chapters.map(c => c.text),
                studentContributions: input.studentContributions,
            });
            
            const newChapter: StoryChapter = { 
                number: result.nextChapterNumber,
                title: result.nextChapterTitle,
                text: result.nextChapterContent 
            };
            return this.addChapter(storyId, newChapter).then(res => {
                if(!res) throw new Error("Failed to update story.");
                return res;
            });
        } else {
             const result = await generateStoryChapter(storyData);
            // Create new story
            const newStory = await this.repository.create({
                title: result.title,
                characters: input.characters,
                setting: input.setting,
                chapters: [{ 
                    number: result.nextChapterNumber,
                    title: result.nextChapterTitle,
                    text: result.nextChapterContent 
                }],
                isFinished: false,
                language: input.language,
                allowDialogues: input.allowDialogues,
                chapterLength: input.chapterLength,
                customPrompt: input.customPrompt,
                negativePrompt: input.negativePrompt,
                narratorVoice: input.narratorVoice,
            });
            
            eventBus.publish(SystemEvent.CHAPTER_CREATED, { 
                storyId: newStory.id, 
                chapterIndex: 0, 
                text: result.nextChapterContent,
                allowDialogues: !!input.allowDialogues,
                narratorVoice: newStory.narratorVoice
            });

            return CollaborativeStoryMapper.toDTO(newStory);
        }
    }
    
    async generateStoryStarters(language: string): Promise<{ characters: string; setting: string; }> {
        return await generateStoryStarters({ language });
    }

    async generateContributionSuggestion(input: any): Promise<{ suggestion: string; }> {
        const mappedInput = {
            ...input,
            previousChapters: (input.previousChapters || []).map((c: StoryChapter) => c.text)
        }
        return await generateStoryContributionSuggestion(mappedInput);
    }

    async generateIllustration(prompt: string, language: string): Promise<{ imageUrl: string; }> {
        const result = await generateStoryIllustration({ prompt, language });
        return { imageUrl: result.imageUrl };
    }
    
    async generateFullStoryAudio(storyId: string): Promise<CollaborativeStoryDTO | null> {
        const story = await this.repository.findById(storyId);
        if (!story || !story.isFinished) return null;

        const audioUrls = story.chapters.map(c => c.audioUrl).filter(Boolean) as string[];
        if (audioUrls.length < story.chapters.length) {
            throw new Error("Not all chapters have been narrated yet.");
        }

        const storageService = getStorageService();
        const audioBuffers = await Promise.all(
            audioUrls.map(async (filename) => {
                const stream = await storageService.getStream(filename);
                if (!stream) throw new Error(`Audio file not found: ${filename}`);
                const chunks: Buffer[] = [];
                for await (const chunk of stream) {
                    chunks.push(chunk as Buffer);
                }
                return Buffer.concat(chunks);
            })
        );
        
        const fullAudioBuffer = Buffer.concat(audioBuffers);
        const fullAudioFilename = `${story.id}_full_story.wav`;

        await storageService.save(fullAudioBuffer, fullAudioFilename, { contentType: 'audio/wav', originalStoryId: story.id });

        const updatedStory = await this.repository.update(storyId, { fullStoryAudioUrl: fullAudioFilename });

        return updatedStory ? CollaborativeStoryMapper.toDTO(updatedStory) : null;
    }
}