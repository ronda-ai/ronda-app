
import { RiddleBattle } from "../../domain/riddle-battle.entity";

export type CreateRiddleBattleDTO = Omit<RiddleBattle, 'id' | 'createdAt' | 'updatedAt'>;
