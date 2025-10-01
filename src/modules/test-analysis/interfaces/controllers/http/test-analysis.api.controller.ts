import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ITestAnalysisService } from "@/modules/test-analysis/domain/interfaces/test-analysis-service.interface";
import { AuthenticatedUserPayload } from "@/lib/middleware/withAuthorization";

const getTestAnalysisService = () => resolve<ITestAnalysisService>(SERVICE_KEYS.TestAnalysisService);

export async function analyzeSubmissionHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const { test, submission, language } = body;
        
        const analysis = await getTestAnalysisService().generateAndCreateAnalysis(test, submission, language);

        return NextResponse.json(analysis);
    } catch (error: any) {
        console.error('API Error: Failed to analyze test submission', error);
        return NextResponse.json({ message: error.message || 'Failed to analyze submission' }, { status: 500 });
    }
}
