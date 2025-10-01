
import { IStudentService } from '@/modules/student/domain/interfaces/student-service.interface';
import { IManualGroupActivityRepository } from '../domain/interfaces/manual-group-activity-repository.interface';
import { IManualGroupActivityService } from '../domain/interfaces/manual-group-activity-service.interface';
import { ManualGroupActivityDTO } from './dtos/manual-group-activity.dto';
import { ManualGroupActivityMapper } from './mappers/manual-group-activity.mapper';
import { CreateManualGroupActivityDTO } from './dtos/create-manual-group-activity.dto';
import { UpdateManualGroupActivityDTO } from './dtos/update-manual-group-activity.dto';
import { generateGroupCurriculumActivities } from '@/ai/flows/generate-group-curriculum-activities';
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';
import { IAIConfigurationService } from '@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface';

export class ManualGroupActivityService implements IManualGroupActivityService {
  constructor(
    private readonly repository: IManualGroupActivityRepository,
    private readonly studentService: IStudentService,
    private readonly anonymizationService: IAnonymizationService,
    private readonly aiConfigService: IAIConfigurationService,
  ) {}

  private async populateMembers(
    group: any
  ): Promise<ManualGroupActivityDTO> {
    const members = await Promise.all(
      group.memberIds.map((id: string) => this.studentService.getStudentById(id))
    );
    const dto = ManualGroupActivityMapper.toDTO(group);
    return {
      ...dto,
      members: members.filter(Boolean) as any,
    };
  }

  async createManualGroupActivity(
    dto: CreateManualGroupActivityDTO
  ): Promise<ManualGroupActivityDTO> {
    const newGroup = await this.repository.create(dto);
    return this.populateMembers(newGroup);
  }

  async getAllManualGroupActivities(): Promise<ManualGroupActivityDTO[]> {
    const groups = await this.repository.findAll();
    return Promise.all(groups.map(group => this.populateMembers(group)));
  }

  async updateManualGroupActivity(
    id: string,
    dto: UpdateManualGroupActivityDTO
  ): Promise<ManualGroupActivityDTO | null> {
    const updatedGroup = await this.repository.update(id, dto);
    if (!updatedGroup) return null;
    return this.populateMembers(updatedGroup);
  }

  async deleteManualGroupActivity(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async generateActivitiesForGroup(groupId: string, language: string): Promise<ManualGroupActivityDTO | null> {
    const group = await this.repository.findById(groupId);
    if (!group) {
        throw new Error("Group not found");
    }

    const members = await Promise.all(group.memberIds.map(id => this.studentService.getStudentById(id.toString())));
    const validMembers = members.filter(Boolean) as any[];

    if (validMembers.length === 0) {
        throw new Error("No valid members found for the group");
    }

    const { anonymizedData: anonymizedStudents } = this.anonymizationService.anonymize(validMembers, validMembers);
    const aiConfig = await this.aiConfigService.getConfiguration();
    
    const result = await generateGroupCurriculumActivities({
        topic: `Collaborative activity for ${validMembers.map((m: any) => m.name).join(', ')}`,
        skills: group.skills || [],
        language,
        students: anonymizedStudents,
        ageOrGrade: aiConfig?.ageOrGrade,
        classInterests: group.themes,
    });
    
    return this.updateManualGroupActivity(groupId, {
      activities: result.activities,
    });
  }
}
