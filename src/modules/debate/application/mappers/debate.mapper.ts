
import { Debate } from "../../domain/debate.entity";
import { DebateDTO, DebateTeams } from "../dtos/debate.dto";

export class DebateMapper {
    public static toDTO(debate: Debate): DebateDTO {
        // Ensure that team IDs are converted to strings
        const teamsDTO: DebateTeams | undefined = debate.teams ? {
            affirmative: debate.teams.affirmative.map(id => id.toString()),
            negative: debate.teams.negative.map(id => id.toString()),
            unassigned: debate.teams.unassigned.map(id => id.toString()),
        } : undefined;

        return {
            id: debate.id,
            topic: debate.topic,
            complexity: debate.complexity,
            affirmativeStance: debate.affirmativeStance,
            negativeStance: debate.negativeStance,
            guidingQuestions: debate.guidingQuestions,
            rules: debate.rules,
            turnStructure: debate.turnStructure,
            status: debate.status,
            liveId: debate.liveId,
            teams: teamsDTO,
            currentTurnIndex: debate.currentTurnIndex,
            turnStartedAt: debate.turnStartedAt ? debate.turnStartedAt.toISOString() : null,
            isPaused: debate.isPaused,
            pausedAt: debate.pausedAt ? debate.pausedAt.toISOString() : null,
            accumulatedPauseTime: debate.accumulatedPauseTime,
            createdAt: debate.createdAt.toISOString(),
        };
    }
}
