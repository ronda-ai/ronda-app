
import { AISuggestion } from "@/app/[locale]/observations/_hooks/useObservations";
import { CreateObservationDTO } from "../../application/dtos/create-observation.dto";
import { ObservationDTO, ObservationType } from "../../application/dtos/observation.dto";

export interface IObservationService {
    createObservation(dto: CreateObservationDTO): Promise<ObservationDTO>;
    getObservationsForStudent(studentId: string): Promise<ObservationDTO[]>;
    deleteObservation(observationId: string): Promise<void>;
    analyzeObservation(
        observationText: string, 
        studentName: string | undefined, 
        language: string,
        ageOrGrade?: string,
        subject?: string,
        country?: string
    ): Promise<AISuggestion>;
}
