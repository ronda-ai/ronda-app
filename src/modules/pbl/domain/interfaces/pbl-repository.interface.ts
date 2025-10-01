

import { CreatePblProjectDTO } from "../../application/dtos/create-pbl.dto";
import { PblProject, TeamFormation } from "../pbl.entity";
import { CreateTeamFormationDTO } from '../../application/dtos/pbl-team-formation.dto';

export interface IPblRepository {
    create(data: CreatePblProjectDTO): Promise<PblProject>;
    findAll(): Promise<PblProject[]>;
    findById(id: string): Promise<PblProject | null>;
    delete(id: string): Promise<void>;
}
    
export interface ITeamFormationRepository {
    create(data: CreateTeamFormationDTO): Promise<TeamFormation>;
    findAll(): Promise<TeamFormation[]>;
    findByProjectId(projectId: string): Promise<TeamFormation[]>;
    delete(id: string): Promise<void>;
}
