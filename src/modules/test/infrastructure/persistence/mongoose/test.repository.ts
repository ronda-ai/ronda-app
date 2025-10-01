

import { dbConnect } from "@/lib/mongodb";
import { ITestRepository } from "../../../domain/interfaces/test-repository.interface";
import { CreateTestDTO } from "../../../application/dtos/create-test.dto";
import { Test } from "../../../domain/test.entity";
import TestModel, { ITestDocument } from "./test.schema";
import mongoose from "mongoose";
import { TestDTO } from "@/modules/test/application/dtos/test.dto";
import { RubricSuggestion } from "@/modules/rubric-suggestion/domain/rubric-suggestion.entity";

export class MongooseTestRepository implements ITestRepository {

    private toDomain(doc: ITestDocument | (ITestDocument & { rubricId: RubricSuggestion })): Test {
        return new Test(
            doc._id.toString(),
            doc.storyId,
            doc.storyTitle,
            doc.title,
            doc.blocks,
            doc.rubricId, // Pass the populated object or the ObjectId directly
            doc.createdAt,
            doc.updatedAt,
            doc.status,
            doc.liveId,
            doc.activeStudentIds
        );
    }
    
    async create(data: CreateTestDTO): Promise<Test> {
        await dbConnect();
        const newTest = await TestModel.create({
            ...data,
            rubricId: new mongoose.Types.ObjectId(data.rubricId)
        });
        const populatedTest = await TestModel.findById(newTest._id).populate('rubricId').exec();
        return this.toDomain(populatedTest as any);
    }

    async findAll(): Promise<(Test & { rubricId: RubricSuggestion })[]> {
        await dbConnect();
        const tests = await TestModel.find().sort({ createdAt: -1 }).populate('rubricId').exec();
        return tests.map(doc => this.toDomain(doc as any) as Test & { rubricId: RubricSuggestion });
    }
    
    async findById(id: string): Promise<(Test & { rubricId: RubricSuggestion }) | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const test = await TestModel.findById(id).populate('rubricId').exec();
        if (!test) return null;
        return this.toDomain(test as any) as Test & { rubricId: RubricSuggestion };
    }

    async findByLiveId(liveId: string): Promise<(Test & { rubricId: RubricSuggestion }) | null> {
        await dbConnect();
        const test = await TestModel.findOne({ liveId }).populate('rubricId').exec();
        if (!test) return null;
        return this.toDomain(test as any) as Test & { rubricId: RubricSuggestion };
    }

    async update(id: string, data: Partial<TestDTO>): Promise<(Test & { rubricId: RubricSuggestion }) | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const updatedDoc = await TestModel.findByIdAndUpdate(id, data, { new: true }).populate('rubricId').exec();
        if (!updatedDoc) return null;
        return this.toDomain(updatedDoc as any) as Test & { rubricId: RubricSuggestion };
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await TestModel.findByIdAndDelete(id).exec();
    }
}
