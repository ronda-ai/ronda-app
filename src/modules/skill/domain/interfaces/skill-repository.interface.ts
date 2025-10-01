
import { Skill } from "../skill.entity";

export interface ISkillRepository {
  createMany(names: string[]): Promise<Skill[]>;
  findAll(): Promise<Skill[]>;
  update(id: string, name: string): Promise<Skill | null>;
  delete(id: string): Promise<void>;
}
