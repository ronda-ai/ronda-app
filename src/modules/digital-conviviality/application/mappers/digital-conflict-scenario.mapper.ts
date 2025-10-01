
import { DigitalConflictScenario } from "../../domain/digital-conviviality.entity";
import { DigitalConflictScenarioDTO } from "../dtos/digital-conflict-scenario.dto";

export class DigitalConflictScenarioMapper {
    public static toDTO(scenario: DigitalConflictScenario): DigitalConflictScenarioDTO {
        return {
            id: scenario.id,
            title: scenario.title,
            scenario: scenario.scenario,
            strategies: scenario.strategies,
            topics: scenario.topics,
            createdAt: scenario.createdAt.toISOString(),
            updatedAt: scenario.updatedAt.toISOString(),
        };
    }
}
