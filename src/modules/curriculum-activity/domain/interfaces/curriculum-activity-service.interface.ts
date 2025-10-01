

import { CreateCurriculumActivityDTO } from "../../application/dtos/create-curriculum-activity.dto";
import { CurriculumActivityDTO } from "../../application/dtos/curriculum-activity.dto";
import { CurriculumActivity } from "../curriculum-activity.entity";
import { ActivityTopicSuggestionDTO } from '../../application/dtos/activity-topic-suggestion.dto';

export interface ICurriculumActivityService {
    createCurriculumActivity(dto: CreateCurriculumActivityDTO): Promise<CurriculumActivityDTO>;
    generateAndCreateActivities(input: any): Promise<CurriculumActivityDTO>;
    getAllCurriculumActivities(): Promise<CurriculumActivityDTO[]>;
    getActivityById(id: string): Promise<CurriculumActivityDTO | null>;
    updateActivityPlan(id: string, data: Partial<Omit<CurriculumActivity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<CurriculumActivityDTO | null>;
    addFeedback(id: string, feedback: string): Promise<CurriculumActivityDTO | null>;
    deleteActivity(id: string): Promise<void>;
    generateTopicSuggestion(language: string, existingSkills: string[], classContext?: string): Promise<ActivityTopicSuggestionDTO>;
}
