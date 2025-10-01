
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IConcernAnalysisService } from "@/modules/concern-analysis/domain/interfaces/concern-analysis-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IObservationService } from "@/modules/observation/domain/interfaces/observation-service.interface";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";

const getConcernAnalysisService = () => resolve<IConcernAnalysisService>(SERVICE_KEYS.ConcernAnalysisService);
const getAiConfigService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);

const observationLimits = {
    low: 5,
    medium: 10,
    high: 15
};

export async function createConcernAnalysisHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const config = await getAiConfigService().getConfiguration();
        const limit = observationLimits[config?.analysisLevel || 'medium'];

        const filteredObservations = (body.observations as ObservationDTO[]).slice(0, limit);
        
        const student = body.student as StudentDTO;
        if (student.challengeHistory) {
            student.challengeHistory = student.challengeHistory.slice(0, limit);
        }

        const savedAnalysis = await getConcernAnalysisService().generateAndCreateAnalysis({
            ...body,
            student: student,
            observations: filteredObservations
        });
        return NextResponse.json(savedAnalysis);
    } catch (error: any) {
        console.error('API Error: Failed to generate concern analysis', error);
        return NextResponse.json({ message: error.message || 'Failed to generate concern analysis' }, { status: 500 });
    }
}

export async function getConcernAnalysesForStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const studentId = params.studentId as string;
        const analyses = await getConcernAnalysisService().getConcernAnalysesForStudent(studentId);
        return NextResponse.json(analyses);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
