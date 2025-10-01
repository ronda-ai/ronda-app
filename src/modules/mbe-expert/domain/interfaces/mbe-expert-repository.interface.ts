
import { MbeDocument } from '../mbe-expert.entity';

export interface IMbeExpertRepository {
  createMany(documents: Omit<MbeDocument, 'id'>[]): Promise<MbeDocument[]>;
  findSimilar(embedding: number[], k: number): Promise<MbeDocument[]>;
  deleteAll(): Promise<void>;
}
