

import { generatePersonalizedActivity } from "@/ai/flows/generate-personalized-activity";
import { IPersonalizedActivityRepository } from "../domain/interfaces/personalized-activity-repository.interface";
import { IPersonalizedActivityService } from "../domain/interfaces/personalized-activity-service.interface";
import { CreatePersonalizedActivityDTO } from "./dtos/create-personalized-activity.dto";
import { PersonalizedActivityDTO, PersonalizedActivityStepDTO } from "./dtos/personalized-activity.dto";
import { PersonalizedActivityMapper } from "./mappers/personalized-activity.mapper";
import { PersonalizedActivity } from '../domain/personalized-activity.entity';
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

export class PersonalizedActivityService implements IPersonalizedActivityService {
    constructor(
        private readonly repository: IPersonalizedActivityRepository,
        private readonly anonymizationService: IAnonymizationService
        ) {}

    async createPersonalizedActivity(dto: CreatePersonalizedActivityDTO): Promise<PersonalizedActivityDTO> {
        const newActivity = await this.repository.create(dto);
        return PersonalizedActivityMapper.toDTO(newActivity);
    }

    async generateAndCreatePersonalizedActivity(input: any): Promise<PersonalizedActivityDTO> {
        
        const { student, ...restOfInput } = input;
        
        const { anonymizedData: anonymizedStudent, mapping } = this.anonymizationService.anonymize(student, [student]);

        const anonymizedInput = {
            ...restOfInput,
            student: anonymizedStudent
        };

        const generated = await generatePersonalizedActivity(anonymizedInput);

        const deAnonymizedActivities = generated.activities.map(activity => ({
            ...activity,
            description: this.anonymizationService.deAnonymizeText(activity.description, mapping),
            status: 'pending' as const
        }));
        
        const createdActivity = await this.createPersonalizedActivity({
            studentId: input.student.id,
            topic: input.topic,
            skills: input.skills,
            themes: input.classInterests || [],
            activities: deAnonymizedActivities
        });
        
        return createdActivity;
    }

    async getPersonalizedActivitiesForStudent(studentId: string): Promise<PersonalizedActivityDTO[]> {
        const activities = await this.repository.findByStudentId(studentId);
        return activities.map(PersonalizedActivityMapper.toDTO);
    }
    
    async getAllPersonalizedActivities(): Promise<PersonalizedActivityDTO[]> {
        const activities = await this.repository.findAll();
        return activities.map(PersonalizedActivityMapper.toDTO);
    }

    async getActivityById(activityId: string): Promise<PersonalizedActivityDTO | null> {
        const activity = await this.repository.findById(activityId);
        if (!activity) return null;
        return PersonalizedActivityMapper.toDTO(activity);
    }
    
    async updateActivityPlan(activityId: string, data: Partial<Omit<PersonalizedActivity, 'id' | 'studentId' | 'createdAt' | 'updatedAt'>>): Promise<PersonalizedActivityDTO | null> {
        const updatedActivity = await this.repository.update(activityId, data);
        if (!updatedActivity) return null;
        return PersonalizedActivityMapper.toDTO(updatedActivity);
    }

    async addFeedback(activityId: string, feedback: string): Promise<PersonalizedActivityDTO | null> {
        const updatedActivity = await this.repository.update(activityId, { feedback });
        return updatedActivity ? PersonalizedActivityMapper.toDTO(updatedActivity) : null;
    }

    async updateStepDetails(activityId: string, stepIndex: number, details: Partial<PersonalizedActivityStepDTO>): Promise<PersonalizedActivityDTO | null> {
        const activity = await this.repository.findById(activityId);
        if (!activity) return null;

        if (stepIndex < 0 || stepIndex >= activity.activities.length) {
            throw new Error("Activity index out of bounds");
        }

        const updatedSteps = [...activity.activities];
        updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], ...details };

        const updatedActivity = await this.repository.update(activityId, { activities: updatedSteps });
        return updatedActivity ? PersonalizedActivityMapper.toDTO(updatedActivity) : null;
    }

    async deletePersonalizedActivity(activityId: string): Promise<void> {
        await this.repository.delete(activityId);
    }
}
