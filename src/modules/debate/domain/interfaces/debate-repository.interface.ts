
import { CreateDebateDTO } from "../../application/dtos/create-debate.dto";
import { DebateDTO } from "../../application/dtos/debate.dto";
import { Debate } from "../debate.entity";

export interface IDebateRepository {
    create(data: CreateDebateDTO): Promise<Debate>;
    findAll(): Promise<Debate[]>;
    findById(id: string): Promise<Debate | null>;
    findByLiveId(liveId: string): Promise<Debate | null>;
    update(id: string, data: Partial<DebateDTO>): Promise<Debate | null>;
    delete(id: string): Promise<void>;
}
