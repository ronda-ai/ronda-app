
export interface InstanceFile {
    id: string;
    filename: string;
    length: number;
    uploadDate: Date;
}

export class InstanceStatus {
    constructor(
        public totalSize: number,
        public totalFiles: number,
        public files: InstanceFile[]
    ) {}
}
