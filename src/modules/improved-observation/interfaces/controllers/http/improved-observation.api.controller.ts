
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { NextRequest, NextResponse } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IImprovedObservationService } from "@/modules/improved-observation/domain/interfaces/improved-observation-service.interface";

const getImprovedObservationService = () => resolve<IImprovedObservationService>(SERVICE_KEYS.ImprovedObservationService);

export async function improveObservationHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await getImprovedObservationService().getImprovedObservation(
            body.observationText, 
            body.studentName, 
            body.language,
            body.ageOrGrade,
            body.subject,
            body.country,
        );
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate improved observation', error);
        return NextResponse.json({ message: error.message || 'Failed to improve observation' }, { status: 500 });
    }
}
