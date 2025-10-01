
import { ISkillRepository } from "../domain/interfaces/skill-repository.interface";
import { ISkillService } from "../domain/interfaces/skill-service.interface";
import { SkillDTO } from "./dtos/skill.dto";
import { SkillMapper } from "./mappers/skill.mapper";
import { CreateSkillDTO } from "./dtos/create-skill.dto";
import { generateSkillSuggestion } from "@/ai/flows/generate-skill-suggestion";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";

export class SkillService implements ISkillService {
  constructor(
    private readonly repository: ISkillRepository,
    private readonly aiConfigService: IAIConfigurationService
  ) {}

  async createSkills(dto: CreateSkillDTO): Promise<SkillDTO[]> {
    const createdSkills = await this.repository.createMany(dto.names);
    return createdSkills.map(SkillMapper.toDTO);
  }

  async getAllSkills(): Promise<SkillDTO[]> {
    const skills = await this.repository.findAll();
    return skills.map(SkillMapper.toDTO);
  }

  async updateSkill(id: string, name: string): Promise<SkillDTO | null> {
    const updatedSkill = await this.repository.update(id, name);
    return updatedSkill ? SkillMapper.toDTO(updatedSkill) : null;
  }

  async deleteSkill(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async generateSkillSuggestions(language: string, existingSkills: string[], customPrompt?: string): Promise<string[]> {
      const aiConfig = await this.aiConfigService.getConfiguration();
      const result = await generateSkillSuggestion({
          language,
          existingSkills,
          classContext: aiConfig?.subject,
          customPrompt
      });
      return result.suggestions;
  }
}
