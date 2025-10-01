import { getGridFSBucket } from '@/lib/mongodb';
import { IStorageRepository } from '../../domain/interfaces/storage-repository.interface';
import { Readable } from 'stream';
import { ObjectId } from 'mongodb';
import zlib from 'zlib';
import { promisify } from 'util';

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.unzip);

export class GridFSStorageRepository implements IStorageRepository {
  async save(
    fileBuffer: Buffer,
    filename: string,
    metadata?: { [key: string]: any }
  ): Promise<string> {
    const bucket = getGridFSBucket();

    // Compress the buffer before saving
    const compressedBuffer = await gzip(fileBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(filename, {
        metadata: {
          ...metadata,
          compression: 'gzip', // Add compression metadata
        },
      });

      const readable = new Readable();
      readable.push(compressedBuffer);
      readable.push(null);

      readable
        .pipe(uploadStream)
        .on('error', (error) => reject(error))
        .on('finish', () => resolve(uploadStream.id.toString()));
    });
  }

  async getStream(filename: string): Promise<Readable | null> {
    try {
      const bucket = getGridFSBucket();
      const files = await bucket.find({ filename }).toArray();
      if (files.length === 0) {
        return null;
      }
      
      const file = files[0];
      const downloadStream = bucket.openDownloadStreamByName(filename);

      // Check for compression metadata and decompress if necessary
      if (file.metadata?.compression === 'gzip') {
        const gunzipStream = zlib.createGunzip();
        downloadStream.pipe(gunzipStream);
        return gunzipStream;
      }

      return downloadStream;
    } catch (error) {
      console.error(`Error streaming file ${filename} from GridFS:`, error);
      return null;
    }
  }

  async deleteByFilename(filename: string): Promise<void> {
    try {
      const bucket = getGridFSBucket();
      const files = await bucket.find({ filename }).toArray();
      if (files.length > 0) {
        for (const file of files) {
          await bucket.delete(new ObjectId(file._id.toString()));
        }
      }
    } catch (error) {
      console.error(`Error deleting file ${filename} from GridFS:`, error);
    }
  }
}
