import { IRiddleBattleRepository } from "../../../domain/interfaces/riddle-battle-repository.interface";
import { CreateRiddleBattleDTO } from "../../../application/dtos/create-riddle-battle.dto";
import { UpdateRiddleBattleDTO } from "../../../application/dtos/update-riddle-battle.dto";
import { RiddleBattle } from "../../../domain/riddle-battle.entity";

export class SupabaseRiddleBattleRepository implements IRiddleBattleRepository {
    async create(data: CreateRiddleBattleDTO): Promise<RiddleBattle> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<RiddleBattle[]> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, data: UpdateRiddleBattleDTO): Promise<RiddleBattle | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
