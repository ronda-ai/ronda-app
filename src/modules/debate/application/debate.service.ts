

import { generateDebate } from "@/ai/flows/generate-debate";
import { generateDebateTopicSuggestion } from "@/ai/flows/generate-debate-topic-suggestion";
import { IDebateRepository } from "../domain/interfaces/debate-repository.interface";
import { IDebateService } from "../domain/interfaces/debate-service.interface";
import { CreateDebateDTO } from "./dtos/create-debate.dto";
import { DebateDTO, DebateTeams } from "./dtos/debate.dto";
import { DebateMapper } from "./mappers/debate.mapper";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import { Debate } from "../domain/debate.entity";

export type DebateComplexity = 'beginner' | 'intermediate' | 'advanced';

export class DebateService implements IDebateService {
    constructor(private readonly repository: IDebateRepository) {}

    async createDebate(dto: CreateDebateDTO): Promise<DebateDTO> {
        const newDebate = await this.repository.create(dto);
        return DebateMapper.toDTO(newDebate);
    }
    
    async generateAndCreateDebate(input: {
        topic: string;
        complexity: DebateComplexity;
        language: string;
        ageOrGrade?: string;
        country?: string;
    }): Promise<DebateDTO> {
        const result = await generateDebate(input);
        
        const newDebate = await this.createDebate({
            ...input,
            ...result,
            currentTurnIndex: -1,
            turnStartedAt: null,
            isPaused: false,
            pausedAt: null,
            accumulatedPauseTime: 0,
        });

        return newDebate;
    }
    
    async generateDebateTopicSuggestion(input: {
        language: string;
        ageOrGrade?: string;
        country?: string;
        classInterests?: string[];
    }): Promise<string> {
        const result = await generateDebateTopicSuggestion(input);
        return result.topic;
    }


    async getAllDebates(): Promise<DebateDTO[]> {
        const debates = await this.repository.findAll();
        return debates.map(DebateMapper.toDTO);
    }
    
    async getDebateById(id: string): Promise<DebateDTO | null> {
        const debate = await this.repository.findById(id);
        return debate ? DebateMapper.toDTO(debate) : null;
    }
    
    async getDebateByLiveId(liveId: string): Promise<DebateDTO | null> {
        const debate = await this.repository.findByLiveId(liveId);
        return debate ? DebateMapper.toDTO(debate) : null;
    }

    async updateDebate(id: string, data: Partial<DebateDTO>): Promise<DebateDTO | null> {
        const debate = await this.repository.update(id, data);
        if(!debate) return null;
        return DebateMapper.toDTO(debate);
    }

    async deleteDebate(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async startDebateSession(debateId: string): Promise<DebateDTO | null> {
        const liveId = nanoid(8);
        return this.updateDebate(debateId, {
            status: 'live',
            liveId: liveId,
            teams: { affirmative: [], negative: [], unassigned: [] },
            currentTurnIndex: -1, // -1 means debate hasn't started
            turnStartedAt: null,
            isPaused: false,
            pausedAt: null,
            accumulatedPauseTime: 0,
        });
    }

    async stopDebateSession(debateId: string): Promise<DebateDTO | null> {
        return this.updateDebate(debateId, {
            status: 'closed',
            liveId: undefined,
            currentTurnIndex: -1,
        });
    }
    
    async nextTurn(debateId: string): Promise<DebateDTO | null> {
        const debate = await this.repository.findById(debateId);
        if (!debate) return null;

        const nextIndex = debate.currentTurnIndex === null ? 0 : debate.currentTurnIndex + 1;
        if (nextIndex >= debate.turnStructure.length) {
            // End of debate
            return this.stopDebateSession(debateId);
        }
        
        return this.updateDebate(debateId, {
            currentTurnIndex: nextIndex,
            turnStartedAt: new Date().toISOString(),
            isPaused: false,
            pausedAt: null,
            accumulatedPauseTime: 0
        });
    }

    async pauseOrResume(debateId: string): Promise<DebateDTO | null> {
        const debate = await this.repository.findById(debateId);
        if (!debate || debate.status !== 'live' || debate.currentTurnIndex === null || debate.currentTurnIndex === -1) {
            return null;
        }

        if (debate.isPaused) { // Resuming
            const pauseDuration = debate.pausedAt ? new Date().getTime() - new Date(debate.pausedAt).getTime() : 0;
            return this.updateDebate(debateId, {
                isPaused: false,
                pausedAt: null,
                turnStartedAt: new Date(new Date().getTime() - ((debate.turnStartedAt ? new Date(debate.turnStartedAt).getTime() : 0) + pauseDuration)).toISOString(),
            });
        } else { // Pausing
            return this.updateDebate(debateId, {
                isPaused: true,
                pausedAt: new Date().toISOString(),
            });
        }
    }


    async joinDebateSession(liveId: string, studentId: string, team: 'affirmative' | 'negative'): Promise<{ success: boolean; message?: string; status?: number }> {
        const debate = await this.repository.findByLiveId(liveId);
        if (!debate || debate.status !== 'live') {
            return { success: false, message: "Debate session not found or not active", status: 404 };
        }
        
        const teams: DebateTeams = {
            affirmative: (debate.teams?.affirmative || []).map(id => id.toString()),
            negative: (debate.teams?.negative || []).map(id => id.toString()),
            unassigned: (debate.teams?.unassigned || []).map(id => id.toString())
        };
        
        // Remove student from any other team before adding to the new one
        Object.keys(teams).forEach(key => {
            const teamKey = key as keyof DebateTeams;
            const index = teams[teamKey].indexOf(studentId);
            if (index > -1) {
                teams[teamKey].splice(index, 1);
            }
        });

        // Ensure the target team array exists before pushing
        if (!teams[team]) {
            teams[team] = [];
        }
        teams[team].push(studentId);

        await this.repository.update(debate.id, { teams });

        return { success: true };
    }

    async leaveDebateSession(liveId: string, studentId: string): Promise<void> {
        const debate = await this.repository.findByLiveId(liveId);
        if (!debate || debate.status !== 'live') {
            console.warn(`Attempted to leave a non-existent or inactive session: ${liveId}`);
            return;
        }

        const teams: DebateTeams = {
            affirmative: (debate.teams?.affirmative || []).map(id => id.toString()),
            negative: (debate.teams?.negative || []).map(id => id.toString()),
            unassigned: (debate.teams?.unassigned || []).map(id => id.toString())
        };
        
        // Remove student from any team
        Object.keys(teams).forEach(key => {
            const teamKey = key as keyof DebateTeams;
            const index = teams[teamKey].indexOf(studentId);
            if (index > -1) {
                teams[teamKey].splice(index, 1);
            }
        });
        
        await this.repository.update(debate.id, { teams });
    }
}
