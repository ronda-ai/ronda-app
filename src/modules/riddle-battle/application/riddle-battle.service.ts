
import { generateRiddleBattle } from "@/ai/flows/generate-riddle-battle";
import { AIConfigurationDTO } from "@/modules/ai-configuration/application/dtos/ai-configuration.dto";
import { IRiddleBattleRepository } from "../domain/interfaces/riddle-battle-repository.interface";
import { IRiddleBattleService } from "../domain/interfaces/riddle-battle-service.interface";
import { CreateRiddleBattleDTO } from "./dtos/create-riddle-battle.dto";
import { RiddleBattleDTO } from "./dtos/riddle-battle.dto";
import { UpdateRiddleBattleDTO } from "./dtos/update-riddle-battle.dto";
import { RiddleBattleMapper } from "./mappers/riddle-battle.mapper";

export class RiddleBattleService implements IRiddleBattleService {
    constructor(private readonly repository: IRiddleBattleRepository) {}

    async createBattle(dto: CreateRiddleBattleDTO): Promise<RiddleBattleDTO> {
        const newBattle = await this.repository.create(dto);
        return RiddleBattleMapper.toDTO(newBattle);
    }

    async generateAndCreateBattle(input: { topic: string; language: string; aiConfig: AIConfigurationDTO }): Promise<RiddleBattleDTO> {
        const result = await generateRiddleBattle({
            topic: input.topic,
            language: input.language,
            ageOrGrade: input.aiConfig.ageOrGrade,
            battleHistory: await this.repository.findAll(), // Pass history for better generation
        });

        const newBattle = await this.createBattle({
            topic: input.topic,
            ...result,
        });

        return newBattle;
    }
    
    async getAllBattles(): Promise<RiddleBattleDTO[]> {
        const battles = await this.repository.findAll();
        return battles.map(RiddleBattleMapper.toDTO);
    }

    async updateBattle(id: string, dto: UpdateRiddleBattleDTO): Promise<RiddleBattleDTO | null> {
        const updatedBattle = await this.repository.update(id, dto);
        if (!updatedBattle) {
            return null;
        }
        return RiddleBattleMapper.toDTO(updatedBattle);
    }

    async deleteBattle(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
