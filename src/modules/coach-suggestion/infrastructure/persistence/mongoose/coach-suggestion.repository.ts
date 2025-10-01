
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { ICoachSuggestionRepository } from "../../../domain/interfaces/coach-suggestion-repository.interface";
import { CoachSuggestion } from "../../../domain/coach-suggestion.entity";
import { CreateCoachSuggestionDTO } from "../../../application/dtos/create-coach-suggestion.dto";
import CoachSuggestionModel, { ICoachSuggestionDocument } from "./coach-suggestion.schema";

export class MongooseCoachSuggestionRepository implements ICoachSuggestionRepository {

    private toDomain(doc: ICoachSuggestionDocument): CoachSuggestion {
        return new CoachSuggestion(
            doc._id.toString(),
            doc.studentId,
            doc.title,
            doc.positiveAspects,
            doc.areasForImprovement,
            doc.suggestion,
            doc.deepeningQuestion,
            doc.createdAt
        );
    }

    async create(data: CreateCoachSuggestionDTO): Promise<CoachSuggestion> {
        await dbConnect();
        const newSuggestion = await CoachSuggestionModel.create({
            ...data,
            studentId: new mongoose.Types.ObjectId(data.studentId)
        });
        return this.toDomain(newSuggestion);
    }

    async findByStudentId(studentId: string): Promise<CoachSuggestion[]> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(studentId)) return [];
        const suggestions = await CoachSuggestionModel.find({ studentId: new mongoose.Types.ObjectId(studentId) }).sort({ createdAt: -1 }).exec();
        return suggestions.map(this.toDomain);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await CoachSuggestionModel.findByIdAndDelete(id).exec();
    }
}
