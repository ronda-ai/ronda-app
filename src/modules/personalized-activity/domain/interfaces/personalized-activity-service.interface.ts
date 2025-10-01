

import { CreatePersonalizedActivityDTO } from "../../application/dtos/create-personalized-activity.dto";
import { PersonalizedActivityDTO, PersonalizedActivityStepDTO } from "../../application/dtos/personalized-activity.dto";
import { PersonalizedActivity } from "../personalized-activity.entity";

export interface IPersonalizedActivityService {
    createPersonalizedActivity(dto: CreatePersonalizedActivityDTO): Promise<PersonalizedActivityDTO>;
    generateAndCreatePersonalizedActivity(input: any): Promise<PersonalizedActivityDTO>;
    getPersonalizedActivitiesForStudent(studentId: string): Promise<PersonalizedActivityDTO[]>;
    getAllPersonalizedActivities(): Promise<PersonalizedActivityDTO[]>;
    getActivityById(activityId: string): Promise<PersonalizedActivityDTO | null>;
    updateActivityPlan(activityId: string, data: Partial<Omit<PersonalizedActivity, 'id' | 'studentId' | 'createdAt' | 'updatedAt'>>): Promise<PersonalizedActivityDTO | null>;
    addFeedback(activityId: string, feedback: string): Promise<PersonalizedActivityDTO | null>;
    updateStepDetails(activityId: string, stepIndex: number, details: Partial<PersonalizedActivityStepDTO>): Promise<PersonalizedActivityDTO | null>;
    deletePersonalizedActivity(activityId: string): Promise<void>;
}
