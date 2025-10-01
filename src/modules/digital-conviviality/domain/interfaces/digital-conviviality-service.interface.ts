

import { GenerateDigitalConvivialityActivityInput } from "@/ai/flows/generate-digital-conviviality-activity";
import { GenerateDigitalConflictScenarioInput } from "@/ai/flows/generate-digital-conflict-scenario";
import { GenerateDigitalPactInput } from "@/ai/flows/generate-digital-pact";
import { DigitalConvivialityActivityDTO } from "../../application/dtos/digital-conviviality-activity.dto";
import { DigitalConflictScenarioDTO } from '../../application/dtos/digital-conflict-scenario.dto';
import { DigitalPactDTO } from '../../application/dtos/digital-pact.dto';

export interface IDigitalConvivialityService {
    // Activities
    generateAndCreateActivity(input: GenerateDigitalConvivialityActivityInput): Promise<DigitalConvivialityActivityDTO>;
    getAllActivities(): Promise<DigitalConvivialityActivityDTO[]>;
    deleteActivity(id: string): Promise<void>;

    // Scenarios
    generateAndCreateConflictScenario(input: GenerateDigitalConflictScenarioInput): Promise<DigitalConflictScenarioDTO>;
    getAllScenarios(): Promise<DigitalConflictScenarioDTO[]>;
    deleteScenario(id: string): Promise<void>;

    // Pacts
    generateAndCreatePact(input: GenerateDigitalPactInput): Promise<DigitalPactDTO>;
    getAllPacts(): Promise<DigitalPactDTO[]>;
    deletePact(id: string): Promise<void>;
    updatePact(id: string, data: Partial<DigitalPactDTO>): Promise<DigitalPactDTO | null>;
    publishPact(id: string): Promise<DigitalPactDTO | null>;
}
