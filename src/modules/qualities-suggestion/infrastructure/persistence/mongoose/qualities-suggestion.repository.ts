
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { IQualitiesSuggestionRepository } from "../../../domain/interfaces/qualities-suggestion-repository.interface";
import { QualitiesSuggestion } from "../../../domain/qualities-suggestion.entity";
import { CreateQualitiesSuggestionDTO } from "../../../application/dtos/create-qualities-suggestion.dto";
import QualitiesSuggestionModel, { IQualitiesSuggestionDocument } from "./qualities-suggestion.schema";

export class MongooseQualitiesSuggestionRepository implements IQualitiesSuggestionRepository {

    private toDomain(doc: IQualitiesSuggestionDocument): QualitiesSuggestion {
        return new QualitiesSuggestion(
            doc._id.toString(),
            doc.studentId,
            doc.suggestions,
            doc.createdAt
        );
    }

    async create(data: CreateQualitiesSuggestionDTO): Promise<QualitiesSuggestion> {
        await dbConnect();
        const newSuggestion = await QualitiesSuggestionModel.create({
            ...data,
            studentId: new mongoose.Types.ObjectId(data.studentId)
        });
        return this.toDomain(newSuggestion);
    }

    async findByStudentId(studentId: string): Promise<QualitiesSuggestion[]> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(studentId)) return [];
        const suggestions = await QualitiesSuggestionModel.find({ studentId: new mongoose.Types.ObjectId(studentId) }).sort({ createdAt: -1 }).exec();
        return suggestions.map(this.toDomain);
    }
}
