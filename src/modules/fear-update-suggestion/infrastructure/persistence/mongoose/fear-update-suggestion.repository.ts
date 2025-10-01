
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { IFearUpdateSuggestionRepository } from "../../../domain/interfaces/fear-update-suggestion-repository.interface";
import { FearUpdateSuggestion } from "../../../domain/fear-update-suggestion.entity";
import { CreateFearUpdateSuggestionDTO } from "../../../application/dtos/create-fear-update-suggestion.dto";
import FearUpdateSuggestionModel, { IFearUpdateSuggestionDocument } from "./fear-update-suggestion.schema";

export class MongooseFearUpdateSuggestionRepository implements IFearUpdateSuggestionRepository {

    private toDomain(doc: IFearUpdateSuggestionDocument): FearUpdateSuggestion {
        return new FearUpdateSuggestion(
            doc._id.toString(),
            doc.studentId,
            doc.fearToUpdate,
            doc.updateProposal,
            doc.originalSuggestionId,
            doc.createdAt
        );
    }

    async create(data: CreateFearUpdateSuggestionDTO): Promise<FearUpdateSuggestion> {
        await dbConnect();
        const newSuggestion = await FearUpdateSuggestionModel.create({
            ...data,
            studentId: new mongoose.Types.ObjectId(data.studentId),
            originalSuggestionId: new mongoose.Types.ObjectId(data.originalSuggestionId),
        });
        return this.toDomain(newSuggestion);
    }
}
