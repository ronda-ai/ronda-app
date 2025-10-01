
import { IObservationRepository } from "../domain/interfaces/observation-repository.interface";
import { IObservationService } from "../domain/interfaces/observation-service.interface";
import { CreateObservationDTO } from "./dtos/create-observation.dto";
import { ObservationDTO, ObservationType } from "./dtos/observation.dto";
import { ObservationMapper } from "./mappers/observation.mapper";
import { generateObservationAnalysis } from "@/ai/flows/generate-observation-analysis";
import { AISuggestion } from "../../../app/[locale]/observations/_hooks/useObservations";


export class ObservationService implements IObservationService {
    constructor(private readonly observationRepository: IObservationRepository) {}

    async createObservation(dto: CreateObservationDTO): Promise<ObservationDTO> {
        const newObservation = await this.observationRepository.create(dto);
        return ObservationMapper.toDTO(newObservation);
    }

    async getObservationsForStudent(studentId: string): Promise<ObservationDTO[]> {
        const observations = await this.observationRepository.findByStudentId(studentId);
        return observations.map(ObservationMapper.toDTO);
    }

    async deleteObservation(observationId: string): Promise<void> {
        await this.observationRepository.delete(observationId);
    }

    async analyzeObservation(
        observationText: string, 
        studentName: string | undefined, 
        language: string,
        ageOrGrade?: string,
        subject?: string,
        country?: string
    ): Promise<AISuggestion> {
        const alias = studentName ? 'Student A' : undefined;
        
        const result = await generateObservationAnalysis({
            observationText,
            studentName: alias,
            language,
            ageOrGrade,
            subject,
            country
        });

        // De-anonymize the deepening question
        let finalQuestion = result.deepeningQuestion;
        if (finalQuestion && alias && studentName) {
            finalQuestion = finalQuestion.replace(new RegExp(alias, 'g'), studentName);
        }
        
        return {
            ...result,
            deepeningQuestion: finalQuestion
        };
    }
}
