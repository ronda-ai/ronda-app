
import { TeamFormation } from '../../domain/pbl.entity';
import { TeamFormationWithId } from '../dtos/pbl-team-formation.dto';

export class TeamFormationMapper {
    public static toDTO(formation: TeamFormation): TeamFormationWithId {
        return {
            id: formation.id,
            projectId: formation.projectId.toString(),
            criteria: formation.criteria,
            teams: formation.teams.map(team => ({
                teamName: team.teamName,
                rationale: team.rationale,
                members: team.members.map(member => ({
                    studentId: member.studentId,
                    name: member.name,
                    role: member.role,
                    justification: member.justification,
                })),
            })),
            createdAt: formation.createdAt.toISOString(),
        };
    }
}
