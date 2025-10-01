
import { InstanceFile, InstanceStatus } from "../instance-status.entity";

export interface IInstanceStatusRepository {
    getStorageStats(): Promise<{ totalSize: number; totalFiles: number }>;
    getAllFiles(): Promise<InstanceFile[]>;
    deleteFile(fileId: string): Promise<void>;
    deleteAllFiles(): Promise<void>;
}
