
import { dbConnect } from "@/lib/mongodb";
import { ISkillRepository } from "../../../domain/interfaces/skill-repository.interface";
import { Skill } from "../../../domain/skill.entity";
import SkillModel, { ISkillDocument } from "./skill.schema";
import mongoose from "mongoose";

export class MongooseSkillRepository implements ISkillRepository {
  private toDomain(doc: ISkillDocument): Skill {
    return new Skill(doc._id.toString(), doc.name);
  }

  async createMany(names: string[]): Promise<Skill[]> {
    await dbConnect();
    const skillsToInsert = names.map(name => ({ name }));
    const createdDocs = await SkillModel.insertMany(skillsToInsert, { ordered: false, lean: true }).catch(error => {
      if (error.code === 11000) {
        // Ignore duplicate key errors, which is expected behavior here.
        // The successfully inserted documents will be in the result.
        return error.result.insertedIds.map((doc: any) => ({ _id: doc._id, name: skillsToInsert.find(s => s.name === error.writeErrors.find((we:any) => we.op._id === doc._id)?.op.name)?.name}))
      }
      throw error;
    });
    return (createdDocs as any[]).map(doc => this.toDomain(doc as ISkillDocument));
  }

  async findAll(): Promise<Skill[]> {
    await dbConnect();
    const skills = await SkillModel.find().sort({ name: 1 }).exec();
    return skills.map(this.toDomain);
  }

  async update(id: string, name: string): Promise<Skill | null> {
    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const updatedSkill = await SkillModel.findByIdAndUpdate(id, { name }, { new: true }).exec();
    return updatedSkill ? this.toDomain(updatedSkill) : null;
  }

  async delete(id: string): Promise<void> {
    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(id)) return;
    await SkillModel.findByIdAndDelete(id).exec();
  }
}
