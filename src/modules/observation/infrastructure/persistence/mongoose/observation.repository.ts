
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { IObservationRepository } from "../../../domain/interfaces/observation-repository.interface";
import { CreateObservationDTO } from "../../../application/dtos/create-observation.dto";
import ObservationModel, { IObservationDocument } from "./observation.schema";
import { Observation } from "../../../domain/observation.entity";

export class MongooseObservationRepository implements IObservationRepository {

    private toDomain(doc: IObservationDocument): Observation {
        return new Observation(
            doc._id.toString(),
            doc.studentId,
            doc.observation,
            doc.type,
            doc.tags,
            doc.createdAt,
            doc.deepeningQuestion
        );
    }

    async create(data: CreateObservationDTO): Promise<Observation> {
        await dbConnect();
        const newObservation = await ObservationModel.create({
            ...data,
            studentId: new mongoose.Types.ObjectId(data.studentId)
        });
        return this.toDomain(newObservation);
    }

    async findByStudentId(studentId: string): Promise<Observation[]> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(studentId)) return [];
        const observations = await ObservationModel.find({ studentId: new mongoose.Types.ObjectId(studentId) }).sort({ createdAt: -1 }).exec();
        return observations.map(this.toDomain);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await ObservationModel.findByIdAndDelete(id).exec();
    }
}
