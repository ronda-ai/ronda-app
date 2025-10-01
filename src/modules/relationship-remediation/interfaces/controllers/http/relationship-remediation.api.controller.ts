
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IRelationshipRemediationService } from "@/modules/relationship-remediation/domain/interfaces/relationship-remediation-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getRelationshipRemediationService = () => resolve<IRelationshipRemediationService>(SERVICE_KEYS.RelationshipRemediationService);

export async function createRemediationHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const savedRemediation = await getRelationshipRemediationService().generateAndCreateRemediation(body);
        return NextResponse.json(savedRemediation);
    } catch (error: any) {
        console.error('API Error: Failed to generate relationship remediation', error);
        return NextResponse.json({ message: error.message || 'Failed to generate remediation' }, { status: 500 });
    }
}

export async function getRemediationsHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const { searchParams } = new URL(request.url);
        const studentIdsParam = searchParams.get('studentIds');
        if (!studentIdsParam) {
            return NextResponse.json({ message: 'studentIds parameter is required' }, { status: 400 });
        }
        const studentIds = studentIdsParam.split(',');
        if (studentIds.length < 2) return NextResponse.json([]);
        
        const remediations = await getRelationshipRemediationService().getRemediationsByStudentIds(studentIds);
        return NextResponse.json(remediations);
    } catch (error: any) {
        console.error('API Error: Failed to get relationship remediations', error);
        return NextResponse.json({ message: error.message || 'Failed to get remediations' }, { status: 500 });
    }
}

export async function updateRemediationHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const body = await request.json();
        const updatedRemediation = await getRelationshipRemediationService().updateRemediation(params.id as string, body);
        if (!updatedRemediation) {
            return NextResponse.json({ message: "Remediation not found" }, { status: 404 });
        }
        return NextResponse.json(updatedRemediation);
    } catch (error: any) {
        console.error('API Error: Failed to update remediation', error);
        return NextResponse.json({ message: error.message || 'Failed to update remediation' }, { status: 500 });
    }
}

export async function deleteRemediationHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        await getRelationshipRemediationService().deleteRemediation(id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete remediation', error);
        return NextResponse.json({ message: error.message || 'Failed to delete remediation' }, { status: 500 });
    }
}

export async function updateStepHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        const stepIndex = params.stepIndex as string;
        const details = await request.json();
        const updatedPlan = await getRelationshipRemediationService().updateStepDetails(id, parseInt(stepIndex, 10), details);
        if (!updatedPlan) {
            return NextResponse.json({ message: "Remediation plan or step not found" }, { status: 404 });
        }
        return NextResponse.json(updatedPlan);
    } catch (error: any) {
        console.error('API Error: Failed to update remediation step', error);
        return NextResponse.json({ message: error.message || 'Failed to update step' }, { status: 500 });
    }
}
