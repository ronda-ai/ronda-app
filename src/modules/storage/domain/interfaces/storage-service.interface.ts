import { Readable } from 'stream';

export interface IStorageService {
  save(
    fileBuffer: Buffer,
    filename: string,
    metadata?: { [key: string]: any }
  ): Promise<string>;
  getStream(filename: string): Promise<Readable | null>;
  deleteByFilename(filename: string): Promise<void>;
}
