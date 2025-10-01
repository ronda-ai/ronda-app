
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ILanguageSupportService } from "@/modules/language-support/domain/interfaces/language-support-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getLanguageSupportService = () => resolve<ILanguageSupportService>(SERVICE_KEYS.LanguageSupportService);

export async function generateSupportHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const newSupport = await getLanguageSupportService().generateAndCreateSupport(body);
        return NextResponse.json(newSupport, { status: 201 });
    } catch (error: any) {
        console.error('API Error: Failed to generate language support', error);
        return NextResponse.json({ message: error.message || 'Failed to generate support' }, { status: 500 });
    }
}

export async function getSupportsForStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const studentId = params.id as string;
        const supports = await getLanguageSupportService().getSupportsForStudent(studentId);
        return NextResponse.json(supports);
    } catch (error: any) {
        console.error('API Error: Failed to get language supports', error);
        return NextResponse.json({ message: error.message || 'Failed to get supports' }, { status: 500 });
    }
}

export async function updateSupportHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const supportId = params.id as string;
        const body = await request.json();
        const updatedSupport = await getLanguageSupportService().addFeedback(supportId, body.feedback);
        if (!updatedSupport) {
            return NextResponse.json({ message: 'Support not found' }, { status: 404 });
        }
        return NextResponse.json(updatedSupport);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function deleteSupportHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const supportId = params.id as string;
        await getLanguageSupportService().deleteSupport(supportId);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
