

import { dbConnect } from "@/lib/mongodb";
import { IActivitySuggestionRepository } from "../../../domain/interfaces/activity-suggestion-repository.interface";
import { CreateActivitySuggestionDTO } from "../../../application/dtos/create-activity-suggestion.dto";
import { ActivitySuggestion } from "../../../domain/activity-suggestion.entity";
import ActivitySuggestionModel, { IActivitySuggestionDocument } from "./activity-suggestion.schema";
import mongoose from "mongoose";

export class MongooseActivitySuggestionRepository implements IActivitySuggestionRepository {

    private toDomain(doc: IActivitySuggestionDocument): ActivitySuggestion {
        return new ActivitySuggestion(
            doc._id.toString(),
            doc.studentId,
            doc.topics,
            doc.themes,
            doc.createdAt,
            doc.updatedAt
        );
    }
    
    async create(data: CreateActivitySuggestionDTO): Promise<ActivitySuggestion> {
        await dbConnect();
        const newSuggestion = await ActivitySuggestionModel.create({
            ...data,
            studentId: new mongoose.Types.ObjectId(data.studentId)
        });
        return this.toDomain(newSuggestion);
    }
}
