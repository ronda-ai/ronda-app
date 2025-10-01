import { dbConnect, getGridFSBucket } from "@/lib/mongodb";
import { IInstanceStatusRepository } from "../../../domain/interfaces/instance-status-repository.interface";
import { InstanceFile } from "../../../domain/instance-status.entity";
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export class MongooseInstanceStatusRepository implements IInstanceStatusRepository {
    private async getDb(): Promise<any> {
        const conn = await dbConnect();
        if (!conn.connection.db) {
            throw new Error("Database connection is not available.");
        }
        return conn.connection.db;
    }

    async getStorageStats(): Promise<{ totalSize: number; totalFiles: number; }> {
        const db = await this.getDb();
        const filesCollection = db.collection('audio_files.files');
        
        const aggregationResult = await filesCollection.aggregate([
            {
                $group: {
                    _id: null,
                    totalSize: { $sum: "$length" }
                }
            }
        ]).toArray();

        const totalSize = aggregationResult.length > 0 ? aggregationResult[0].totalSize : 0;
        const totalFiles = await filesCollection.countDocuments();
        
        return { totalSize, totalFiles };
    }
    
    async getAllFiles(): Promise<InstanceFile[]> {
        const db = await this.getDb();
        const files = await db.collection('audio_files.files').find().sort({ uploadDate: -1 }).toArray();

        return files.map((file: any) => ({
            id: file._id.toString(),
            filename: file.filename,
            length: file.length,
            uploadDate: file.uploadDate,
        }));
    }

    async deleteFile(fileId: string): Promise<void> {
        if (!ObjectId.isValid(fileId)) {
            throw new Error("Invalid file ID format");
        }
        const bucket = getGridFSBucket();
        await bucket.delete(new ObjectId(fileId));
    }
    
    async deleteAllFiles(): Promise<void> {
        const db = await this.getDb();
        // This is a direct way to clear the GridFS collections. Use with caution.
        await db.collection('audio_files.files').deleteMany({});
        await db.collection('audio_files.chunks').deleteMany({});
    }
}
