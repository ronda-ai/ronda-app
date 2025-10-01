
import { AIConfigurationDTO } from "@/modules/ai-configuration/application/dtos/ai-configuration.dto";
import { CreateRiddleBattleDTO } from "../../application/dtos/create-riddle-battle.dto";
import { RiddleBattleDTO } from "../../application/dtos/riddle-battle.dto";
import { UpdateRiddleBattleDTO } from "../../application/dtos/update-riddle-battle.dto";

export interface IRiddleBattleService {
    createBattle(dto: CreateRiddleBattleDTO): Promise<RiddleBattleDTO>;
    generateAndCreateBattle(input: { topic: string; language: string, aiConfig: AIConfigurationDTO }): Promise<RiddleBattleDTO>;
    getAllBattles(): Promise<RiddleBattleDTO[]>;
    updateBattle(id: string, dto: UpdateRiddleBattleDTO): Promise<RiddleBattleDTO | null>;
    deleteBattle(id: string): Promise<void>;
}
