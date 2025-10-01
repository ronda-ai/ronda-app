
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreatePblProjectDTO } from '../../../application/dtos/create-pbl.dto';
import { PblProject, Team, TeamFormation } from '../../../domain/pbl.entity';
import { IPblRepository, ITeamFormationRepository } from '../../../domain/interfaces/pbl-repository.interface';
import { CreateTeamFormationDTO } from '../../../application/dtos/pbl-team-formation.dto';

export class PblProjectEncryptionRepository implements IPblRepository {
  constructor(
    private readonly decoratedRepository: IPblRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

    private encryptData(data: Partial<CreatePblProjectDTO>): any {
        const encryptedData = { ...data };
        if (encryptedData.topic) encryptedData.topic = this.encryptionService.encrypt(encryptedData.topic);
        if (encryptedData.skills) encryptedData.skills = encryptedData.skills.map(s => this.encryptionService.encrypt(s));
        if (encryptedData.duration) encryptedData.duration = this.encryptionService.encrypt(encryptedData.duration);
        if (encryptedData.essentialQuestion) encryptedData.essentialQuestion = this.encryptionService.encrypt(encryptedData.essentialQuestion);
        if (encryptedData.phases) encryptedData.phases = this.encryptionService.encrypt(encryptedData.phases);
        if (encryptedData.milestones) encryptedData.milestones = this.encryptionService.encrypt(encryptedData.milestones);
        if (encryptedData.finalProductSuggestion) encryptedData.finalProductSuggestion = this.encryptionService.encrypt(encryptedData.finalProductSuggestion);
        if (encryptedData.ageOrGrade) encryptedData.ageOrGrade = this.encryptionService.encrypt(encryptedData.ageOrGrade);
        return encryptedData;
    }

    private decryptProject(project: PblProject | null): PblProject | null {
        if (!project) return null;
        try {
            return new PblProject(
                project.id,
                this.encryptionService.decrypt(project.topic),
                project.skills.map(s => this.encryptionService.decrypt(s)),
                this.encryptionService.decrypt(project.duration),
                this.encryptionService.decrypt(project.essentialQuestion),
                this.encryptionService.decrypt(project.phases),
                this.encryptionService.decrypt(project.milestones),
                this.encryptionService.decrypt(project.finalProductSuggestion),
                project.createdAt,
                project.updatedAt,
                project.ageOrGrade ? this.encryptionService.decrypt(project.ageOrGrade) : undefined
            );
        } catch (e) {
            return project;
        }
    }


  async create(data: CreatePblProjectDTO): Promise<PblProject> {
    const encryptedData = this.encryptData(data);
    const project = await this.decoratedRepository.create(encryptedData);
    return this.decryptProject(project) as PblProject;
  }

  async findAll(): Promise<PblProject[]> {
    const projects = await this.decoratedRepository.findAll();
    return projects.map(p => this.decryptProject(p) as PblProject);
  }

  async findById(id: string): Promise<PblProject | null> {
    const project = await this.decoratedRepository.findById(id);
    return this.decryptProject(project);
  }

  async delete(id: string): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}


export class TeamFormationEncryptionRepository implements ITeamFormationRepository {
    constructor(
        private readonly decoratedRepository: ITeamFormationRepository,
        private readonly encryptionService: IEncryptionService
    ) {}

    private encryptTeam(team: Team): Team {
        return {
            ...team,
            teamName: this.encryptionService.encrypt(team.teamName),
            rationale: this.encryptionService.encrypt(team.rationale),
            members: team.members.map(member => ({
                ...member,
                name: this.encryptionService.encrypt(member.name),
                role: this.encryptionService.encrypt(member.role),
                justification: this.encryptionService.encrypt(member.justification),
            }))
        };
    }

    private decryptTeamFormation(formation: TeamFormation | null): TeamFormation | null {
        if (!formation) return null;
        try {
            return new TeamFormation(
                formation.id,
                formation.projectId,
                formation.criteria, // Criteria is not encrypted
                formation.teams.map(team => ({
                    ...team,
                    teamName: this.encryptionService.decrypt(team.teamName),
                    rationale: this.encryptionService.decrypt(team.rationale),
                    members: team.members.map(member => ({
                        ...member,
                        name: this.encryptionService.decrypt(member.name),
                        role: this.encryptionService.decrypt(member.role),
                        justification: this.encryptionService.decrypt(member.justification),
                    }))
                })),
                formation.createdAt,
                formation.updatedAt
            );
        } catch (e) {
            return formation;
        }
    }

    async create(data: CreateTeamFormationDTO): Promise<TeamFormation> {
        const encryptedData = {
            ...data,
            // Do not encrypt criteria, as it's an enum
            teams: data.teams.map(this.encryptTeam.bind(this)),
        };
        const formation = await this.decoratedRepository.create(encryptedData);
        return this.decryptTeamFormation(formation) as TeamFormation;
    }

    async findAll(): Promise<TeamFormation[]> {
        const formations = await this.decoratedRepository.findAll();
        return formations.map(f => this.decryptTeamFormation(f) as TeamFormation);
    }
    
    async findByProjectId(projectId: string): Promise<TeamFormation[]> {
        const formations = await this.decoratedRepository.findByProjectId(projectId);
        return formations.map(f => this.decryptTeamFormation(f) as TeamFormation);
    }
    
    async delete(id: string): Promise<void> {
        return this.decoratedRepository.delete(id);
    }
}
