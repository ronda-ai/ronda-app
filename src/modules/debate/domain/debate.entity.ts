
import mongoose from "mongoose";

export interface Turn {
    team: 'affirmative' | 'negative' | 'both' | 'teacher';
    type: string;
    durationSeconds: number;
}

export interface DebateTeams {
    affirmative: mongoose.Types.ObjectId[];
    negative: mongoose.Types.ObjectId[];
    unassigned: mongoose.Types.ObjectId[];
}

export class Debate {
    constructor(
        public id: any,
        public topic: string,
        public complexity: 'beginner' | 'intermediate' | 'advanced',
        public affirmativeStance: string,
        public negativeStance: string,
        public guidingQuestions: string[],
        public rules: string[],
        public turnStructure: Turn[],
        public createdAt: Date,
        public updatedAt: Date,
        public status: 'draft' | 'live' | 'closed' = 'draft',
        public liveId?: string,
        public teams?: DebateTeams,
        public currentTurnIndex: number = -1,
        public turnStartedAt: Date | null = null,
        public isPaused: boolean = false,
        public pausedAt: Date | null = null,
        public accumulatedPauseTime: number = 0
    ) {}
}
