
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";
import { PblProjectDTO } from "./dtos/pbl.dto";
import { IPblRepository, ITeamFormationRepository } from "../domain/interfaces/pbl-repository.interface";
import { IPblService } from "../domain/interfaces/pbl-service.interface";
import { generatePblProject } from "@/ai/flows/generate-pbl-project";
import { generatePblTeams } from "@/ai/flows/generate-pbl-teams";
import { PblProjectMapper } from "./mappers/pbl.mapper";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";
import { TeamFormationResult, TeamFormationWithId } from './dtos/pbl-team-formation.dto';
import { generatePblScaffolding } from "@/ai/flows/generate-pbl-scaffolding";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { ScaffoldingSuggestion } from './dtos/pbl-scaffolding.dto';
import { TeamFormationMapper } from './mappers/team-formation.mapper';

export class PblService implements IPblService {
    constructor(
        private readonly projectRepository: IPblRepository,
        private readonly teamFormationRepository: ITeamFormationRepository,
        private readonly aiConfigService: IAIConfigurationService,
        private readonly studentService: IStudentService,
        private readonly anonymizationService: IAnonymizationService,
    ) {}

    async generateAndCreateProject(input: {
        topic: string;
        skills: string[];
        duration: string;
        language: string;
    }): Promise<PblProjectDTO> {
        const aiConfig = await this.aiConfigService.getConfiguration();
        
        const result = await generatePblProject({
            ...input,
            ageOrGrade: aiConfig?.ageOrGrade,
            subject: aiConfig?.subject,
        });
        
        const newProject = await this.projectRepository.create({
            ...input,
            ...result,
            ageOrGrade: aiConfig?.ageOrGrade,
        });

        return PblProjectMapper.toDTO(newProject);
    }
    
    async generateAndSaveTeams(input: {
        projectId: string;
        teamSize: number;
        criteria: 'balanced' | 'social-remediation' | 'synergy';
        language: string;
    }): Promise<TeamFormationWithId> {
        const project = await this.projectRepository.findById(input.projectId);
        if (!project) {
            throw new Error("Project not found");
        }
        
        const allStudents = await this.studentService.getAllStudents();
        const availableStudents = allStudents.filter(s => !s.isAbsent);
        
        const { anonymizedData: anonymizedStudents, mapping } = this.anonymizationService.anonymize(availableStudents, allStudents);

        const aiInput = {
            projectTopic: project.topic,
            projectSkills: project.skills,
            teamSize: input.teamSize,
            criteria: input.criteria,
            students: anonymizedStudents,
            language: input.language,
            ageOrGrade: project.ageOrGrade,
        };

        const result = await generatePblTeams(aiInput);
        
        // De-anonymize the results and get student IDs
        const deAnonymizedTeams = await Promise.all(result.teams.map(async team => {
            const finalMembers = await Promise.all(team.members.map(async member => {
                const realName = mapping.get(member.name) || member.name;
                const student = realName ? await this.studentService.getStudentByName(realName) : null;
                return {
                    studentId: student?.id || 'unknown',
                    name: this.anonymizationService.deAnonymizeText(member.name, mapping),
                    role: this.anonymizationService.deAnonymizeText(member.role, mapping),
                    justification: this.anonymizationService.deAnonymizeText(member.justification, mapping)
                };
            }));
            
            return {
                teamName: this.anonymizationService.deAnonymizeText(team.teamName, mapping),
                members: finalMembers,
                rationale: this.anonymizationService.deAnonymizeText(team.rationale, mapping),
            };
        }));
        
        const savedFormation = await this.teamFormationRepository.create({
            projectId: input.projectId,
            criteria: input.criteria,
            teams: deAnonymizedTeams,
        });

        return TeamFormationMapper.toDTO(savedFormation);
    }
    
    async getTeamFormationsForProject(projectId: string): Promise<TeamFormationWithId[]> {
        const formations = await this.teamFormationRepository.findByProjectId(projectId);
        return formations.map(TeamFormationMapper.toDTO);
    }

    async deleteTeamFormation(id: string): Promise<void> {
        await this.teamFormationRepository.delete(id);
    }
    
    async generateScaffolding(input: { team: StudentDTO[]; problem: string; language: string; }): Promise<ScaffoldingSuggestion> {
        const { anonymizedData: anonymizedTeam, mapping } = this.anonymizationService.anonymize(input.team, input.team);

        const result = await generatePblScaffolding({
            team: anonymizedTeam,
            problem: input.problem,
            language: input.language
        });

        return {
            microActivity: this.anonymizationService.deAnonymizeText(result.microActivity, mapping),
            guidingQuestions: this.anonymizationService.deAnonymizeText(result.guidingQuestions, mapping),
        };
    }

    async getAllProjects(): Promise<PblProjectDTO[]> {
        const projects = await this.projectRepository.findAll();
        return projects.map(PblProjectMapper.toDTO);
    }
    
    async getProjectById(id: string): Promise<PblProjectDTO | null> {
        const project = await this.projectRepository.findById(id);
        return project ? PblProjectMapper.toDTO(project) : null;
    }
    
    async deleteProject(id: string): Promise<void> {
        await this.projectRepository.delete(id);
    }
}
