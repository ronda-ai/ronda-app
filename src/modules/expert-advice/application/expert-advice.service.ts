
import { generateExpertAdvice } from "@/ai/flows/generate-expert-advice";
import { AIConfigurationDTO } from "@/modules/ai-configuration/application/dtos/ai-configuration.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IExpertAdviceService } from "../domain/interfaces/expert-advice-service.interface";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

export class ExpertAdviceService implements IExpertAdviceService {
    constructor(private readonly anonymizationService: IAnonymizationService) {}
    
    async getExpertAdvice(input: {
        student: StudentDTO,
        allStudents: StudentDTO[],
        question: string,
        classroomContext: Partial<AIConfigurationDTO>,
        language: string
    }): Promise<{ advice: string }> {
        
        const { student, allStudents, question, classroomContext, language } = input;
        
        const studentsForMapping = allStudents.filter(s => s.id !== student.id);
        studentsForMapping.unshift(student);
        
        // Anonymize all students to create a comprehensive mapping
        const { mapping } = this.anonymizationService.anonymize(studentsForMapping, studentsForMapping);
        
        // Anonymize the main student object separately to pass to the flow
        const { anonymizedData: anonymizedStudent } = this.anonymizationService.anonymize(student, studentsForMapping);
        
        const result = await generateExpertAdvice({
            student: anonymizedStudent,
            question,
            classroomContext,
            language
        });

        const deAnonymizedAdvice = this.anonymizationService.deAnonymizeText(result.advice, mapping);
        
        return { advice: deAnonymizedAdvice };
    }
}
