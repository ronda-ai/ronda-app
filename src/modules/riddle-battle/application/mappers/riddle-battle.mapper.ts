
import { RiddleBattle } from "../../domain/riddle-battle.entity";
import { RiddleBattleDTO } from "../dtos/riddle-battle.dto";

export class RiddleBattleMapper {
    public static toDTO(battle: RiddleBattle): RiddleBattleDTO {
        return {
            id: battle.id,
            topic: battle.topic,
            teamBlueRiddle: battle.teamBlueRiddle,
            teamBlueAnswer: battle.teamBlueAnswer,
            teamRedRiddle: battle.teamRedRiddle,
            teamRedAnswer: battle.teamRedAnswer,
            winner: battle.winner,
            feedback: battle.feedback,
            mood: battle.mood,
            createdAt: battle.createdAt.toISOString(),
        };
    }
}
