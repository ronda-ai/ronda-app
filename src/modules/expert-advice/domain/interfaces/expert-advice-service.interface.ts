
import { AIConfigurationDTO } from "@/modules/ai-configuration/application/dtos/ai-configuration.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";

export interface IExpertAdviceService {
    getExpertAdvice(input: {
        student: StudentDTO,
        allStudents: StudentDTO[],
        question: string,
        classroomContext: Partial<AIConfigurationDTO>,
        language: string
    }): Promise<{ advice: string }>;
}
