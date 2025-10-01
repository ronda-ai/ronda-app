

import { dbConnect } from "@/lib/mongodb";
import { IRubricSuggestionRepository } from "../../../domain/interfaces/rubric-suggestion-repository.interface";
import { CreateRubricSuggestionDTO } from "../../../application/dtos/create-rubric-suggestion.dto";
import { RubricSuggestion } from "../../../domain/rubric-suggestion.entity";
import RubricSuggestionModel, { IRubricSuggestionDocument } from "./rubric-suggestion.schema";
import mongoose from "mongoose";

export class MongooseRubricSuggestionRepository implements IRubricSuggestionRepository {

    private toDomain(doc: IRubricSuggestionDocument): RubricSuggestion {
        return new RubricSuggestion(
            doc._id.toString(),
            doc.activityDescription,
            doc.criteria,
            doc.createdAt,
            doc.updatedAt,
            doc.suggestedScoring,
        );
    }
    
    async create(data: CreateRubricSuggestionDTO): Promise<RubricSuggestion> {
        await dbConnect();
        const newSuggestion = await RubricSuggestionModel.create(data);
        return this.toDomain(newSuggestion);
    }

    async findAll(): Promise<RubricSuggestion[]> {
        await dbConnect();
        const suggestions = await RubricSuggestionModel.find().sort({ createdAt: -1 }).exec();
        return suggestions.map(this.toDomain);
    }
    
    async findById(id: string): Promise<RubricSuggestion | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const suggestion = await RubricSuggestionModel.findById(id).exec();
        return suggestion ? this.toDomain(suggestion) : null;
    }

    async update(id: string, data: Partial<RubricSuggestion>): Promise<RubricSuggestion | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const updatedDoc = await RubricSuggestionModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updatedDoc) return null;
        return this.toDomain(updatedDoc);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await RubricSuggestionModel.findByIdAndDelete(id).exec();
    }
}
