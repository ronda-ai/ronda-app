
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { ISafetyCommitteeRepository } from "../domain/interfaces/safety-committee-repository.interface";
import { ISafetyCommitteeService } from "../domain/interfaces/safety-committee-service.interface";
import { CreateSafetyCommitteeDTO } from "./dtos/create-safety-committee.dto";
import { SafetyCommitteeDTO } from "./dtos/safety-committee.dto";
import { SafetyCommitteeMapper } from "./mappers/safety-committee.mapper";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";
import { generateSafetyBrigade } from "@/ai/flows/generate-safety-brigade";
import { generateSafetyRoleSuggestion } from "@/ai/flows/generate-safety-role-suggestion";
import { CommitteeMission } from "../domain/safety-committee.entity";
import { BrigadeFormationResult } from "../domain/interfaces/brigade-formation.dto";

export class SafetyCommitteeService implements ISafetyCommitteeService {
    constructor(
        private readonly repository: ISafetyCommitteeRepository,
        private readonly studentService: IStudentService,
        private readonly anonymizationService: IAnonymizationService,
    ) {}

    private async populateMembers(committee: any): Promise<SafetyCommitteeDTO> {
        const memberStudentIds = committee.members.map((m: any) => m.studentId.toString());
        const members = await Promise.all(memberStudentIds.map((id: string) => this.studentService.getStudentById(id)));
        const memberMap = new Map(members.filter(Boolean).map(s => [s!.id, s]));

        const dto = SafetyCommitteeMapper.toDTO(committee);
        return {
            ...dto,
            members: committee.members.map((m: any) => ({
                student: memberMap.get(m.studentId.toString()),
                role: m.role
            })).filter((m: any) => m.student),
        };
    }

    async createCommittee(dto: CreateSafetyCommitteeDTO): Promise<SafetyCommitteeDTO> {
        const newCommittee = await this.repository.create(dto);
        return this.populateMembers(newCommittee);
    }

    async getAllCommittees(): Promise<SafetyCommitteeDTO[]> {
        const committees = await this.repository.findAll();
        return Promise.all(committees.map(c => this.populateMembers(c)));
    }

    async deleteCommittee(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async addMember(committeeId: string, studentId: string, role: string): Promise<SafetyCommitteeDTO | null> {
        const committee = await this.repository.addMember(committeeId, studentId, role);
        if (!committee) return null;
        return this.populateMembers(committee);
    }
    
    async addMission(committeeId: string, missionText: string): Promise<SafetyCommitteeDTO | null> {
        const newMission: CommitteeMission = {
            text: missionText,
            status: 'pending',
        };
        const committee = await this.repository.addMission(committeeId, newMission);
        if (!committee) return null;
        return this.populateMembers(committee);
    }

    async toggleMissionStatus(committeeId: string, missionIndex: number, newStatus: 'pending' | 'completed'): Promise<SafetyCommitteeDTO | null> {
        const committee = await this.repository.toggleMissionStatus(committeeId, missionIndex, newStatus);
        if (!committee) return null;
        return this.populateMembers(committee);
    }

    async removeMember(committeeId: string, studentId: string): Promise<SafetyCommitteeDTO | null> {
        const committee = await this.repository.removeMember(committeeId, studentId);
        if (!committee) return null;
        return this.populateMembers(committee);
    }

    async generateBrigadeSuggestion(objective: string, criteria: 'calm-under-pressure' | 'leadership-potential', language: string): Promise<BrigadeFormationResult> {
        const allStudents = await this.studentService.getAllStudents();
        const availableStudents = allStudents.filter(s => !s.isAbsent);
        
        const { anonymizedData: anonymizedStudents, mapping } = this.anonymizationService.anonymize(availableStudents, allStudents);
        
        const result = await generateSafetyBrigade({ objective, criteria, students: anonymizedStudents, language });

        const deAnonymizedMembers = await Promise.all(result.brigade.members.map(async member => {
            const realName = mapping.get(member.studentAlias);
            if (!realName) return null;
            const student = await this.studentService.getStudentByName(realName);
            return student ? { ...member, studentId: student.id, studentName: student.name } : null;
        }));

        return {
            brigade: {
                ...result.brigade,
                members: deAnonymizedMembers.filter(Boolean) as any,
            }
        };
    }
    
    async suggestRole(committeeId: string, studentId: string, language: string): Promise<{role: string; justification: string;}> {
        const committee = await this.repository.findById(committeeId);
        const student = await this.studentService.getStudentById(studentId);
        if (!committee || !student) {
            throw new Error("Committee or student not found");
        }
        
        const { anonymizedData: anonymizedStudent, mapping } = this.anonymizationService.anonymize(student, [student]);

        return await generateSafetyRoleSuggestion({
            committeeName: committee.name,
            student: anonymizedStudent,
            language,
        })
    }
}
