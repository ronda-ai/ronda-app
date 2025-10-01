
import { CreateRiddleBattleDTO } from "../../application/dtos/create-riddle-battle.dto";
import { UpdateRiddleBattleDTO } from "../../application/dtos/update-riddle-battle.dto";
import { RiddleBattle } from "../riddle-battle.entity";

export interface IRiddleBattleRepository {
    create(data: CreateRiddleBattleDTO): Promise<RiddleBattle>;
    findAll(): Promise<RiddleBattle[]>;
    update(id: string, data: UpdateRiddleBattleDTO): Promise<RiddleBattle | null>;
    delete(id: string): Promise<void>;
}
