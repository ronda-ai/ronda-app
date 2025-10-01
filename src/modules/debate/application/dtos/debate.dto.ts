
import { Turn } from "../../domain/debate.entity";

export interface DebateTeams {
    affirmative: string[];
    negative: string[];
    unassigned: string[];
}

export interface DebateDTO {
    id: string;
    topic: string;
    complexity: 'beginner' | 'intermediate' | 'advanced';
    affirmativeStance: string;
    negativeStance: string;
    guidingQuestions: string[];
    rules: string[];
    turnStructure: Turn[];
    status: 'draft' | 'live' | 'closed';
    liveId?: string;
    teams?: DebateTeams;
    currentTurnIndex: number;
    turnStartedAt: string | null;
    isPaused: boolean;
    pausedAt: string | null;
    accumulatedPauseTime: number;
    createdAt: string;
}
