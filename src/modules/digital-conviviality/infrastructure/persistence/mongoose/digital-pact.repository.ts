import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { IDigitalPactRepository } from "../../../domain/interfaces/digital-pact-repository.interface";
import { CreateDigitalPactDTO } from "../../../application/dtos/create-digital-pact.dto";
import { DigitalPact } from "../../../domain/digital-conviviality.entity";
import { getDigitalPactModel, IDigitalPactDocument } from "./digital-pact.schema";

export class MongooseDigitalPactRepository implements IDigitalPactRepository {
    
    private toDomain(doc: IDigitalPactDocument): DigitalPact {
        return new DigitalPact(
            doc._id.toString(),
            doc.title,
            doc.principles,
            doc.norms,
            doc.consequences,
            doc.createdAt,
            doc.updatedAt,
            doc.version,
            doc.publishedAt
        );
    }

    async create(data: CreateDigitalPactDTO): Promise<DigitalPact> {
        await dbConnect();
        const DigitalPactModel = getDigitalPactModel();
        const newPact = await DigitalPactModel.create(data);
        return this.toDomain(newPact);
    }

    async findAll(): Promise<DigitalPact[]> {
        await dbConnect();
        const DigitalPactModel = getDigitalPactModel();
        const pacts = await DigitalPactModel.find().sort({ createdAt: -1 }).exec();
        return pacts.map(this.toDomain);
    }

    async findById(id: string): Promise<DigitalPact | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const DigitalPactModel = getDigitalPactModel();
        const pact = await DigitalPactModel.findById(id).exec();
        return pact ? this.toDomain(pact) : null;
    }

    async update(id: string, data: Partial<DigitalPact>): Promise<DigitalPact | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const DigitalPactModel = getDigitalPactModel();
        const updatedPact = await DigitalPactModel.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
        if (!updatedPact) return null;
        return this.toDomain(updatedPact);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        const DigitalPactModel = getDigitalPactModel();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await DigitalPactModel.findByIdAndDelete(id).exec();
    }
}
