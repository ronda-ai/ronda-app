
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IPblService } from "@/modules/pbl/domain/interfaces/pbl-service.interface";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

const getPblService = () => resolve<IPblService>(SERVICE_KEYS.PblService);

async function getProjectsHandler(request: NextRequest) {
    try {
        const projects = await getPblService().getAllProjects();
        return NextResponse.json(projects);
    } catch (error: any) {
        console.error('API Error: Failed to get PBL projects', error);
        return NextResponse.json({ message: error.message || 'Failed to get projects' }, { status: 500 });
    }
}

export const GET = withAuthorization(getProjectsHandler, isTeacher);
    