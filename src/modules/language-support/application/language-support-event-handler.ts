import { container } from "@/lib/dependency-container";
import { SystemEvent, SystemEventPayloads } from "@/lib/event-bus/event-bus";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ILanguageSupportService } from "../domain/interfaces/language-support-service.interface";
import { IStorageService } from "@/modules/storage/domain/interfaces/storage-service.interface";
import { generateSpeechFromText } from "@/ai/flows/generate-speech-from-text";
import { Readable } from "stream";

export class LanguageSupportEventHandler {
    private languageSupportService: ILanguageSupportService;
    private storageService: IStorageService;

    constructor() {
        this.languageSupportService = container.resolve<ILanguageSupportService>(SERVICE_KEYS.LanguageSupportService);
        this.storageService = container.resolve<IStorageService>(SERVICE_KEYS.StorageService);
        this.registerListeners();
    }

    private registerListeners(): void {
        const eventBus = require('@/lib/event-bus/event-bus').eventBus;
        eventBus.register(SystemEvent.LANGUAGE_SUPPORT_MATERIAL_CREATED, this.handleMaterialCreated.bind(this));
    }
    
    private async handleMaterialCreated(event: SystemEvent, payload: SystemEventPayloads[SystemEvent.LANGUAGE_SUPPORT_MATERIAL_CREATED]): Promise<void> {
        try {
            console.log(`[LanguageSupportEventHandler] Handling ${event} for support ID ${payload.supportId}`);
            
            const audioResult = await generateSpeechFromText({ text: payload.text });
            if (!audioResult || !audioResult.audioUrl) {
                console.warn(`[LanguageSupportEventHandler] Audio generation returned no data for support ID ${payload.supportId}.`);
                return;
            }
            
            const pcmBuffer = Buffer.from(audioResult.audioUrl, 'base64');
            const wavBuffer = await this.convertToWav(pcmBuffer);
            const filename = `${payload.supportId}_narration.wav`;
            
            await this.storageService.save(wavBuffer, filename, { 
                contentType: 'audio/wav',
                language: payload.language,
                supportId: payload.supportId,
            });
            
            await this.languageSupportService.addAudioUrl(payload.supportId, filename);

            console.log(`[LanguageSupportEventHandler] Successfully generated and saved audio for support ID ${payload.supportId}.`);

        } catch (error) {
            console.error(`[LanguageSupportEventHandler] Failed to handle ${event} for support ID ${payload.supportId}:`, error);
        }
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
            readable._read = () => {}; 
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
