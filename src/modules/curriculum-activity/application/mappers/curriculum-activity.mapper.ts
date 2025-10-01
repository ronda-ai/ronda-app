

import { CurriculumActivity } from "../../domain/curriculum-activity.entity";
import { CurriculumActivityDTO } from "../dtos/curriculum-activity.dto";

export class CurriculumActivityMapper {
    public static toDTO(activity: CurriculumActivity): CurriculumActivityDTO {
        return {
            id: activity.id,
            topic: activity.topic,
            skills: activity.skills,
            language: activity.language,
            ageOrGrade: activity.ageOrGrade,
            country: activity.country,
            subject: activity.subject,
            activities: activity.activities,
            feedback: activity.feedback,
            complexity: activity.complexity,
            duration: activity.duration,
            learningModality: activity.learningModality,
            socialDynamic: activity.socialDynamic,
            bloomLevel: activity.bloomLevel,
            resourceConstraints: activity.resourceConstraints,
            createdAt: activity.createdAt.toISOString(),
            updatedAt: activity.updatedAt.toISOString(),
        };
    }
}