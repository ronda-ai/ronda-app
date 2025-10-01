
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { IFearManagementSuggestionRepository } from "../../../domain/interfaces/fear-management-suggestion-repository.interface";
import { FearManagementSuggestion } from "../../../domain/fear-management-suggestion.entity";
import { CreateFearManagementSuggestionDTO } from "../../../application/dtos/create-fear-management-suggestion.dto";
import FearManagementSuggestionModel, { IFearManagementSuggestionDocument } from "./fear-management-suggestion.schema";

export class MongooseFearManagementSuggestionRepository implements IFearManagementSuggestionRepository {

    private toDomain(doc: IFearManagementSuggestionDocument): FearManagementSuggestion {
        return new FearManagementSuggestion(
            doc._id.toString(),
            doc.studentId,
            doc.targetedFear,
            doc.title,
            doc.rationale,
            doc.steps,
            doc.deepeningQuestion,
            doc.createdAt,
            doc.teacherFeedback
        );
    }

    async create(data: CreateFearManagementSuggestionDTO): Promise<FearManagementSuggestion> {
        await dbConnect();
        const newSuggestion = await FearManagementSuggestionModel.create({
            ...data,
            studentId: new mongoose.Types.ObjectId(data.studentId)
        });
        return this.toDomain(newSuggestion);
    }

    async findByStudentId(studentId: string): Promise<FearManagementSuggestion[]> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(studentId)) return [];
        const suggestions = await FearManagementSuggestionModel.find({ studentId: new mongoose.Types.ObjectId(studentId) }).sort({ createdAt: -1 }).exec();
        return suggestions.map(this.toDomain);
    }

    async findById(id: string): Promise<FearManagementSuggestion | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await FearManagementSuggestionModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }

    async update(id: string, data: Partial<Omit<FearManagementSuggestion, "id" | "studentId" | "createdAt">>): Promise<FearManagementSuggestion | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const updatedDoc = await FearManagementSuggestionModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updatedDoc) return null;
        return this.toDomain(updatedDoc);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await FearManagementSuggestionModel.findByIdAndDelete(id).exec();
    }
}
