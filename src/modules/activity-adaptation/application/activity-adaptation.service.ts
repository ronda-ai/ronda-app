
import { generateActivityAdaptation } from "@/ai/flows/generate-activity-adaptation";
import { IActivityAdaptationRepository } from "../domain/interfaces/activity-adaptation-repository.interface";
import { IActivityAdaptationService } from "../domain/interfaces/activity-adaptation-service.interface";
import { ActivityAdaptationDTO } from "./dtos/activity-adaptation.dto";
import { CreateActivityAdaptationDTO } from "./dtos/create-activity-adaptation.dto";
import { ActivityAdaptationMapper } from "./mappers/activity-adaptation.mapper";

export class ActivityAdaptationService implements IActivityAdaptationService {
    constructor(private readonly repository: IActivityAdaptationRepository) {}

    async createAdaptation(dto: CreateActivityAdaptationDTO, language: string): Promise<ActivityAdaptationDTO> {

        const result = await generateActivityAdaptation({
            originalActivity: dto.originalActivity,
            language: language,
            ageOrGrade: dto.ageOrGrade,
            country: dto.country,
            subject: dto.subject,
            classInterests: dto.classInterests,
            studentNeeds: dto.studentNeeds,
            customPrompt: dto.customPrompt,
        });

        const newAdaptation = await this.repository.create({
            originalActivity: dto.originalActivity,
            suggestions: result.suggestions
        });

        return ActivityAdaptationMapper.toDTO(newAdaptation);
    }
    
    async getAllAdaptations(): Promise<ActivityAdaptationDTO[]> {
        const adaptations = await this.repository.findAll();
        return adaptations.map(ActivityAdaptationMapper.toDTO);
    }

    async deleteAdaptation(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
