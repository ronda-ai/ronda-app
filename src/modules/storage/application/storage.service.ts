import { Readable } from 'stream';
import { IStorageRepository } from '../domain/interfaces/storage-repository.interface';
import { IStorageService } from '../domain/interfaces/storage-service.interface';

export class StorageService implements IStorageService {
  constructor(private readonly repository: IStorageRepository) {}

  async save(
    fileBuffer: Buffer,
    filename: string,
    metadata?: { [key: string]: any }
  ): Promise<string> {
    return this.repository.save(fileBuffer, filename, metadata);
  }

  async getStream(filename: string): Promise<Readable | null> {
    return this.repository.getStream(filename);
  }

  async deleteByFilename(filename: string): Promise<void> {
    await this.repository.deleteByFilename(filename);
  }
}
