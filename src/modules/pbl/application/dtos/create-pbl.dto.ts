
import { PblProject } from "../../domain/pbl.entity";

export type CreatePblProjectDTO = Omit<PblProject, 'id' | 'createdAt' | 'updatedAt'>;
    