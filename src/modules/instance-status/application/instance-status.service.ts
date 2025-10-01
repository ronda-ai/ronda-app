
import { IInstanceStatusRepository } from "../domain/interfaces/instance-status-repository.interface";
import { IInstanceStatusService } from "../domain/interfaces/instance-status-service.interface";
import { InstanceStatus } from "../domain/instance-status.entity";

export class InstanceStatusService implements IInstanceStatusService {
    constructor(private readonly repository: IInstanceStatusRepository) {}

    async getStatus(): Promise<InstanceStatus> {
        const stats = await this.repository.getStorageStats();
        const files = await this.repository.getAllFiles();

        return new InstanceStatus(
            stats.totalSize,
            stats.totalFiles,
            files
        );
    }

    async deleteFile(fileId: string): Promise<void> {
        await this.repository.deleteFile(fileId);
    }
    
    async cleanupAllFiles(): Promise<void> {
        await this.repository.deleteAllFiles();
    }
}
