
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IPblService } from "@/modules/pbl/domain/interfaces/pbl-service.interface";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

const getPblService = () => resolve<IPblService>(SERVICE_KEYS.PblService);

async function generateProjectHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const project = await getPblService().generateAndCreateProject(body);
        return NextResponse.json(project, { status: 201 });
    } catch (error: any) {
        console.error('API Error: Failed to generate PBL project', error);
        return NextResponse.json({ message: error.message || 'Failed to generate project' }, { status: 500 });
    }
}

export const POST = withAuthorization(generateProjectHandler, isTeacher);
    