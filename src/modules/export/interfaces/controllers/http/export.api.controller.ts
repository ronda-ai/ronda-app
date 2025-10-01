
import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IExportService } from "@/modules/export/domain/interfaces/export-service.interface";
import { ExportFormat } from "@/modules/export/application/dtos/export.dto";

const getExportService = () => resolve<IExportService>(SERVICE_KEYS.ExportService);

export async function exportDataHandler(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const format = searchParams.get('format') as ExportFormat;
        const startDate = searchParams.get('startDate') || undefined;
        const endDate = searchParams.get('endDate') || undefined;
        const studentIdsParam = searchParams.get('studentIds');
        
        if (!type || !format) {
            return NextResponse.json({ message: 'Type and format parameters are required' }, { status: 400 });
        }
        
        const studentIds = studentIdsParam ? studentIdsParam.split(',') : [];

        const fileContent = await getExportService().exportData(type, format, studentIds, startDate, endDate);
        
        const headers = new Headers();
        let contentType = 'application/octet-stream';
        
        if (format === 'csv') contentType = 'text/csv';
        if (format === 'json') contentType = 'application/json';
        if (format === 'html') contentType = 'text/html';
        if (format === 'xlsx') contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (format === 'docx') contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

        headers.set('Content-Type', contentType);
        headers.set('Content-Disposition', `attachment; filename="export_${type}.${format}"`);

        return new Response(fileContent, { headers });

    } catch (error: any) {
        console.error('API Error: Failed to export data', error);
        return NextResponse.json({ message: error.message || 'Failed to export data' }, { status: 500 });
    }
}
