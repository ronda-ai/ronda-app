

import { dbConnect } from "@/lib/mongodb";
import { IIndividualRelationshipStrategyRepository } from "../../../domain/interfaces/individual-relationship-strategy-repository.interface";
import { CreateIndividualRelationshipStrategyDTO } from "../../../application/dtos/create-individual-relationship-strategy.dto";
import { IndividualRelationshipStrategy, StrategyStep } from "../../../domain/individual-relationship-strategy.entity";
import IndividualRelationshipStrategyModel, { IIndividualRelationshipStrategyDocument } from "./individual-relationship-strategy.schema";
import mongoose from "mongoose";

export class MongooseIndividualRelationshipStrategyRepository implements IIndividualRelationshipStrategyRepository {

    private toDomain(doc: IIndividualRelationshipStrategyDocument): IndividualRelationshipStrategy {
        return new IndividualRelationshipStrategy(
            doc._id.toString(),
            doc.studentId,
            doc.title,
            doc.rationale,
            doc.steps,
            doc.focus,
            doc.status,
            doc.createdAt,
            doc.updatedAt,
            doc.customPrompt,
            doc.feedback
        );
    }
    
    async create(data: CreateIndividualRelationshipStrategyDTO): Promise<IndividualRelationshipStrategy> {
        await dbConnect();
        const newStrategy = await IndividualRelationshipStrategyModel.create({
            ...data,
            studentId: new mongoose.Types.ObjectId(data.studentId),
        });
        return this.toDomain(newStrategy);
    }

    async findByStudentId(studentId: string): Promise<IndividualRelationshipStrategy[]> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(studentId)) return [];
        const strategies = await IndividualRelationshipStrategyModel.find({ studentId: new mongoose.Types.ObjectId(studentId) }).sort({ createdAt: -1 }).exec();
        return strategies.map(this.toDomain);
    }

    async findById(id: string): Promise<IndividualRelationshipStrategy | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await IndividualRelationshipStrategyModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }

    async update(id: string, data: Partial<Omit<IndividualRelationshipStrategy, 'id' | 'createdAt' | 'studentId'>>): Promise<IndividualRelationshipStrategy | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        
        const strategyDoc = await IndividualRelationshipStrategyModel.findById(id);
        if (!strategyDoc) return null;

        // Apply updates safely
        if (data.title) strategyDoc.title = data.title;
        if (data.rationale) strategyDoc.rationale = data.rationale;
        if (data.focus) strategyDoc.focus = data.focus;
        if (data.customPrompt) strategyDoc.customPrompt = data.customPrompt;
        if (data.status) strategyDoc.status = data.status;
        if (data.feedback) strategyDoc.feedback = data.feedback;
        
        // Handle nested array update correctly
        if (data.steps) {
            strategyDoc.steps = data.steps as any;
        }

        const updatedDoc = await strategyDoc.save();
        
        return this.toDomain(updatedDoc);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await IndividualRelationshipStrategyModel.findByIdAndDelete(id).exec();
    }
}
