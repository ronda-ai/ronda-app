
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { IChallengeRepository } from "../../../domain/interfaces/challenge-repository.interface";
import ChallengeModel, { IChallengeDocument } from "./challenge.schema";
import { Challenge } from "@/modules/challenge/domain/challenge.entity";
import { CreateChallengeDTO } from "@/modules/challenge/application/dtos/create-challenge.dto";
import { UpdateChallengeDTO } from "@/modules/challenge/application/dtos/update-challenge.dto";


export class MongooseChallengeRepository implements IChallengeRepository {

    private toDomain(doc: IChallengeDocument): Challenge {
        return new Challenge(
            doc._id.toString(),
            doc.studentId,
            doc.challenge,
            doc.tip,
            doc.createdAt,
            doc.status,
            doc.rating,
            doc.feedback,
            doc.attempts,
            doc.aiConfiguration,
            doc.mood,
            doc.selectionMode,
        );
    }
    
    async create(data: CreateChallengeDTO): Promise<Challenge> {
        await dbConnect();
        const newChallenge = await ChallengeModel.create({
            ...data,
            studentId: new mongoose.Types.ObjectId(data.studentId)
        });
        return this.toDomain(newChallenge);
    }
    
    async findAll(): Promise<Challenge[]> {
        await dbConnect();
        const challenges = await ChallengeModel.find().sort({ createdAt: -1 }).exec();
        return challenges.map(this.toDomain);
    }

    async findByStudentId(studentId: string): Promise<Challenge[]> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(studentId)) return [];
        const challenges = await ChallengeModel.find({ studentId: new mongoose.Types.ObjectId(studentId) }).sort({ createdAt: -1 }).exec();
        return challenges.map(this.toDomain);
    }
    
    async update(id: string, data: UpdateChallengeDTO): Promise<Challenge | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const updatedDoc = await ChallengeModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updatedDoc) return null;
        return this.toDomain(updatedDoc);
    }

    async deleteByStudentId(studentId: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(studentId)) return;
        await ChallengeModel.deleteMany({ studentId: new mongoose.Types.ObjectId(studentId) }).exec();
    }
}
