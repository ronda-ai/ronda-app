
import { dbConnect } from "@/lib/mongodb";
import { IFocusAreaRepository } from "../../../domain/interfaces/focus-area-repository.interface";
import { FocusArea } from "../../../domain/focus-area.entity";
import FocusAreaModel, { IFocusAreaDocument } from "./focus-area.schema";
import mongoose from "mongoose";

export class MongooseFocusAreaRepository implements IFocusAreaRepository {
  private toDomain(doc: IFocusAreaDocument): FocusArea {
    return new FocusArea(doc._id.toString(), doc.name);
  }

  async createMany(names: string[]): Promise<FocusArea[]> {
    await dbConnect();
    const focusAreasToInsert = names.map(name => ({ name }));
    const createdDocs = await FocusAreaModel.insertMany(focusAreasToInsert, { ordered: false, lean: true }).catch(error => {
      if (error.code === 11000) {
        return error.result.insertedIds.map((doc: any) => ({ _id: doc._id, name: focusAreasToInsert.find(s => s.name === error.writeErrors.find((we:any) => we.op._id === doc._id)?.op.name)?.name}))
      }
      throw error;
    });
    return (createdDocs as any[]).map(doc => this.toDomain(doc as IFocusAreaDocument));
  }

  async findAll(): Promise<FocusArea[]> {
    await dbConnect();
    const focusAreas = await FocusAreaModel.find().sort({ name: 1 }).exec();
    return focusAreas.map(this.toDomain);
  }

  async update(id: string, name: string): Promise<FocusArea | null> {
    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const updatedFocusArea = await FocusAreaModel.findByIdAndUpdate(id, { name }, { new: true }).exec();
    return updatedFocusArea ? this.toDomain(updatedFocusArea) : null;
  }

  async delete(id: string): Promise<void> {
    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(id)) return;
    await FocusAreaModel.findByIdAndDelete(id).exec();
  }
}
