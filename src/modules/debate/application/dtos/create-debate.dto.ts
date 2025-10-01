
import { Debate } from "../../domain/debate.entity";

export type CreateDebateDTO = Omit<Debate, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'liveId' | 'teams'>;
