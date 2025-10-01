
import { InstanceStatus } from "../instance-status.entity";

export interface IInstanceStatusService {
    getStatus(): Promise<InstanceStatus>;
    deleteFile(fileId: string): Promise<void>;
    cleanupAllFiles(): Promise<void>;
}
