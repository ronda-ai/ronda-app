
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { NextRequest, NextResponse } from 'next/server';
import { resolve } from '@/services/bootstrap';
import { SERVICE_KEYS } from '@/config/service-keys';
import { IMoodTrendAnalysisService } from '@/modules/mood-trend-analysis/domain/interfaces/mood-trend-analysis-service.interface';
import { AuthenticatedUserPayload, GenericRouteContext } from '@/lib/middleware/withAuthorization';

const getMoodTrendAnalysisService = () => resolve<IMoodTrendAnalysisService>(SERVICE_KEYS.MoodTrendAnalysisService);

async function deleteMoodAnalysisHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        await getMoodTrendAnalysisService().deleteMoodTrendAnalysis(id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete mood analysis', error);
        return NextResponse.json({ message: error.message || 'Failed to delete mood analysis' }, { status: 500 });
    }
}

export const DELETE = withAuthorization(deleteMoodAnalysisHandler, isTeacher);
