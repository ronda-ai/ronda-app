
import { ExportFormat } from "../../application/dtos/export.dto";

export interface IExportService {
    exportData(type: string, format: ExportFormat, studentIds: string[], startDate?: string, endDate?: string): Promise<string | Buffer>;
}
