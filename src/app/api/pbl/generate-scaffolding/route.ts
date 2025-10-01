
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IPblService } from "@/modules/pbl/domain/interfaces/pbl-service.interface";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

const getPblService = () => resolve<IPblService>(SERVICE_KEYS.PblService);

async function generateScaffoldingHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const suggestion = await getPblService().generateScaffolding(body);
        return NextResponse.json(suggestion);
    } catch (error: any) {
        console.error('API Error: Failed to generate PBL scaffolding', error);
        return NextResponse.json({ message: error.message || 'Failed to generate scaffolding' }, { status: 500 });
    }
}

export const POST = withAuthorization(generateScaffoldingHandler, isTeacher);
