import { IStorageRepository } from "../../domain/interfaces/storage-repository.interface";
import { Readable } from 'stream';

export class SupabaseStorageRepository implements IStorageRepository {
    async save(fileBuffer: Buffer, filename: string, metadata?: { [key: string]: any; }): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async getStream(filename: string): Promise<Readable | null> {
        throw new Error("Method not implemented.");
    }
    async deleteByFilename(filename: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
