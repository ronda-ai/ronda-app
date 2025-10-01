
import { generateImprovedObservation } from "@/ai/flows/generate-improved-observation";
import { IImprovedObservationRepository } from "../domain/interfaces/improved-observation-repository.interface";
import { IImprovedObservationService } from "../domain/interfaces/improved-observation-service.interface";
import { ImprovedObservationDTO } from "./dtos/improved-observation.dto";

export class ImprovedObservationService implements IImprovedObservationService {
    constructor(private readonly repository: IImprovedObservationRepository) {}

    async getImprovedObservation(
        observationText: string, 
        studentName: string | undefined, 
        language: string, 
        ageOrGrade?: string, 
        subject?: string, 
        country?: string
    ): Promise<ImprovedObservationDTO> {
        
        const alias = studentName ? 'Student A' : undefined;
        
        const result = await generateImprovedObservation({
            observationText,
            studentName: alias,
            language,
            ageOrGrade,
            subject,
            country
        });

        // De-anonymize response if needed
        let finalObservation = result.improvedObservation;
        if (alias && studentName) {
            finalObservation = finalObservation.replace(new RegExp(alias, 'g'), studentName);
        }

        // We are not saving this to the database, so we create a transient DTO
        const dto: ImprovedObservationDTO = {
            id: 'transient',
            originalObservation: observationText,
            improvedObservation: finalObservation,
            createdAt: new Date().toISOString()
        };
        
        return dto;
    }
}
