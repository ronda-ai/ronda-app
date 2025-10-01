

import { ISupportPlanRepository } from "../domain/interfaces/support-plan-repository.interface";
import { ISupportPlanService } from "../domain/interfaces/support-plan-service.interface";
import { CreateSupportPlanDTO } from "./dtos/create-support-plan.dto";
import { SupportPlanDTO, SupportPlanStepDTO } from "./dtos/support-plan.dto";
import { SupportPlanMapper } from "./mappers/support-plan.mapper";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";
import { generateSupportPlan } from "@/ai/flows/generate-support-plan";
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';

export class SupportPlanService implements ISupportPlanService {
    constructor(
        private readonly supportPlanRepository: ISupportPlanRepository,
        private readonly anonymizationService: IAnonymizationService,
    ) {}

    async createSupportPlan(dto: CreateSupportPlanDTO): Promise<SupportPlanDTO> {
        const newPlan = await this.supportPlanRepository.create(dto);
        return SupportPlanMapper.toDTO(newPlan);
    }

    async getSupportPlansForStudent(studentId: string): Promise<SupportPlanDTO[]> {
        const plans = await this.supportPlanRepository.findByStudentId(studentId);
        return plans.map(SupportPlanMapper.toDTO);
    }

    async addFeedbackToPlan(planId: string, feedback: string): Promise<SupportPlanDTO | null> {
        const updatedPlan = await this.supportPlanRepository.update(planId, { teacherFeedback: feedback });
        if (!updatedPlan) return null;
        return SupportPlanMapper.toDTO(updatedPlan);
    }

    async updateStepDetails(planId: string, stepIndex: number, details: Partial<SupportPlanStepDTO>): Promise<SupportPlanDTO | null> {
        const plan = await this.supportPlanRepository.findById(planId);
        if (!plan) return null;
        
        if (stepIndex < 0 || stepIndex >= plan.steps.length) {
            throw new Error("Step index out of bounds");
        }

        const updatedSteps = [...plan.steps];
        updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], ...details };
        
        const updatedPlan = await this.supportPlanRepository.update(planId, { steps: updatedSteps });
        if (!updatedPlan) return null;
        
        return SupportPlanMapper.toDTO(updatedPlan);
    }

    async deleteSupportPlan(planId: string): Promise<void> {
        await this.supportPlanRepository.delete(planId);
    }

    async generateAndCreateSupportPlan(input: {
        student: StudentDTO,
        allStudents: StudentDTO[],
        previousPlans?: SupportPlanDTO[],
        observations: ObservationDTO[],
        language: string
    }): Promise<SupportPlanDTO> {
        const { student, allStudents, previousPlans, observations, language } = input;

        // Transform challengeHistory to the flat structure expected by the AI flow
        const transformedStudent = {
            ...student,
            challengeHistory: (student.challengeHistory || []).map(h => ({
                challenge: h.challenge.challenge,
                tip: h.challenge.tip,
                status: h.status,
                rating: h.rating,
                feedback: h.feedback,
            }))
        };

        const { anonymizedData: anonymizedStudent, mapping } = this.anonymizationService.anonymize(transformedStudent, allStudents);

        const result = await generateSupportPlan({
            student: anonymizedStudent,
            allStudents: [], // This is not needed in the prompt itself, as context is in the main student
            previousPlans: previousPlans,
            observations: observations,
            language: language,
        });
        console.log(result.steps)
        const deAnonymizedSteps = result.steps.map(step => ({
            text: this.anonymizationService.deAnonymizeText(step.text, mapping),
            status: 'pending' as const,
        }));
        
        const createdPlan = await this.createSupportPlan({
            studentId: student.id,
            steps: deAnonymizedSteps,
        });

        return createdPlan;
    }
}
