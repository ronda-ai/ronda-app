
import { generateConcernAnalysis } from "@/ai/flows/generate-concern-analysis";
import { IChallengeService } from "@/modules/challenge/domain/interfaces/challenge-service.interface";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IConcernAnalysisRepository } from "../domain/interfaces/concern-analysis-repository.interface";
import { IConcernAnalysisService } from "../domain/interfaces/concern-analysis-service.interface";
import { ConcernAnalysisDTO } from "./dtos/concern-analysis.dto";
import { CreateConcernAnalysisDTO } from "./dtos/create-concern-analysis.dto";
import { ConcernAnalysisMapper } from "./mappers/concern-analysis.mapper";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

export class ConcernAnalysisService implements IConcernAnalysisService {
    constructor(
        private readonly concernAnalysisRepository: IConcernAnalysisRepository,
        private readonly studentService: IStudentService,
        private readonly challengeService: IChallengeService,
        private readonly anonymizationService: IAnonymizationService,
    ) {}

    async createConcernAnalysis(dto: CreateConcernAnalysisDTO): Promise<ConcernAnalysisDTO> {
        const newAnalysis = await this.concernAnalysisRepository.create(dto);
        return ConcernAnalysisMapper.toDTO(newAnalysis);
    }

    async getConcernAnalysesForStudent(studentId: string): Promise<ConcernAnalysisDTO[]> {
        const analyses = await this.concernAnalysisRepository.findByStudentId(studentId);
        return analyses.map(ConcernAnalysisMapper.toDTO);
    }
    
    async generateAndCreateAnalysis(input: { student: StudentDTO; allStudents: StudentDTO[]; observations: ObservationDTO[]; language: string; }): Promise<ConcernAnalysisDTO> {
        const { student, allStudents, observations, language } = input;
        
        // Transform challengeHistory before anonymization
        const transformedStudent = {
            ...student,
            challengeHistory: (student.challengeHistory || []).map(h => ({
                challenge: h.challenge.challenge,
                tip: h.challenge.tip,
                status: h.status,
                rating: h.rating,
                feedback: h.feedback,
                mood: h.mood,
            }))
        };

        const { anonymizedData: anonymizedStudent, mapping } = this.anonymizationService.anonymize(transformedStudent, allStudents);

        const result = await generateConcernAnalysis({
            student: anonymizedStudent,
            observations: observations,
            language: language
        });

        const finalAnalysis = this.anonymizationService.deAnonymizeText(result.analysis, mapping);

        const createdAnalysis = await this.createConcernAnalysis({
            studentId: input.student.id,
            analysis: finalAnalysis
        });
        
        return createdAnalysis;
    }
}
