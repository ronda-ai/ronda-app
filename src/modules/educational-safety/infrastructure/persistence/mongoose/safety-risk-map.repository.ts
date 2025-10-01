

import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { SafetyRiskMap } from "../../../domain/educational-safety.entity";
import SafetyRiskMapModel, { ISafetyRiskMapDocument } from "./safety-risk-map.schema";
import { ISafetyRiskMapRepository } from "../../../domain/interfaces/safety-risk-map-repository.interface";

export class MongooseSafetyRiskMapRepository implements ISafetyRiskMapRepository {
    
    private toDomain(doc: ISafetyRiskMapDocument): SafetyRiskMap {
        return new SafetyRiskMap(
            doc._id.toString(),
            doc.locationContext,
            doc.infrastructureContext,
            doc.socialContext,
            doc.analysisDepth,
            doc.title,
            doc.riskMap,
            doc.createdAt,
            doc.updatedAt
        );
    }

    async create(data: Omit<SafetyRiskMap, "id" | "createdAt" | "updatedAt">): Promise<SafetyRiskMap> {
        await dbConnect();
        const newMap = await SafetyRiskMapModel.create(data);
        return this.toDomain(newMap);
    }

    async findAll(): Promise<SafetyRiskMap[]> {
        await dbConnect();
        const maps = await SafetyRiskMapModel.find().sort({ createdAt: -1 }).exec();
        return maps.map(this.toDomain);
    }
    
    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await SafetyRiskMapModel.findByIdAndDelete(id).exec();
    }
}

    
