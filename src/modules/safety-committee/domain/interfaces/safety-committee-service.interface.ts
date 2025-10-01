
import { CreateSafetyCommitteeDTO } from "../../application/dtos/create-safety-committee.dto";
import { SafetyCommitteeDTO } from "../../application/dtos/safety-committee.dto";
import { BrigadeFormationResult } from "./brigade-formation.dto";

export interface ISafetyCommitteeService {
    createCommittee(dto: CreateSafetyCommitteeDTO): Promise<SafetyCommitteeDTO>;
    getAllCommittees(): Promise<SafetyCommitteeDTO[]>;
    deleteCommittee(id: string): Promise<void>;
    addMember(committeeId: string, studentId: string, role: string): Promise<SafetyCommitteeDTO | null>;
    removeMember(committeeId: string, studentId: string): Promise<SafetyCommitteeDTO | null>;
    generateBrigadeSuggestion(objective: string, criteria: 'calm-under-pressure' | 'leadership-potential', language: string): Promise<BrigadeFormationResult>;
    suggestRole(committeeId: string, studentId: string, language: string): Promise<{role: string; justification: string;}>;
    addMission(committeeId: string, missionText: string): Promise<SafetyCommitteeDTO | null>;
    toggleMissionStatus(committeeId: string, missionIndex: number, newStatus: 'pending' | 'completed'): Promise<SafetyCommitteeDTO | null>;
}
