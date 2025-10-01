
import { Skill } from "../../domain/skill.entity";
import { SkillDTO } from "../dtos/skill.dto";

export class SkillMapper {
  public static toDTO(skill: Skill): SkillDTO {
    return {
      id: skill.id,
      name: skill.name,
    };
  }
}
