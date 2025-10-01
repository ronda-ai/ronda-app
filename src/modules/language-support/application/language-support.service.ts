

import { ILanguageSupportRepository } from "../domain/interfaces/language-support-repository.interface";
import { ILanguageSupportService } from "../domain/interfaces/language-support-service.interface";
import { CreateLanguageSupportDTO } from "./dtos/create-language-support.dto";
import { LanguageSupportDTO } from "./dtos/language-support.dto";
import { LanguageSupportMapper } from "./mappers/language-support.mapper";
import { generateLanguageSupport } from '@/ai/flows/generate-language-support';
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { eventBus, SystemEvent } from "@/lib/event-bus/event-bus";
import { IStorageService } from "@/modules/storage/domain/interfaces/storage-service.interface";


export class LanguageSupportService implements ILanguageSupportService {
    constructor(
        private readonly repository: ILanguageSupportRepository,
        private readonly storageService: IStorageService,
    ) {}

    async createSupport(dto: CreateLanguageSupportDTO): Promise<LanguageSupportDTO> {
        const newSupport = await this.repository.create(dto);
        
        eventBus.publish(SystemEvent.LANGUAGE_SUPPORT_MATERIAL_CREATED, {
            supportId: newSupport.id,
            text: newSupport.studentMaterial,
            language: newSupport.nativeLanguage,
        });

        return LanguageSupportMapper.toDTO(newSupport);
    }

    async getSupportsForStudent(studentId: string): Promise<LanguageSupportDTO[]> {
        const supports = await this.repository.findByStudentId(studentId);
        return supports.map(LanguageSupportMapper.toDTO);
    }

    async addFeedback(supportId: string, feedback: string): Promise<LanguageSupportDTO | null> {
        const updatedSupport = await this.repository.update(supportId, { feedback });
        return updatedSupport ? LanguageSupportMapper.toDTO(updatedSupport) : null;
    }
    
    async deleteSupport(supportId: string): Promise<void> {
        const supportToDelete = await this.repository.findById(supportId);
        if (supportToDelete && supportToDelete.audioUrl) {
            await this.storageService.deleteByFilename(supportToDelete.audioUrl);
        }
        await this.repository.delete(supportId);
    }

    async generateAndCreateSupport(input: { student: StudentDTO, nativeLanguage: string, focusAreas: string[], instructionLanguage: string }): Promise<LanguageSupportDTO> {
        const result = await generateLanguageSupport({
            student: input.student,
            nativeLanguage: input.nativeLanguage,
            focusAreas: input.focusAreas,
            instructionLanguage: input.instructionLanguage,
        });
        
        const createdSupport = await this.createSupport({
            studentId: input.student.id,
            nativeLanguage: input.nativeLanguage,
            focusAreas: input.focusAreas,
            teacherGuide: result.teacherGuide,
            studentMaterial: result.studentMaterial,
            studentMaterialTranslation: result.studentMaterialTranslation,
            materialType: result.materialType,
        });

        return createdSupport;
    }
    
    async addAudioUrl(supportId: string, audioUrl: string): Promise<LanguageSupportDTO | null> {
        const updatedSupport = await this.repository.update(supportId, { audioUrl });
        return updatedSupport ? LanguageSupportMapper.toDTO(updatedSupport) : null;
    }
}
