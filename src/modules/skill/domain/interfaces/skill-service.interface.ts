
import { SkillDTO } from "../../application/dtos/skill.dto";
import { CreateSkillDTO } from "../../application/dtos/create-skill.dto";

export interface ISkillService {
  createSkills(dto: CreateSkillDTO): Promise<SkillDTO[]>;
  getAllSkills(): Promise<SkillDTO[]>;
  updateSkill(id: string, name: string): Promise<SkillDTO | null>;
  deleteSkill(id: string): Promise<void>;
  generateSkillSuggestions(language: string, existingSkills: string[], customPrompt?: string): Promise<string[]>;
}
