

import { PblProjectDTO } from "../../application/dtos/pbl.dto";
import { ScaffoldingSuggestion } from '../../application/dtos/pbl-scaffolding.dto';
import { TeamFormationResult, TeamFormationWithId } from '../../application/dtos/pbl-team-formation.dto';
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";

export interface IPblService {
    generateAndCreateProject(input: {
        topic: string;
        skills: string[];
        duration: string;
        language: string;
    }): Promise<PblProjectDTO>;

    generateAndSaveTeams(input: {
        projectId: string;
        teamSize: number;
        criteria: 'balanced' | 'social-remediation' | 'synergy';
        language: string;
    }): Promise<TeamFormationWithId>;
    
    getTeamFormationsForProject(projectId: string): Promise<TeamFormationWithId[]>;
    deleteTeamFormation(id: string): Promise<void>;

    generateScaffolding(input: {
        team: StudentDTO[];
        problem: string;
        language: string;
    }): Promise<ScaffoldingSuggestion>;
    
    getAllProjects(): Promise<PblProjectDTO[]>;
    getProjectById(id: string): Promise<PblProjectDTO | null>;
    deleteProject(id: string): Promise<void>;
}
