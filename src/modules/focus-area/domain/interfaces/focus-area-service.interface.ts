
import { FocusAreaDTO } from "../../application/dtos/focus-area.dto";
import { CreateFocusAreaDTO } from "../../application/dtos/create-focus-area.dto";

export interface IFocusAreaService {
  createFocusAreas(dto: CreateFocusAreaDTO): Promise<FocusAreaDTO[]>;
  getAllFocusAreas(): Promise<FocusAreaDTO[]>;
  updateFocusArea(id: string, name: string): Promise<FocusAreaDTO | null>;
  deleteFocusArea(id: string): Promise<void>;
  generateFocusAreaSuggestions(language: string, existingFocusAreas: string[], customPrompt?: string): Promise<string[]>;
}
