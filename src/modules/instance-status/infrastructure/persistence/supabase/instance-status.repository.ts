import { IInstanceStatusRepository } from "../../../domain/interfaces/instance-status-repository.interface";
import { InstanceFile } from "../../../domain/instance-status.entity";

export class SupabaseInstanceStatusRepository implements IInstanceStatusRepository {
    async getStorageStats(): Promise<{ totalSize: number; totalFiles: number; }> {
        throw new Error("Method not implemented.");
    }
    async getAllFiles(): Promise<InstanceFile[]> {
        throw new Error("Method not implemented.");
    }
    async deleteFile(fileId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteAllFiles(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
