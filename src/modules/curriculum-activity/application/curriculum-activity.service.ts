

import { ICurriculumActivityRepository } from "../domain/interfaces/curriculum-activity-repository.interface";
import { ICurriculumActivityService } from "../domain/interfaces/curriculum-activity-service.interface";
import { CreateCurriculumActivityDTO } from "./dtos/create-curriculum-activity.dto";
import { CurriculumActivityDTO } from "./dtos/curriculum-activity.dto";
import { CurriculumActivityMapper } from "./mappers/curriculum-activity.mapper";
import { CurriculumActivity } from '../domain/curriculum-activity.entity';
import { generateCurriculumActivities } from "@/ai/flows/generate-curriculum-activities";
import { IPersonalizedActivityService } from "@/modules/personalized-activity/domain/interfaces/personalized-activity-service.interface";
import { generateActivityTopicSuggestion } from '@/ai/flows/generate-activity-topic-suggestion';
import { ActivityTopicSuggestionDTO } from './dtos/activity-topic-suggestion.dto';


export class CurriculumActivityService implements ICurriculumActivityService {
    constructor(
        private readonly repository: ICurriculumActivityRepository,
    ) {}

    async createCurriculumActivity(dto: CreateCurriculumActivityDTO): Promise<CurriculumActivityDTO> {
        const newActivity = await this.repository.create(dto);
        return CurriculumActivityMapper.toDTO(newActivity);
    }
    
    async generateAndCreateActivities(input: any): Promise<CurriculumActivityDTO> {
        const generated = await generateCurriculumActivities(input);
        
        const createdActivity = await this.createCurriculumActivity({
            ...input,
            activities: generated.activities
        });
        return createdActivity;
    }

    async generateTopicSuggestion(language: string, existingSkills: string[], classContext?: string): Promise<ActivityTopicSuggestionDTO> {
        return generateActivityTopicSuggestion({
            language,
            existingSkills,
            classContext
        });
    }

    async getAllCurriculumActivities(): Promise<CurriculumActivityDTO[]> {
        const activities = await this.repository.findAll();
        return activities.map(CurriculumActivityMapper.toDTO);
    }

    async getActivityById(id: string): Promise<CurriculumActivityDTO | null> {
        const activity = await this.repository.findById(id);
        if (!activity) return null;
        return CurriculumActivityMapper.toDTO(activity);
    }
    
    async updateActivityPlan(id: string, data: Partial<Omit<CurriculumActivity, "id" | "createdAt" | "updatedAt">>): Promise<CurriculumActivityDTO | null> {
        const updatedActivity = await this.repository.update(id, data);
        if (!updatedActivity) return null;
        return CurriculumActivityMapper.toDTO(updatedActivity);
    }

    async addFeedback(id: string, feedback: string): Promise<CurriculumActivityDTO | null> {
        const updatedActivity = await this.repository.update(id, { feedback });
        if (!updatedActivity) return null;
        return CurriculumActivityMapper.toDTO(updatedActivity);
    }

    async deleteActivity(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
