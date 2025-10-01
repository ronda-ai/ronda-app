
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { SafetyProtocol } from "../../../domain/educational-safety.entity";
import SafetyProtocolModel, { ISafetyProtocolDocument } from "./safety-protocol.schema";
import { ISafetyProtocolRepository } from "../../../domain/interfaces/safety-protocol-repository.interface";

export class MongooseSafetyProtocolRepository implements ISafetyProtocolRepository {
    
    private toDomain(doc: ISafetyProtocolDocument): SafetyProtocol {
        return new SafetyProtocol(
            doc._id.toString(),
            doc.risk,
            doc.title,
            doc.beforeSteps.map(s => ({ text: s.text, assignedBrigadeId: s.assignedBrigadeId, assignedBrigadeName: s.assignedBrigadeName })),
            doc.duringSteps.map(s => ({ text: s.text, assignedBrigadeId: s.assignedBrigadeId, assignedBrigadeName: s.assignedBrigadeName })),
            doc.afterSteps.map(s => ({ text: s.text, assignedBrigadeId: s.assignedBrigadeId, assignedBrigadeName: s.assignedBrigadeName })),
            doc.createdAt,
            doc.updatedAt
        );
    }

    async create(data: Omit<SafetyProtocol, "id" | "createdAt" | "updatedAt">): Promise<SafetyProtocol> {
        await dbConnect();
        const newProtocol = await SafetyProtocolModel.create(data);
        return this.toDomain(newProtocol);
    }

    async findAll(): Promise<SafetyProtocol[]> {
        await dbConnect();
        const protocols = await SafetyProtocolModel.find().sort({ createdAt: -1 }).exec();
        return protocols.map(this.toDomain);
    }

     async findById(id: string): Promise<SafetyProtocol | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const protocol = await SafetyProtocolModel.findById(id).exec();
        return protocol ? this.toDomain(protocol) : null;
    }
    
    async update(id: string, data: Partial<SafetyProtocol>): Promise<SafetyProtocol | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const updatedProtocol = await SafetyProtocolModel.findByIdAndUpdate(id, data, { new: true }).exec();
        return updatedProtocol ? this.toDomain(updatedProtocol) : null;
    }
    
    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await SafetyProtocolModel.findByIdAndDelete(id).exec();
    }
}
