
import { dbConnect } from "@/lib/mongodb";
import { IRelationshipRemediationRepository } from "../../../domain/interfaces/relationship-remediation-repository.interface";
import { CreateRelationshipRemediationDTO } from "../../../application/dtos/create-relationship-remediation.dto";
import { RelationshipRemediation } from "../../../domain/relationship-remediation.entity";
import RelationshipRemediationModel, { IRelationshipRemediationDocument } from "./relationship-remediation.schema";
import mongoose from "mongoose";

export class MongooseRelationshipRemediationRepository implements IRelationshipRemediationRepository {

    private toDomain(doc: IRelationshipRemediationDocument): RelationshipRemediation {
        return new RelationshipRemediation(
            doc._id.toString(),
            doc.studentIds,
            doc.focus,
            doc.strategyTitle,
            doc.steps, // Mongoose subdocuments are converted to plain objects by the mapper
            doc.status,
            doc.createdAt,
            doc.customPrompt,
            doc.feedback,
        );
    }
    
    async create(data: CreateRelationshipRemediationDTO): Promise<RelationshipRemediation> {
        await dbConnect();
        const newRemediation = await RelationshipRemediationModel.create({
            ...data,
            studentIds: data.studentIds.map(id => new mongoose.Types.ObjectId(id)),
        });
        return this.toDomain(newRemediation);
    }

    async findByStudentIds(studentIds: string[]): Promise<RelationshipRemediation[]> {
        await dbConnect();
        if (studentIds.length === 0) return [];
        const objectIds = studentIds.map(id => new mongoose.Types.ObjectId(id));
        const remediations = await RelationshipRemediationModel.find({ studentIds: { $all: objectIds } }).sort({ createdAt: -1 }).exec();
        return remediations.map(this.toDomain);
    }

    async findById(id: string): Promise<RelationshipRemediation | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await RelationshipRemediationModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
    
    async update(id: string, data: Partial<RelationshipRemediation>): Promise<RelationshipRemediation | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;

        const remediationDoc = await RelationshipRemediationModel.findById(id);
        if (!remediationDoc) return null;

        // Apply updates to the document in memory
        Object.assign(remediationDoc, data);

        const updatedDoc = await remediationDoc.save();
        
        return this.toDomain(updatedDoc);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await RelationshipRemediationModel.findByIdAndDelete(id).exec();
    }
}
