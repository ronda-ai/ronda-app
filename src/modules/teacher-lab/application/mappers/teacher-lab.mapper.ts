
import { ClassroomPulse, PedagogicalMenu, Reflection } from "../../domain/teacher-lab.entity";
import { ClassroomPulseDTO } from "../dtos/classroom-pulse.dto";
import { PedagogicalMenuDTO } from "../dtos/pedagogical-menu.dto";
import { QuestionAnalysis, QuestionAnalysisOutput } from "../dtos/question-analysis.dto";


export class TeacherLabMapper {
    public static toClassroomPulseDTO(pulse: ClassroomPulse): ClassroomPulseDTO {
        return {
            strengths: pulse.strengths,
            challenges: pulse.challenges,
        };
    }

    public static toPedagogicalMenuDTO(menu: PedagogicalMenu): PedagogicalMenuDTO {
        return {
            approaches: menu.approaches,
        };
    }
    
    public static toQuestionAnalysisDTO(analysis: QuestionAnalysisOutput): QuestionAnalysisOutput {
        return {
            analyses: analysis.analyses,
            summary: analysis.summary,
        };
    }

    public static toReflectionDTO(reflection: Reflection): { role: 'user' | 'model'; text: string; }[] {
        return reflection.history;
    }
}
