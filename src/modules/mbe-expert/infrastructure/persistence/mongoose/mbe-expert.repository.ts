
import { dbConnect } from "@/lib/mongodb";
import MbeDocumentModel, { IMbeDocument } from "./mbe-expert.schema";
import { MbeDocument } from "../../../domain/mbe-expert.entity";
import { IMbeExpertRepository } from "../../../domain/interfaces/mbe-expert-repository.interface";

export class MongooseMbeExpertRepository implements IMbeExpertRepository {
  
  private toDomain(doc: IMbeDocument): MbeDocument {
    return new MbeDocument(
      doc._id.toString(),
      doc.content,
      doc.embedding,
      doc.sourceUrl,
      doc.createdAt
    );
  }

  async createMany(documents: Omit<MbeDocument, "id">[]): Promise<MbeDocument[]> {
    await dbConnect();
    const createdDocs = await MbeDocumentModel.insertMany(documents);
    return createdDocs.map(this.toDomain);
  }

  async findSimilar(embedding: number[], k: number): Promise<MbeDocument[]> {
    await dbConnect();
    const documents = await MbeDocumentModel.aggregate([
      {
        "$vectorSearch": {
          "index": "mbe_embedding_index",
          "path": "embedding",
          "queryVector": embedding,
          "numCandidates": 150,
          "limit": k
        }
      }
    ]);
    return documents.map(doc => this.toDomain(doc));
  }
  
  async deleteAll(): Promise<void> {
    await dbConnect();
    await MbeDocumentModel.deleteMany({});
  }
}
