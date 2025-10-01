

import { PersonalizedActivity } from "../../domain/personalized-activity.entity";
import { PersonalizedActivityDTO } from "../dtos/personalized-activity.dto";

export class PersonalizedActivityMapper {
    public static toDTO(activity: PersonalizedActivity): PersonalizedActivityDTO {
        return {
            id: activity.id,
            studentId: activity.studentId.toString(),
            topic: activity.topic,
            skills: activity.skills,
            themes: activity.themes,
            activities: activity.activities.map(a => ({
                title: a.title,
                description: a.description,
                modality: a.modality,
                status: a.status,
                feedback: a.feedback
            })),
            feedback: activity.feedback,
            createdAt: activity.createdAt.toISOString(),
            updatedAt: activity.updatedAt.toISOString(),
        };
    }
}
