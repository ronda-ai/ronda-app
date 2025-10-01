

import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { IPblRepository, ITeamFormationRepository } from "../../../domain/interfaces/pbl-repository.interface";
import { CreatePblProjectDTO } from "../../../application/dtos/create-pbl.dto";
import { PblProject, TeamFormation } from "../../../domain/pbl.entity";
import PblProjectModel, { IPblProjectDocument } from "./pbl.schema";
import TeamFormationModel, { ITeamFormationDocument } from "./team-formation.schema";
import { CreateTeamFormationDTO } from "@/modules/pbl/application/dtos/pbl-team-formation.dto";

export class MongoosePblRepository implements IPblRepository {
    
    private toDomain(doc: IPblProjectDocument): PblProject {
        return new PblProject(
            doc._id.toString(),
            doc.topic,
            doc.skills,
            doc.duration,
            doc.essentialQuestion,
            doc.phases,
            doc.milestones,
            doc.finalProductSuggestion,
            doc.createdAt,
            doc.updatedAt,
            doc.ageOrGrade
        );
    }

    async create(data: CreatePblProjectDTO): Promise<PblProject> {
        await dbConnect();
        const newProject = await PblProjectModel.create(data);
        return this.toDomain(newProject);
    }
    
    async findAll(): Promise<PblProject[]> {
        await dbConnect();
        const projects = await PblProjectModel.find().sort({ createdAt: -1 }).limit(50).exec();
        return projects.map(this.toDomain);
    }
    
    async findById(id: string): Promise<PblProject | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const project = await PblProjectModel.findById(id).exec();
        return project ? this.toDomain(project) : null;
    }
    
    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await PblProjectModel.findByIdAndDelete(id).exec();
    }
}

export class MongooseTeamFormationRepository implements ITeamFormationRepository {
    private toDomain(doc: ITeamFormationDocument): TeamFormation {
        return new TeamFormation(
            doc._id.toString(),
            doc.projectId,
            doc.criteria,
            doc.teams,
            doc.createdAt,
            doc.updatedAt
        );
    }
    
    async findAll(): Promise<TeamFormation[]> {
        await dbConnect();
        const formations = await TeamFormationModel.find().sort({ createdAt: -1 }).exec();
        return formations.map(this.toDomain);
    }

    async create(data: CreateTeamFormationDTO): Promise<TeamFormation> {
        await dbConnect();
        const newFormation = await TeamFormationModel.create({
            ...data,
            projectId: new mongoose.Types.ObjectId(data.projectId)
        });
        return this.toDomain(newFormation);
    }

    async findByProjectId(projectId: string): Promise<TeamFormation[]> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(projectId)) return [];
        const formations = await TeamFormationModel.find({ projectId: new mongoose.Types.ObjectId(projectId) }).sort({ createdAt: -1 }).exec();
        return formations.map(this.toDomain);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await TeamFormationModel.findByIdAndDelete(id).exec();
    }
}
