
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { CreateDebateDTO } from "../../application/dtos/create-debate.dto";
import { DebateDTO } from "../../application/dtos/debate.dto";
import { DebateComplexity } from '../../application/debate.service';
import { Debate } from "../debate.entity";

export interface IDebateService {
    createDebate(dto: CreateDebateDTO): Promise<DebateDTO>;
    generateAndCreateDebate(input: {
        topic: string;
        complexity: DebateComplexity;
        language: string;
        ageOrGrade?: string;
        country?: string;
    }): Promise<DebateDTO>;
    generateDebateTopicSuggestion(input: {
        language: string;
        ageOrGrade?: string;
        country?: string;
        classInterests?: string[];
    }): Promise<string>;
    getAllDebates(): Promise<DebateDTO[]>;
    getDebateById(id: string): Promise<DebateDTO | null>;
    getDebateByLiveId(liveId: string): Promise<DebateDTO | null>;
    updateDebate(id: string, data: Partial<DebateDTO>): Promise<DebateDTO | null>;
    deleteDebate(id: string): Promise<void>;
    startDebateSession(debateId: string): Promise<DebateDTO | null>;
    stopDebateSession(debateId: string): Promise<DebateDTO | null>;
    nextTurn(debateId: string): Promise<DebateDTO | null>;
    pauseOrResume(debateId: string): Promise<DebateDTO | null>;
    joinDebateSession(liveId: string, studentId: string, team: 'affirmative' | 'negative'): Promise<{ success: boolean; message?: string; status?: number; }>;
    leaveDebateSession(liveId: string, studentId: string): Promise<void>;
}
