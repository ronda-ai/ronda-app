

import { IStudentRepository } from "../domain/interfaces/student-repository.interface";
import { Student } from "../domain/student.entity";
import { StudentMapper } from "./mappers/student.mapper";
import { StudentDTO } from "./dtos/student.dto";
import { CreateStudentDTO } from "./dtos/create-student.dto";
import { UpdateStudentDTO } from "./dtos/update-student.dto";
import { IStudentService } from "../domain/interfaces/student-service.interface";
import { IParticipationService } from "@/modules/participation/domain/interfaces/participation-service.interface";
import { IChallengeService } from "@/modules/challenge/domain/interfaces/challenge-service.interface";
import { nanoid } from 'nanoid';
import { IPersonalizedActivityService } from "@/modules/personalized-activity/domain/interfaces/personalized-activity-service.interface";
import { IObservationService } from "@/modules/observation/domain/interfaces/observation-service.interface";
import { ISupportPlanService } from "@/modules/support-plan/domain/interfaces/support-plan-service.interface";
import { generateStudentProfileSuggestion } from "@/ai/flows/generate-student-profile-suggestion";
import { IFearManagementSuggestionService } from "@/modules/fear-management-suggestion/domain/interfaces/fear-management-suggestion-service.interface";

export class StudentService implements IStudentService {
    constructor(
        private readonly studentRepository: IStudentRepository,
        private readonly participationService: IParticipationService,
        private readonly challengeService: IChallengeService,
        private readonly personalizedActivityService: IPersonalizedActivityService,
        private readonly observationService: IObservationService,
        private readonly supportPlanService: ISupportPlanService,
        private readonly fearManagementSuggestionService: IFearManagementSuggestionService,
    ) {}

    async getAllStudents(): Promise<StudentDTO[]> {
        const students = await this.studentRepository.findAll();
        const studentDTOs = await Promise.all(students.map(async (student) => {
            const participationCount = await this.participationService.getParticipationCount(student.id);
            const challenges = await this.challengeService.getChallengesByStudentId(student.id);
            const personalizedActivities = await this.personalizedActivityService.getPersonalizedActivitiesForStudent(student.id);
            const observations = await this.observationService.getObservationsForStudent(student.id);
            const supportPlans = await this.supportPlanService.getSupportPlansForStudent(student.id);
            const fearManagementSuggestions = await this.fearManagementSuggestionService.getSuggestionsForStudent(student.id);

            const studentDto: StudentDTO = {
                ...StudentMapper.toDTO(student),
                participation: participationCount,
                challengeHistory: challenges,
                personalizedActivities: personalizedActivities,
                observations: observations,
                supportPlans: supportPlans,
                fearManagementSuggestions: fearManagementSuggestions,
            };
            return studentDto;
        }));
        return studentDTOs;
    }

    async getStudentById(id: any): Promise<StudentDTO | null> {
        const student = await this.studentRepository.findById(id);
        if (!student) {
            return null;
        }
        const participationCount = await this.participationService.getParticipationCount(id);
        const challenges = await this.challengeService.getChallengesByStudentId(id);
        const personalizedActivities = await this.personalizedActivityService.getPersonalizedActivitiesForStudent(id);
        const observations = await this.observationService.getObservationsForStudent(id);
        const supportPlans = await this.supportPlanService.getSupportPlansForStudent(id);
        const fearManagementSuggestions = await this.fearManagementSuggestionService.getSuggestionsForStudent(id);

        const dto: StudentDTO = {
            ...StudentMapper.toDTO(student),
            participation: participationCount,
            challengeHistory: challenges,
            personalizedActivities: personalizedActivities,
            observations: observations,
            supportPlans: supportPlans,
            fearManagementSuggestions: fearManagementSuggestions,
        };
        return dto;
    }
    
    async getStudentByPublicId(publicId: string): Promise<StudentDTO | null> {
        const student = await this.studentRepository.findByPublicId(publicId);
        if (!student) {
            return null;
        }

        // Check for expiration
        if (student.publicIdExpiresAt && new Date() > student.publicIdExpiresAt) {
            return null;
        }
        
        // If it is a view-once link, check if it has been viewed
        if (student.isUniqueViewActive && student.publicIdViewed) {
            return null;
        }

        // If it is a view-once link and it's the first time being viewed, invalidate it.
        if (student.isUniqueViewActive && !student.publicIdViewed) {
             await this.studentRepository.update(student.id, { 
                publicIdViewed: true,
                publicId: null,
                publicIdExpiresAt: null
            });
        }


        const participationCount = await this.participationService.getParticipationCount(student.id);
        const challenges = await this.challengeService.getChallengesByStudentId(student.id);
        const personalizedActivities = await this.personalizedActivityService.getPersonalizedActivitiesForStudent(student.id);
        const observations = await this.observationService.getObservationsForStudent(student.id);
        const supportPlans = await this.supportPlanService.getSupportPlansForStudent(student.id);
        const fearManagementSuggestions = await this.fearManagementSuggestionService.getSuggestionsForStudent(student.id);

        const dto: StudentDTO = {
            ...StudentMapper.toDTO(student),
            participation: participationCount,
            challengeHistory: challenges,
            personalizedActivities: personalizedActivities,
            observations: observations,
            supportPlans: supportPlans,
            fearManagementSuggestions: fearManagementSuggestions,
        };
        return dto;
    }

    async getStudentByName(name: string): Promise<StudentDTO | null> {
        const student = await this.studentRepository.findByName(name);
        if (!student) {
            return null;
        }
        const participationCount = await this.participationService.getParticipationCount(student.id);
        const challenges = await this.challengeService.getChallengesByStudentId(student.id);
        const personalizedActivities = await this.personalizedActivityService.getPersonalizedActivitiesForStudent(student.id);
        const observations = await this.observationService.getObservationsForStudent(student.id);
        const supportPlans = await this.supportPlanService.getSupportPlansForStudent(student.id);
        const fearManagementSuggestions = await this.fearManagementSuggestionService.getSuggestionsForStudent(student.id);
        
        const dto: StudentDTO = {
            ...StudentMapper.toDTO(student),
            participation: participationCount,
            challengeHistory: challenges,
            personalizedActivities: personalizedActivities,
            observations: observations,
            supportPlans: supportPlans,
            fearManagementSuggestions: fearManagementSuggestions,
        };
        return dto;
    }

    async createStudent(createStudentDto: CreateStudentDTO): Promise<StudentDTO> {
        const studentToCreate = StudentMapper.toDomain(createStudentDto);
        
        const studentWithPublicId = {
            ...studentToCreate,
            publicId: nanoid(6),
        };

        const createdStudent = await this.studentRepository.create(studentWithPublicId as Student);
        
        const dto: StudentDTO = {
            ...StudentMapper.toDTO(createdStudent),
            participation: 0,
            challengeHistory: [],
            personalizedActivities: [],
            observations: [],
            supportPlans: [],
            fearManagementSuggestions: [],
        };
        return dto;
    }

    async updateStudent(id: any, updateStudentDto: UpdateStudentDTO): Promise<StudentDTO | null> {
        const student = await this.studentRepository.update(id, updateStudentDto);
        if (!student) {
            return null;
        }

        const participationCount = await this.participationService.getParticipationCount(id);
        const challenges = await this.challengeService.getChallengesByStudentId(id);
        const personalizedActivities = await this.personalizedActivityService.getPersonalizedActivitiesForStudent(id);
        const observations = await this.observationService.getObservationsForStudent(id);
        const supportPlans = await this.supportPlanService.getSupportPlansForStudent(id);
        const fearManagementSuggestions = await this.fearManagementSuggestionService.getSuggestionsForStudent(id);
        
        const dto: StudentDTO = {
            ...StudentMapper.toDTO(student),
            participation: participationCount,
            challengeHistory: challenges,
            personalizedActivities: personalizedActivities,
            observations: observations,
            supportPlans: supportPlans,
            fearManagementSuggestions: fearManagementSuggestions,
        };
        return dto;
    }

    async deleteStudent(id: any): Promise<void> {
        await this.studentRepository.delete(id);
        await this.participationService.deleteParticipationsForStudent(id);
        await this.challengeService.deleteChallengesForStudent(id);
    }
    
    async generatePublicId(id: string, duration?: '24h' | '7d' | 'view-once' | 'never'): Promise<string | null> {
        const publicId = nanoid(6);
        let expiresAt: Date | null = null;
        const isUnique = duration === 'view-once';

        if (duration && duration !== 'never' && !isUnique) {
            expiresAt = new Date();
            if (duration === '24h') {
                expiresAt.setDate(expiresAt.getDate() + 1);
            } else if (duration === '7d') {
                expiresAt.setDate(expiresAt.getDate() + 7);
            }
        }
        
        const updatedStudent = await this.studentRepository.update(id, { 
            publicId, 
            publicIdExpiresAt: expiresAt,
            publicIdViewed: false, // Always reset viewed status on new link generation
            isUniqueViewActive: isUnique,
        });
        return updatedStudent?.publicId || null;
    }

    async updatePublicProfileTheme(publicId: string, themeName: string): Promise<void> {
        const student = await this.studentRepository.findByPublicId(publicId);
        if (!student) {
            throw new Error("Student not found");
        }
        await this.studentRepository.update(student.id, { publicTheme: themeName });
    }

    async getParticipationInRange(startDate: string, endDate: string, studentIds: string[]): Promise<{ id: string; name: string; count: number }[]> {
        return this.participationService.getParticipationCountByDateRange(startDate, endDate, studentIds);
    }

    async generateProfileSuggestion(input: { studentName: string, studentAge?: number, studentGender?: 'female' | 'male' | 'non-binary' | 'other' | 'prefer-not-to-say', language: string, fieldType: 'qualities' | 'fears' | 'notes' }): Promise<{ suggestion: string }> {
        const result = await generateStudentProfileSuggestion(input);
        return result;
    }
}
