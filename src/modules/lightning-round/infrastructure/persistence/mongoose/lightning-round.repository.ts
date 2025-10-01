
import { dbConnect } from "@/lib/mongodb";
import { ILightningRoundRepository } from "../../../domain/interfaces/lightning-round-repository.interface";
import { CreateLightningRoundDTO } from "../../../application/dtos/create-lightning-round.dto";
import { LightningRound } from "../../../domain/lightning-round.entity";
import LightningRoundModel, { ILightningRoundDocument } from "./lightning-round.schema";
import mongoose from "mongoose";
import { UpdateLightningRoundDTO } from "@/modules/lightning-round/application/dtos/update-lightning-round.dto";

export class MongooseLightningRoundRepository implements ILightningRoundRepository {

    private toDomain(doc: ILightningRoundDocument): LightningRound {
        return new LightningRound(
            doc._id.toString(),
            doc.duration,
            doc.interval,
            doc.category,
            doc.plan.map(p => ({ studentName: p.studentName, challenge: p.challenge })),
            doc.createdAt,
            doc.updatedAt,
            doc.feedback
        );
    }
    
    async create(data: CreateLightningRoundDTO): Promise<LightningRound> {
        await dbConnect();
        const newRound = await LightningRoundModel.create(data);
        return this.toDomain(newRound);
    }

    async findAll(): Promise<LightningRound[]> {
        await dbConnect();
        const rounds = await LightningRoundModel.find().sort({ createdAt: -1 }).limit(20).exec();
        return rounds.map(this.toDomain);
    }

    async update(id: string, data: UpdateLightningRoundDTO): Promise<LightningRound | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const updatedDoc = await LightningRoundModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updatedDoc) return null;
        return this.toDomain(updatedDoc);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await LightningRoundModel.findByIdAndDelete(id).exec();
    }
}
