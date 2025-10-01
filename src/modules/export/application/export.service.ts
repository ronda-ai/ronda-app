
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IExportService } from "../domain/interfaces/export-service.interface";
import { ExportFormat } from "./dtos/export.dto";
import { IChallengeService } from "@/modules/challenge/domain/interfaces/challenge-service.interface";
import { IAttendanceService } from "@/modules/attendance/domain/interfaces/attendance-service.interface";
import { format } from "date-fns";
import { encode } from "html-entities";
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, ShadingType, AlignmentType, VerticalAlign, BorderStyle } from 'docx';

export class ExportService implements IExportService {
    constructor(
        private readonly studentService: IStudentService,
        private readonly challengeService: IChallengeService,
        private readonly attendanceService: IAttendanceService
    ) {}

    async exportData(type: string, formatType: ExportFormat, studentIds: string[], startDate?: string, endDate?: string): Promise<string | Buffer> {
        let data: any[];
        let headers: string[] = [];
        
        switch(type) {
            case 'students':
                const students = await this.studentService.getAllStudents();
                data = students.map(s => ({
                    id: s.id,
                    name: s.name,
                    age: s.age,
                    gender: s.gender,
                    qualities: s.qualities.join(';'),
                    fears: s.fears?.join(';'),
                    disability: s.disability,
                    neurodiversity: s.neurodiversity,
                    notes: s.notes,
                    goodRelations: s.goodRelations?.map(id => students.find(st => st.id === id)?.name).join(';'),
                    badRelations: s.badRelations?.map(id => students.find(st => st.id === id)?.name).join(';'),
                    isAbsent: s.isAbsent,
                }));
                headers = ['id', 'name', 'age', 'gender', 'qualities', 'fears', 'disability', 'neurodiversity', 'notes', 'goodRelations', 'badRelations', 'isAbsent'];
                break;
            case 'attendance':
                if (!startDate || !endDate) throw new Error("Date range is required for attendance export.");
                const attendanceRecords = await this.attendanceService.getAttendanceByDateRange(startDate, endDate, studentIds);
                 const studentMap = new Map((await this.studentService.getAllStudents()).map(s => [s.id, s.name]));
                data = attendanceRecords.map(r => ({
                    studentName: studentMap.get(r.studentId) || r.studentId,
                    date: r.date,
                    status: r.status,
                }));
                 headers = ['studentName', 'date', 'status'];
                break;
            case 'evaluations':
                 if (!startDate || !endDate) throw new Error("Date range is required for evaluations export.");
                 const allChallenges = await this.challengeService.getAllChallenges();
                 const studentsMapEval = new Map((await this.studentService.getAllStudents()).map(s => [s.id, s.name]));

                 const filteredChallenges = allChallenges.filter(c => {
                    const challengeDate = new Date(c.challenge.createdAt);
                    const isAfterStart = challengeDate >= new Date(startDate);
                    const isBeforeEnd = challengeDate <= new Date(endDate);
                    const isStudentMatch = studentIds.length > 0 ? studentIds.includes(c.studentId) : true;
                    return c.status === 'evaluated' && isAfterStart && isBeforeEnd && isStudentMatch;
                 });

                 data = filteredChallenges.map(c => ({
                    studentName: studentsMapEval.get(c.studentId) || c.studentId,
                    date: format(new Date(c.challenge.createdAt), 'yyyy-MM-dd'),
                    challenge: c.challenge.challenge,
                    rating: c.rating,
                    feedback: c.feedback,
                    mood: c.mood,
                 }));
                 headers = ['studentName', 'date', 'challenge', 'rating', 'feedback', 'mood'];
                break;
            default:
                throw new Error("Invalid data type for export.");
        }
        
        if (formatType === 'xlsx') {
            return this.convertToXLSX(data, headers);
        }
        
        if (formatType === 'docx') {
            return await this.convertToDOCX(data, headers, type);
        }

        if (formatType === 'json') {
            return JSON.stringify(data, null, 2);
        }

        if (formatType === 'csv') {
            return this.convertToCSV(data, headers);
        }

        if (formatType === 'html') {
            return this.convertToHTML(data, headers, type);
        }
        
        throw new Error("Invalid export format.");
    }
    
    private convertToCSV(data: any[], headers: string[]): string {
        const headerRow = headers.join(',') + '\n';
        const bodyRows = data.map(row => 
            headers.map(header => {
                let cell = row[header] === null || row[header] === undefined ? '' : String(row[header]);
                // Escape commas and quotes
                cell = cell.includes(',') || cell.includes('"') || cell.includes('\n') ? `"${cell.replace(/"/g, '""')}"` : cell;
                return cell;
            }).join(',')
        ).join('\n');
        return headerRow + bodyRows;
    }

    private convertToHTML(data: any[], headers: string[], type: string): string {
        const title = `Exported Data: ${type}`;
        const headerRow = `<tr>${headers.map(h => `<th>${encode(h)}</th>`).join('')}</tr>`;
        
        const bodyRows = data.map(row => 
            `<tr>${headers.map(header => `<td>${encode(String(row[header] ?? ''))}</td>`).join('')}</tr>`
        ).join('');
    
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>${encode(title)}</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; }
                    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    thead { background-color: #f2f2f2; }
                    tr:nth-child(even) { background-color: #f9f9f9; }
                    h1 { color: #222; }
                </style>
            </head>
            <body>
                <h1>${encode(title)}</h1>
                <table>
                    <thead>${headerRow}</thead>
                    <tbody>${bodyRows}</tbody>
                </table>
            </body>
            </html>
        `;
    }
    
    private convertToXLSX(data: any[], headers: string[]): Buffer {
        const workbook = XLSX.utils.book_new();
        const worksheetData = [
            headers,
            ...data.map(row => headers.map(header => row[header]))
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // --- Styling ---
        const borderStyle = { style: "thin", color: { rgb: "888888" } };
        const border = { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle };

        const headerStyle = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4F4F4F" } },
            border: border,
        };
        const rowStyle1 = { 
            fill: { fgColor: { rgb: "F5F5F5" } },
            border: border,
        };
        const rowStyle2 = { 
            fill: { fgColor: { rgb: "FFFFFF" } },
            border: border,
        };

        const colWidths = headers.map((header, i) => ({
            wch: Math.max(
                header.length,
                ...data.map(row => String(row[header] ?? '').length)
            ) + 2 // Add a little padding
        }));
        worksheet['!cols'] = colWidths;

        for(let C = 0; C < headers.length; ++C) {
            const cellRef = XLSX.utils.encode_cell({c: C, r: 0});
            if (worksheet[cellRef]) {
                worksheet[cellRef].s = headerStyle;
            }
        }
        
        for(let R = 1; R <= data.length; ++R) {
            for(let C = 0; C < headers.length; ++C) {
                const cellRef = XLSX.utils.encode_cell({c: C, r: R});
                 if (worksheet[cellRef]) {
                    worksheet[cellRef].s = (R % 2 === 0) ? rowStyle2 : rowStyle1;
                } else {
                    // Also apply style to empty cells to get borders
                    worksheet[cellRef] = {v: '', s: (R % 2 === 0) ? rowStyle2 : rowStyle1};
                }
            }
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        
        return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    }

    private async convertToDOCX(data: any[], headers: string[], title: string): Promise<Buffer> {
        const headerCells = headers.map(header => new TableCell({
            children: [new Paragraph({ text: header, style: "tableHeader" })],
            shading: {
                type: ShadingType.SOLID,
                color: "333333",
                fill: "333333",
            },
            verticalAlign: VerticalAlign.CENTER,
        }));
        
        const headerRow = new TableRow({
            children: headerCells,
            tableHeader: true,
        });

        const bodyRows = data.map((row, rowIndex) => new TableRow({
            children: headers.map(header => new TableCell({ 
                children: [new Paragraph(String(row[header] ?? ''))],
                shading: {
                    type: ShadingType.SOLID,
                    color: rowIndex % 2 === 0 ? "F5F5F5" : "FFFFFF",
                    fill: rowIndex % 2 === 0 ? "F5F5F5" : "FFFFFF",
                },
                verticalAlign: VerticalAlign.CENTER,
            }))
        }));
        
        const table = new Table({
            rows: [headerRow, ...bodyRows],
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
        });

        const doc = new Document({
            styles: {
                paragraphStyles: [
                    {
                        id: "tableHeader",
                        name: "Table Header",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            bold: true,
                            color: "FFFFFF",
                            size: 24, // font size in half-points
                        },
                        paragraph: {
                            alignment: AlignmentType.CENTER,
                        }
                    },
                ]
            },
            sections: [{
                children: [
                    new Paragraph({ text: `Exported Data: ${title}`, heading: 'Heading1' }),
                    new Paragraph({ text: " ", spacing: { after: 200 } }), // Add some space
                    table,
                ],
            }],
        });
        
        return await Packer.toBuffer(doc);
    }
}
