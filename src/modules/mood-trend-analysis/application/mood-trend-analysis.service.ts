

import { generateMoodAnalysis } from "@/ai/flows/generate-mood-analysis";
import { ChallengeHistoryDTO } from "@/modules/challenge/application/dtos/challenge-history.dto";
import { IChallengeService } from "@/modules/challenge/domain/interfaces/challenge-service.interface";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IMoodTrendAnalysisRepository } from "../domain/interfaces/mood-trend-analysis-repository.interface";
import { IMoodTrendAnalysisService } from "../domain/interfaces/mood-trend-analysis-service.interface";
import { CreateMoodTrendAnalysisDTO } from "./dtos/create-mood-trend-analysis.dto";
import { MoodTrendAnalysisDTO } from "./dtos/mood-trend-analysis.dto";
import { MoodTrendAnalysisMapper } from "./mappers/mood-trend-analysis.mapper";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

export class MoodTrendAnalysisService implements IMoodTrendAnalysisService {
    constructor(
        private readonly moodTrendAnalysisRepository: IMoodTrendAnalysisRepository,
        private readonly studentService: IStudentService,
        private readonly challengeService: IChallengeService,
        private readonly anonymizationService: IAnonymizationService,
        ) {}

    async createMoodTrendAnalysis(dto: CreateMoodTrendAnalysisDTO): Promise<MoodTrendAnalysisDTO> {
        const newAnalysis = await this.moodTrendAnalysisRepository.create(dto);
        return MoodTrendAnalysisMapper.toDTO(newAnalysis);
    }

    async getStudentAnalyses(studentId: string): Promise<MoodTrendAnalysisDTO[]> {
        const analyses = await this.moodTrendAnalysisRepository.findByStudentId(studentId);
        return analyses.map(MoodTrendAnalysisMapper.toDTO);
    }

    async getClassroomAnalyses(): Promise<MoodTrendAnalysisDTO[]> {
        const analyses = await this.moodTrendAnalysisRepository.findClassroomLevel();
        return analyses.map(MoodTrendAnalysisMapper.toDTO);
    }
    
    async deleteMoodTrendAnalysis(id: string): Promise<void> {
        await this.moodTrendAnalysisRepository.delete(id);
    }

    async generateAndCreateStudentAnalysis(student: StudentDTO, language: string): Promise<MoodTrendAnalysisDTO> {
        const transformedHistory = student.challengeHistory.map(c => ({
            challenge: c.challenge.challenge,
            subject: c.aiConfiguration?.subject,
            selectionMode: c.selectionMode,
            challengeLocation: c.aiConfiguration?.challengeLocation,
            mood: c.mood,
            rating: c.rating,
        }));
        
        const { anonymizedData, mapping } = this.anonymizationService.anonymize({ studentName: student.name, challengeHistory: transformedHistory }, [student]);

        const result = await generateMoodAnalysis({
            studentName: anonymizedData.studentName,
            challengeHistory: anonymizedData.challengeHistory,
            language: language,
        });

        const deAnonymizedInsights = result.insights.map(insight => ({
            ...insight,
            title: this.anonymizationService.deAnonymizeText(insight.title, mapping),
            description: this.anonymizationService.deAnonymizeText(insight.description, mapping),
            suggestion: insight.suggestion ? this.anonymizationService.deAnonymizeText(insight.suggestion, mapping) : undefined,
            studentsInvolved: (insight.studentsInvolved || []).map(alias => mapping.get(alias) || alias),
        }));

        return this.createMoodTrendAnalysis({
            studentId: student.id,
            analysis: deAnonymizedInsights,
            isClassroomLevel: false,
        });
    }

    async generateAndCreateClassroomAnalysis(language: string): Promise<MoodTrendAnalysisDTO> {
        const allChallenges = await this.challengeService.getAllChallenges();
        const allStudents = await this.studentService.getAllStudents();

        const { anonymizedData, mapping } = this.anonymizationService.anonymize(allChallenges, allStudents);

        const challengeHistoryForFlow = anonymizedData.map(c => ({
            challenge: c.challenge.challenge,
            subject: c.aiConfiguration?.subject,
            selectionMode: c.selectionMode,
            challengeLocation: c.aiConfiguration?.challengeLocation,
            mood: c.mood,
            rating: c.rating,
            studentName: c.studentId ? mapping.get(c.studentId) : 'Unknown Student'
        }));


        const result = await generateMoodAnalysis({
            challengeHistory: challengeHistoryForFlow,
            language: language,
        });
        
        const deAnonymizedInsights = result.insights.map(insight => {
            const finalDescription = this.anonymizationService.deAnonymizeText(insight.description, mapping);
            const finalSuggestion = insight.suggestion ? this.anonymizationService.deAnonymizeText(insight.suggestion, mapping) : undefined;
            const finalTitle = this.anonymizationService.deAnonymizeText(insight.title, mapping);
            const finalStudentsInvolved = (insight.studentsInvolved || []).map(alias => mapping.get(alias) || alias);
            
            return {
                ...insight,
                title: finalTitle,
                description: finalDescription,
                suggestion: finalSuggestion,
                studentsInvolved: finalStudentsInvolved,
            };
        });

        return this.createMoodTrendAnalysis({
            analysis: deAnonymizedInsights,
            isClassroomLevel: true,
        });
    }
}
