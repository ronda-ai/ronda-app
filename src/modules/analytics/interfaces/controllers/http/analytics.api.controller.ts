
import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IAnalyticsService } from "@/modules/analytics/domain/interfaces/analytics-service.interface";

const getAnalyticsService = () => resolve<IAnalyticsService>(SERVICE_KEYS.AnalyticsService);

export async function getAnalyticsHandler(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const studentIdsParam = searchParams.get('studentIds');
        
        if (!startDate || !endDate) {
            return NextResponse.json({ message: 'startDate and endDate parameters are required' }, { status: 400 });
        }
        
        const studentIds = studentIdsParam ? studentIdsParam.split(',') : [];

        const analyticsData = await getAnalyticsService().getAnalytics(startDate, endDate, studentIds);
        
        return NextResponse.json(analyticsData);
    } catch (error: any) {
        console.error('API Error: Failed to get analytics data', error);
        return NextResponse.json({ message: error.message || 'Failed to get analytics data' }, { status: 500 });
    }
}
