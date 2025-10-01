
import { FocusArea } from "../focus-area.entity";

export interface IFocusAreaRepository {
  createMany(names: string[]): Promise<FocusArea[]>;
  findAll(): Promise<FocusArea[]>;
  update(id: string, name: string): Promise<FocusArea | null>;
  delete(id: string): Promise<void>;
}
