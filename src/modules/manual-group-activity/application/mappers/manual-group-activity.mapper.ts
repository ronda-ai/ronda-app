
import { ManualGroupActivity } from '../../domain/manual-group-activity.entity';
import { ManualGroupActivityDTO } from '../dtos/manual-group-activity.dto';

export class ManualGroupActivityMapper {
  public static toDTO(
    group: ManualGroupActivity
  ): Omit<ManualGroupActivityDTO, 'members'> {
    return {
      id: group.id,
      memberIds: group.memberIds.map(id => id.toString()),
      skills: group.skills,
      themes: group.themes,
      dynamicAnalysis: group.dynamicAnalysis,
      activities: group.activities,
      createdAt: group.createdAt.toISOString(),
      updatedAt: group.updatedAt.toISOString(),
    };
  }
}
