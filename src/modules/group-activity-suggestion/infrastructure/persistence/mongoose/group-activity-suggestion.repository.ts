
import { dbConnect } from "@/lib/mongodb";
import { IGroupActivitySuggestionRepository } from "../../../domain/interfaces/group-activity-suggestion-repository.interface";
import { CreateGroupActivitySuggestionDTO } from "../../../application/dtos/create-group-activity-suggestion.dto";
import { GroupActivitySuggestion } from "../../../domain/group-activity-suggestion.entity";
import GroupActivitySuggestionModel, { IGroupActivitySuggestionDocument } from "./group-activity-suggestion.schema";
import mongoose from "mongoose";

export class MongooseGroupActivitySuggestionRepository implements IGroupActivitySuggestionRepository {

    private toDomain(doc: IGroupActivitySuggestionDocument): GroupActivitySuggestion {
        return new GroupActivitySuggestion(
            doc._id.toString(),
            doc.teacherTip,
            doc.suggestedGroups,
            doc.suggestedSkills,
            doc.suggestedThemes,
            doc.createdAt,
            doc.updatedAt
        );
    }
    
    async create(data: CreateGroupActivitySuggestionDTO): Promise<GroupActivitySuggestion> {
        await dbConnect();
        const newSuggestion = await GroupActivitySuggestionModel.create(data);
        return this.toDomain(newSuggestion);
    }
    
    async findAll(): Promise<GroupActivitySuggestion[]> {
        await dbConnect();
        const suggestions = await GroupActivitySuggestionModel.find().sort({ createdAt: -1 }).exec();
        return suggestions.map(this.toDomain);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await GroupActivitySuggestionModel.findByIdAndDelete(id).exec();
    }
}
