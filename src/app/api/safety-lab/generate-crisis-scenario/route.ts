
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IEducationalSafetyService } from "@/modules/educational-safety/domain/interfaces/educational-safety-service.interface";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

const getEducationalSafetyService = () => resolve<IEducationalSafetyService>(SERVICE_KEYS.EducationalSafetyService);

export const POST = withAuthorization(async (request: NextRequest) => {
    try {
        const body = await request.json();
        const result = await getEducationalSafetyService().generateCrisisScenario(body);
        
        // Save the initial state of a new simulation
        if (!body.history || body.history.length === 0) {
            await getEducationalSafetyService().generateAndSaveCrisisScenario(body);
        }
        
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate crisis scenario', error);
        return NextResponse.json({ message: error.message || 'Failed to generate scenario' }, { status: 500 });
    }
}, isTeacher);

