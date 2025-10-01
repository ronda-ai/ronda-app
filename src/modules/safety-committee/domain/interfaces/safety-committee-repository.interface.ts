
import { CreateSafetyCommitteeDTO } from "../../application/dtos/create-safety-committee.dto";
import { SafetyCommittee, CommitteeMission } from "../safety-committee.entity";

export interface ISafetyCommitteeRepository {
    create(data: CreateSafetyCommitteeDTO): Promise<SafetyCommittee>;
    findAll(): Promise<SafetyCommittee[]>;
    findById(id: string): Promise<SafetyCommittee | null>;
    delete(id: string): Promise<void>;
    addMember(committeeId: string, studentId: string, role: string): Promise<SafetyCommittee | null>;
    addMission(committeeId: string, mission: CommitteeMission): Promise<SafetyCommittee | null>;
    toggleMissionStatus(committeeId: string, missionIndex: number, newStatus: 'pending' | 'completed'): Promise<SafetyCommittee | null>;
    removeMember(committeeId: string, studentId: string): Promise<SafetyCommittee | null>;
}
