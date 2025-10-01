
import { dbConnect } from "@/lib/mongodb";
import { IParticipationRepository } from "../../../domain/interfaces/participation-repository.interface";
import { Participation } from "../../../domain/participation.entity";
import ParticipationModel from "./participation.schema";
import mongoose from "mongoose";

export class MongooseParticipationRepository implements IParticipationRepository {

    async create(studentId: any): Promise<Participation> {
        await dbConnect();
        const newParticipation = await ParticipationModel.create({ studentId });
        return {
            id: newParticipation._id.toString(),
            studentId: newParticipation.studentId.toString(),
            date: newParticipation.date,
        } as Participation;
    }

    async findByStudentId(studentId: any): Promise<Participation[]> {
        await dbConnect();
        const participations = await ParticipationModel.find({ studentId }).exec();
        return participations.map(p => ({
            id: p._id.toString(),
            studentId: p.studentId.toString(),
            date: p.date,
        } as Participation));
    }

    async countByStudentId(studentId: any): Promise<number> {
        await dbConnect();
        return ParticipationModel.countDocuments({ studentId }).exec();
    }

    async delete(id: any): Promise<void> {
        await dbConnect();
        await ParticipationModel.findByIdAndDelete(id).exec();
    }

    async deleteByStudentId(studentId: any): Promise<void> {
        await dbConnect();
        await ParticipationModel.deleteMany({ studentId }).exec();
    }

    async countByDateRange(startDate: Date, endDate: Date, studentIds: string[]): Promise<{ id: string; count: number }[]> {
        await dbConnect();
        const matchStage: any = {
            date: { $gte: startDate, $lte: endDate }
        };

        if (studentIds.length > 0) {
            matchStage.studentId = { $in: studentIds.map(id => new mongoose.Types.ObjectId(id)) };
        }

        const aggregation = await ParticipationModel.aggregate([
            { $match: matchStage },
            { $group: { _id: "$studentId", count: { $sum: 1 } } },
            { 
                $project: { 
                    id: { $toString: "$_id" }, // Ensure the id is a string
                    count: 1, 
                    _id: 0 
                } 
            },
            { $sort: { count: -1 } }
        ]);
        
        return aggregation;
    }
}
