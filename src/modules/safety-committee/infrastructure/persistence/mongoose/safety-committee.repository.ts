
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { ISafetyCommitteeRepository } from "../../../domain/interfaces/safety-committee-repository.interface";
import { CreateSafetyCommitteeDTO } from "../../../application/dtos/create-safety-committee.dto";
import { SafetyCommittee, CommitteeMission } from "../../../domain/safety-committee.entity";
import SafetyCommitteeModel, { ISafetyCommitteeDocument } from "./safety-committee.schema";

export class MongooseSafetyCommitteeRepository implements ISafetyCommitteeRepository {
    
    private toDomain(doc: ISafetyCommitteeDocument): SafetyCommittee {
        return new SafetyCommittee(
            doc._id.toString(),
            doc.name,
            doc.members,
            doc.missions,
            doc.createdAt,
            doc.updatedAt
        );
    }
    
    async create(data: CreateSafetyCommitteeDTO): Promise<SafetyCommittee> {
        await dbConnect();
        const committee = new SafetyCommitteeModel({
            name: data.name,
            members: data.members ? data.members.map(m => ({
                studentId: new mongoose.Types.ObjectId(m.studentId),
                role: m.role,
            })) : [],
            missions: data.missions || [],
        });
        await committee.save();
        return this.toDomain(committee);
    }

    async findAll(): Promise<SafetyCommittee[]> {
        await dbConnect();
        const committees = await SafetyCommitteeModel.find().sort({ name: 1 }).exec();
        return committees.map(this.toDomain);
    }

    async findById(id: string): Promise<SafetyCommittee | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const committee = await SafetyCommitteeModel.findById(id).exec();
        return committee ? this.toDomain(committee) : null;
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await SafetyCommitteeModel.findByIdAndDelete(id).exec();
    }
    
    async addMember(committeeId: string, studentId: string, role: string): Promise<SafetyCommittee | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(committeeId) || !mongoose.Types.ObjectId.isValid(studentId)) return null;
        const committee = await SafetyCommitteeModel.findByIdAndUpdate(
            committeeId,
            { $addToSet: { members: { studentId: new mongoose.Types.ObjectId(studentId), role } } },
            { new: true }
        ).exec();
        return committee ? this.toDomain(committee) : null;
    }

    async removeMember(committeeId: string, studentId: string): Promise<SafetyCommittee | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(committeeId) || !mongoose.Types.ObjectId.isValid(studentId)) return null;
        const committee = await SafetyCommitteeModel.findByIdAndUpdate(
            committeeId,
            { $pull: { members: { studentId: new mongoose.Types.ObjectId(studentId) } } },
            { new: true }
        ).exec();
        return committee ? this.toDomain(committee) : null;
    }

    async addMission(committeeId: string, mission: CommitteeMission): Promise<SafetyCommittee | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(committeeId)) return null;
        const committee = await SafetyCommitteeModel.findByIdAndUpdate(
            committeeId,
            { $push: { missions: mission } },
            { new: true }
        ).exec();
        return committee ? this.toDomain(committee) : null;
    }

    async toggleMissionStatus(committeeId: string, missionIndex: number, newStatus: "pending" | "completed"): Promise<SafetyCommittee | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(committeeId)) return null;
        const updateField = `missions.${missionIndex}.status`;
        const committee = await SafetyCommitteeModel.findByIdAndUpdate(
            committeeId,
            { $set: { [updateField]: newStatus } },
            { new: true }
        ).exec();
        return committee ? this.toDomain(committee) : null;
    }
}
