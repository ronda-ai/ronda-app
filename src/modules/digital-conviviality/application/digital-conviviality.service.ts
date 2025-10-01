

import { IDigitalConvivialityService } from "../domain/interfaces/digital-conviviality-service.interface";
import { CreateDigitalConvivialityActivityDTO } from "./dtos/create-digital-conviviality-activity.dto";
import { DigitalConvivialityActivityDTO } from "./dtos/digital-conviviality-activity.dto";
import { DigitalConvivialityActivityMapper } from "./mappers/digital-conviviality-activity.mapper";
import { IDigitalConvivialityActivityRepository } from '../domain/interfaces/digital-conviviality-activity-repository.interface';
import { IDigitalConflictScenarioRepository } from '../domain/interfaces/digital-conflict-scenario-repository.interface';
import { IDigitalPactRepository } from '../domain/interfaces/digital-pact-repository.interface';
import { DigitalConflictScenarioDTO } from './dtos/digital-conflict-scenario.dto';
import { DigitalPactDTO } from './dtos/digital-pact.dto';
import { DigitalConflictScenarioMapper } from "./mappers/digital-conflict-scenario.mapper";
import { DigitalPactMapper } from "./mappers/digital-pact.mapper";
import { generateDigitalConvivialityActivity, GenerateDigitalConvivialityActivityInput } from "@/ai/flows/generate-digital-conviviality-activity";
import { generateDigitalConflictScenario, GenerateDigitalConflictScenarioInput } from "@/ai/flows/generate-digital-conflict-scenario";
import { generateDigitalPact, GenerateDigitalPactInput } from "@/ai/flows/generate-digital-pact";


export class DigitalConvivialityService implements IDigitalConvivialityService {
    constructor(
        private readonly activityRepository: IDigitalConvivialityActivityRepository,
        private readonly scenarioRepository: IDigitalConflictScenarioRepository,
        private readonly pactRepository: IDigitalPactRepository,
    ) {}

    async generateAndCreateActivity(input: GenerateDigitalConvivialityActivityInput): Promise<DigitalConvivialityActivityDTO> {
        const result = await generateDigitalConvivialityActivity(input);

        const dto: CreateDigitalConvivialityActivityDTO = {
            title: result.title,
            introduction: result.introduction,
            pedagogicalObjectives: result.pedagogicalObjectives,
            steps: result.steps,
            studentInstructions: result.studentInstructions,
            activityType: input.activityType,
            materials: result.materials || [],
            customPrompt: input.customPrompt,
        };
        
        const newActivity = await this.activityRepository.create(dto);
        return DigitalConvivialityActivityMapper.toDTO(newActivity);
    }

    async getAllActivities(): Promise<DigitalConvivialityActivityDTO[]> {
        const activities = await this.activityRepository.findAll();
        return activities.map(DigitalConvivialityActivityMapper.toDTO);
    }

    async deleteActivity(id: string): Promise<void> {
        await this.activityRepository.delete(id);
    }
    
    // --- Scenarios ---

    async generateAndCreateConflictScenario(input: GenerateDigitalConflictScenarioInput): Promise<DigitalConflictScenarioDTO> {
        const result = await generateDigitalConflictScenario(input);
        const scenario = await this.scenarioRepository.create({
            ...result,
            topics: input.topics
        });
        return DigitalConflictScenarioMapper.toDTO(scenario);
    }

    async getAllScenarios(): Promise<DigitalConflictScenarioDTO[]> {
        const scenarios = await this.scenarioRepository.findAll();
        return scenarios.map(DigitalConflictScenarioMapper.toDTO);
    }

    async deleteScenario(id: string): Promise<void> {
        await this.scenarioRepository.delete(id);
    }

    // --- Pacts ---
    async generateAndCreatePact(input: GenerateDigitalPactInput): Promise<DigitalPactDTO> {
        const result = await generateDigitalPact(input);
        const pact = await this.pactRepository.create({ ...result, version: 1 });
        return DigitalPactMapper.toDTO(pact);
    }

    async getAllPacts(): Promise<DigitalPactDTO[]> {
        const pacts = await this.pactRepository.findAll();
        return pacts.map(DigitalPactMapper.toDTO);
    }

    async deletePact(id: string): Promise<void> {
        await this.pactRepository.delete(id);
    }

    async updatePact(id: string, data: Partial<DigitalPactDTO>): Promise<DigitalPactDTO | null> {
        const { createdAt, updatedAt, publishedAt, ...rest } = data;
        
        const updateData: any = {
            ...rest,
        };

        if (publishedAt) {
            updateData.publishedAt = new Date(publishedAt);
        }
        
        const pact = await this.pactRepository.update(id, updateData);
        return pact ? DigitalPactMapper.toDTO(pact) : null;
    }

    async publishPact(id: string): Promise<DigitalPactDTO | null> {
        const existingPact = await this.pactRepository.findById(id);
        if (!existingPact) return null;

        const currentVersion = existingPact.version || 0;
        const updatedPact = await this.pactRepository.update(id, {
            publishedAt: new Date(),
            version: currentVersion + 1,
        });

        return updatedPact ? DigitalPactMapper.toDTO(updatedPact) : null;
    }
}
