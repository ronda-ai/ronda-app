import { container } from "@/lib/dependency-container";
import { SystemEvent, ChapterCreatedPayload } from "@/lib/event-bus/event-bus";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ICollaborativeStoryService } from "../domain/interfaces/collaborative-story-service.interface";
import { generateSpeechFromText } from "@/ai/flows/generate-speech-from-text";
import { generateMultiSpeakerSpeech } from "@/ai/flows/generate-multi-speaker-speech";
import { IStorageService } from "@/modules/storage/domain/interfaces/storage-service.interface";
import { Readable } from "stream";

export class CollaborativeStoryEventHandler {
    private storyService: ICollaborativeStoryService;
    private storageService: IStorageService;

    constructor() {
        // Resolve dependencies lazily to avoid circular dependency issues at startup.
        this.storyService = container.resolve<ICollaborativeStoryService>(SERVICE_KEYS.CollaborativeStoryService);
        this.storageService = container.resolve<IStorageService>(SERVICE_KEYS.StorageService);
        this.registerListeners();
    }

    private registerListeners(): void {
        const eventBus = require('@/lib/event-bus/event-bus').eventBus;
        eventBus.register(SystemEvent.CHAPTER_CREATED, this.handleChapterCreated.bind(this));
    }

    private async handleChapterCreated(event: SystemEvent, payload: ChapterCreatedPayload): Promise<void> {
        try {
            console.log(`[CollaborativeStoryEventHandler] Handling ${event} for story ${payload.storyId}, chapter ${payload.chapterIndex}`);
            
            const pcmBuffer = await this.generateAudioData(payload);
            if (!pcmBuffer) {
                console.warn(`[CollaborativeStoryEventHandler] Audio generation returned no data.`);
                return;
            }
            
            const wavBuffer = await this.convertToWav(pcmBuffer);
            const filename = `${payload.storyId}_${payload.chapterIndex}.wav`;
            
            await this.storageService.save(wavBuffer, filename, { contentType: 'audio/wav' });
            
            await this.storyService.updateChapter(payload.storyId, payload.chapterIndex, { audioUrl: filename });

            console.log(`[CollaborativeStoryEventHandler] Successfully generated and saved audio for chapter.`);

        } catch (error) {
            console.error(`[CollaborativeStoryEventHandler] Failed to handle ${event}:`, error);
        }
    }

    private async generateAudioData(payload: ChapterCreatedPayload): Promise<Buffer | null> {
        let audioResult;
        if (payload.allowDialogues) {
             audioResult = await generateMultiSpeakerSpeech({ text: payload.text, narratorVoice: payload.narratorVoice });
        } else {
             audioResult = await generateSpeechFromText({ text: payload.text, narratorVoice: payload.narratorVoice });
        }

        if (audioResult && audioResult.audioUrl) {
            return Buffer.from(audioResult.audioUrl, 'base64');
        }
        return null;
    }

    private async convertToWav(pcmData: Buffer): Promise<Buffer> {
        const wav = require('wav');
        return new Promise((resolve, reject) => {
            const writer = new wav.Writer({
                channels: 1,
                sampleRate: 24000,
                bitDepth: 16,
            });

            const buffers: Buffer[] = [];
            const readable = new Readable();
            readable._read = () => {}; // _read is required
            readable.push(pcmData);
            readable.push(null);

            readable
                .pipe(writer)
                .on('data', (chunk:any) => buffers.push(chunk))
                .on('end', () => resolve(Buffer.concat(buffers)))
                .on('error', reject);
        });
    }
}
