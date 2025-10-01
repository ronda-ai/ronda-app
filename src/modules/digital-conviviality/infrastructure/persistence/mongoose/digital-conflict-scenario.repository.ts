
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { DigitalConflictScenario } from "../../../domain/digital-conviviality.entity";
import { getDigitalConflictScenarioModel, IDigitalConflictScenarioDocument } from "./digital-conflict-scenario.schema";
import { IDigitalConflictScenarioRepository } from "../../../domain/interfaces/digital-conflict-scenario-repository.interface";
import { GenerateDigitalConflictScenarioOutput } from "@/ai/flows/generate-digital-conflict-scenario";

export class MongooseDigitalConflictScenarioRepository implements IDigitalConflictScenarioRepository {
    
    private toDomain(doc: IDigitalConflictScenarioDocument): DigitalConflictScenario {
        return new DigitalConflictScenario(
            doc._id.toString(),
            doc.title,
            doc.scenario,
            doc.strategies,
            doc.createdAt,
            doc.updatedAt,
            doc.topics
        );
    }

    async create(data: GenerateDigitalConflictScenarioOutput & { topics?: string[] }): Promise<DigitalConflictScenario> {
        await dbConnect();
        const DigitalConflictScenarioModel = getDigitalConflictScenarioModel();
        const newScenario = await DigitalConflictScenarioModel.create(data);
        return this.toDomain(newScenario);
    }

    async findAll(): Promise<DigitalConflictScenario[]> {
        await dbConnect();
        const DigitalConflictScenarioModel = getDigitalConflictScenarioModel();
        const scenarios = await DigitalConflictScenarioModel.find().sort({ createdAt: -1 }).limit(20).exec();
        return scenarios.map(this.toDomain);
    }
    
    async delete(id: string): Promise<void> {
        await dbConnect();
        const DigitalConflictScenarioModel = getDigitalConflictScenarioModel();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await DigitalConflictScenarioModel.findByIdAndDelete(id).exec();
    }
}
