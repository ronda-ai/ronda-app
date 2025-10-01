
import { FocusArea } from "../../domain/focus-area.entity";
import { FocusAreaDTO } from "../dtos/focus-area.dto";

export class FocusAreaMapper {
  public static toDTO(focusArea: FocusArea): FocusAreaDTO {
    return {
      id: focusArea.id,
      name: focusArea.name,
    };
  }
}
