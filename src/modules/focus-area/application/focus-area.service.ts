
import { IFocusAreaRepository } from "../domain/interfaces/focus-area-repository.interface";
import { IFocusAreaService } from "../domain/interfaces/focus-area-service.interface";
import { FocusAreaDTO } from "./dtos/focus-area.dto";
import { FocusAreaMapper } from "./mappers/focus-area.mapper";
import { CreateFocusAreaDTO } from "./dtos/create-focus-area.dto";
import { generateFocusAreaSuggestion } from "@/ai/flows/generate-focus-area-suggestion";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";

export class FocusAreaService implements IFocusAreaService {
  constructor(
    private readonly repository: IFocusAreaRepository,
    private readonly aiConfigService: IAIConfigurationService
  ) {}

  async createFocusAreas(dto: CreateFocusAreaDTO): Promise<FocusAreaDTO[]> {
    const createdFocusAreas = await this.repository.createMany(dto.names);
    return createdFocusAreas.map(FocusAreaMapper.toDTO);
  }

  async getAllFocusAreas(): Promise<FocusAreaDTO[]> {
    const focusAreas = await this.repository.findAll();
    return focusAreas.map(FocusAreaMapper.toDTO);
  }

  async updateFocusArea(id: string, name: string): Promise<FocusAreaDTO | null> {
    const updatedFocusArea = await this.repository.update(id, name);
    return updatedFocusArea ? FocusAreaMapper.toDTO(updatedFocusArea) : null;
  }

  async deleteFocusArea(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async generateFocusAreaSuggestions(language: string, existingFocusAreas: string[], customPrompt?: string): Promise<string[]> {
      const aiConfig = await this.aiConfigService.getConfiguration();
      const result = await generateFocusAreaSuggestion({
          language,
          existingFocusAreas,
          customPrompt,
          classContext: aiConfig?.subject,
      });
      return result.suggestions;
  }
}
