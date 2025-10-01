
import { dbConnect } from "@/lib/mongodb";
import { IRiddleBattleRepository } from "../../../domain/interfaces/riddle-battle-repository.interface";
import { CreateRiddleBattleDTO } from "../../../application/dtos/create-riddle-battle.dto";
import { RiddleBattle } from "../../../domain/riddle-battle.entity";
import RiddleBattleModel, { IRiddleBattleDocument } from "./riddle-battle.schema";
import mongoose from "mongoose";
import { UpdateRiddleBattleDTO } from "@/modules/riddle-battle/application/dtos/update-riddle-battle.dto";

export class MongooseRiddleBattleRepository implements IRiddleBattleRepository {

    private toDomain(doc: IRiddleBattleDocument): RiddleBattle {
        return new RiddleBattle(
            doc._id.toString(),
            doc.teamBlueRiddle,
            doc.teamBlueAnswer,
            doc.teamRedRiddle,
            doc.teamRedAnswer,
            doc.createdAt,
            doc.updatedAt,
            doc.topic,
            doc.winner,
            doc.feedback,
            doc.mood
        );
    }
    
    async create(data: CreateRiddleBattleDTO): Promise<RiddleBattle> {
        await dbConnect();
        const newBattle = await RiddleBattleModel.create(data);
        return this.toDomain(newBattle);
    }

    async findAll(): Promise<RiddleBattle[]> {
        await dbConnect();
        const battles = await RiddleBattleModel.find().sort({ createdAt: -1 }).limit(10).exec();
        return battles.map(this.toDomain);
    }

    async update(id: string, data: UpdateRiddleBattleDTO): Promise<RiddleBattle | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const updatedDoc = await RiddleBattleModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updatedDoc) return null;
        return this.toDomain(updatedDoc);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await RiddleBattleModel.findByIdAndDelete(id).exec();
    }
}
