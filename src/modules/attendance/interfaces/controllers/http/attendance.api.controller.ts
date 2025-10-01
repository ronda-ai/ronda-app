
import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IAttendanceService } from "@/modules/attendance/domain/interfaces/attendance-service.interface";

const getAttendanceService = () => resolve<IAttendanceService>(SERVICE_KEYS.AttendanceService);

export async function setAttendanceHandler(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Check if it's a bulk update
        if (Array.isArray(body)) {
            await getAttendanceService().setBulkAttendance(body);
            return new NextResponse(null, { status: 204 });
        } else {
            const attendanceRecord = await getAttendanceService().setAttendance(body);
            return NextResponse.json(attendanceRecord, { status: 200 });
        }
    } catch (error: any) {
        console.error('API Error: Failed to set attendance', error);
        return NextResponse.json({ message: error.message || 'Failed to set attendance' }, { status: 400 });
    }
}

export async function getAttendanceHandler(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');
        const month = searchParams.get('month');
        const year = searchParams.get('year');

        if (date) {
            const attendanceRecords = await getAttendanceService().getAttendanceByDate(date);
            return NextResponse.json(attendanceRecords);
        }

        if (month && year) {
            const attendanceRecords = await getAttendanceService().getAttendanceByMonth(parseInt(month, 10), parseInt(year, 10));
            return NextResponse.json(attendanceRecords);
        }
        
        return NextResponse.json({ message: 'Date or Month/Year parameter is required' }, { status: 400 });

    } catch (error: any) {
        console.error('API Error: Failed to get attendance', error);
        return NextResponse.json({ message: error.message || 'Failed to get attendance' }, { status: 500 });
    }
}
