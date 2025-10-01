
import { PblProject } from "../../domain/pbl.entity";
import { PblProjectDTO } from "../dtos/pbl.dto";

export class PblProjectMapper {
    public static toDTO(project: PblProject): PblProjectDTO {
        return {
            id: project.id,
            topic: project.topic,
            skills: project.skills,
            duration: project.duration,
            essentialQuestion: project.essentialQuestion,
            phases: project.phases,
            milestones: project.milestones,
            finalProductSuggestion: project.finalProductSuggestion,
            ageOrGrade: project.ageOrGrade, // Added field
            createdAt: project.createdAt.toISOString(),
            updatedAt: project.updatedAt.toISOString(),
        };
    }
}
