
import { dbConnect } from "@/lib/mongodb";
import { IDebateRepository } from "../../../domain/interfaces/debate-repository.interface";
import { CreateDebateDTO } from "../../../application/dtos/create-debate.dto";
import { Debate } from "../../../domain/debate.entity";
import DebateModel, { IDebateDocument } from "./debate.schema";
import mongoose from "mongoose";
import { DebateDTO } from "@/modules/debate/application/dtos/debate.dto";

export class MongooseDebateRepository implements IDebateRepository {

    private toDomain(doc: IDebateDocument): Debate {
        return new Debate(
            doc._id.toString(),
            doc.topic,
            doc.complexity,
            doc.affirmativeStance,
            doc.negativeStance,
            doc.guidingQuestions,
            doc.rules,
            doc.turnStructure,
            doc.createdAt,
            doc.updatedAt,
            doc.status,
            doc.liveId,
            doc.teams,
            doc.currentTurnIndex,
            doc.turnStartedAt,
            doc.isPaused,
            doc.pausedAt,
            doc.accumulatedPauseTime
        );
    }
    
    async create(data: CreateDebateDTO): Promise<Debate> {
        await dbConnect();
        const newDebate = await DebateModel.create(data);
        return this.toDomain(newDebate);
    }

    async findAll(): Promise<Debate[]> {
        await dbConnect();
        const debates = await DebateModel.find().sort({ createdAt: -1 }).limit(20).exec();
        return debates.map(this.toDomain);
    }
    
    async findById(id: string): Promise<Debate | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const debate = await DebateModel.findById(id).exec();
        return debate ? this.toDomain(debate) : null;
    }

    async findByLiveId(liveId: string): Promise<Debate | null> {
        await dbConnect();
        const debate = await DebateModel.findOne({ liveId }).exec();
        return debate ? this.toDomain(debate) : null;
    }

    async update(id: string, data: Partial<DebateDTO>): Promise<Debate | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const updatedDebate = await DebateModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updatedDebate) return null;
        return this.toDomain(updatedDebate);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await DebateModel.findByIdAndDelete(id).exec();
    }
}
