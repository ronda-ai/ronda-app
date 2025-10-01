
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { CrisisScenario } from "../../../domain/educational-safety.entity";
import CrisisScenarioModel, { ICrisisScenarioDocument } from "./crisis-scenario.schema";
import { ICrisisScenarioRepository } from "../../../domain/interfaces/crisis-scenario-repository.interface";

export class MongooseCrisisScenarioRepository implements ICrisisScenarioRepository {
    
    private toDomain(doc: ICrisisScenarioDocument): CrisisScenario {
        return new CrisisScenario(
            doc._id.toString(),
            doc.crisisType,
            doc.initialScenario,
            doc.createdAt,
            doc.updatedAt,
            doc.simulationLength,
            doc.studentIds?.map(id => id.toString()),
            doc.students
        );
    }

    async create(data: Omit<CrisisScenario, 'id' | 'createdAt' | 'updatedAt'>): Promise<CrisisScenario> {
        await dbConnect();
        const newScenario = await CrisisScenarioModel.create(data);
        return this.toDomain(newScenario);
    }

    async findAll(): Promise<CrisisScenario[]> {
        await dbConnect();
        const scenarios = await CrisisScenarioModel.find().populate('students').sort({ createdAt: -1 }).exec();
        return scenarios.map(this.toDomain);
    }

    async findById(id: string): Promise<CrisisScenario | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const scenario = await CrisisScenarioModel.findById(id).populate('students').exec();
        return scenario ? this.toDomain(scenario) : null;
    }
    
    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await CrisisScenarioModel.findByIdAndDelete(id).exec();
    }
}
