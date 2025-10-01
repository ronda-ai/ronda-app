
import { getAnalyticsHandler } from '@/modules/analytics/interfaces/controllers/http/analytics.api.controller';
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = withAuthorization(async (req, authUser) => {
    try {
        const response = await getAnalyticsHandler(req);
        // Ensure no-cache headers are set to get fresh data
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'An error occurred' }, { status: 500 });
    }
}, isTeacher);
