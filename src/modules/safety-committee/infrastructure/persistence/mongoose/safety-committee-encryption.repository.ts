
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateSafetyCommitteeDTO } from '../../../application/dtos/create-safety-committee.dto';
import { SafetyCommittee, CommitteeMission } from '../../../domain/safety-committee.entity';
import { ISafetyCommitteeRepository } from '../../../domain/interfaces/safety-committee-repository.interface';

export class SafetyCommitteeEncryptionRepository implements ISafetyCommitteeRepository {
  constructor(
    private readonly decoratedRepository: ISafetyCommitteeRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptData(data: CreateSafetyCommitteeDTO): CreateSafetyCommitteeDTO {
    const encryptedData = { ...data };
    if (encryptedData.name) {
      encryptedData.name = this.encryptionService.encrypt(encryptedData.name);
    }
    if (encryptedData.members) {
      encryptedData.members = encryptedData.members.map(m => ({
          ...m,
          role: this.encryptionService.encrypt(m.role)
      }));
    }
    if (encryptedData.missions) {
      encryptedData.missions = encryptedData.missions.map(m => ({
          ...m,
          text: this.encryptionService.encrypt(m.text)
      }));
    }
    return encryptedData;
  }

  private decryptCommittee(committee: SafetyCommittee | null): SafetyCommittee | null {
    if (!committee) return null;
    
    try {
        const decrypt = (text: string) => this.encryptionService.decrypt(text);

        return new SafetyCommittee(
            committee.id,
            decrypt(committee.name),
            committee.members.map(member => ({
                studentId: member.studentId,
                role: decrypt(member.role)
            })),
            (committee.missions || []).map(mission => ({
                text: decrypt(mission.text),
                status: mission.status,
            })),
            committee.createdAt,
            committee.updatedAt
        );
    } catch(e) {
        // Handle unencrypted legacy data
        return committee;
    }
  }

  async create(data: CreateSafetyCommitteeDTO): Promise<SafetyCommittee> {
    const encryptedData = this.encryptData(data);
    const committee = await this.decoratedRepository.create(encryptedData);
    return this.decryptCommittee(committee) as SafetyCommittee;
  }

  async findAll(): Promise<SafetyCommittee[]> {
    const committees = await this.decoratedRepository.findAll();
    return committees.map(c => this.decryptCommittee(c) as SafetyCommittee);
  }

  async findById(id: string): Promise<SafetyCommittee | null> {
    const committee = await this.decoratedRepository.findById(id);
    return this.decryptCommittee(committee);
  }

  async addMember(committeeId: string, studentId: string, role: string): Promise<SafetyCommittee | null> {
    const encryptedRole = this.encryptionService.encrypt(role);
    const committee = await this.decoratedRepository.addMember(committeeId, studentId, encryptedRole);
    return this.decryptCommittee(committee);
  }
  
  async removeMember(committeeId: string, studentId: string): Promise<SafetyCommittee | null> {
      const committee = await this.decoratedRepository.removeMember(committeeId, studentId);
      return this.decryptCommittee(committee);
  }
  
  async addMission(committeeId: string, mission: CommitteeMission): Promise<SafetyCommittee | null> {
      const encryptedMission = { ...mission, text: this.encryptionService.encrypt(mission.text) };
      const committee = await this.decoratedRepository.addMission(committeeId, encryptedMission);
      return this.decryptCommittee(committee);
  }

  async toggleMissionStatus(committeeId: string, missionIndex: number, newStatus: "pending" | "completed"): Promise<SafetyCommittee | null> {
      const committee = await this.decoratedRepository.toggleMissionStatus(committeeId, missionIndex, newStatus);
      return this.decryptCommittee(committee);
  }

  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
