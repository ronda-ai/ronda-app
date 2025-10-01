
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IObservationService } from "@/modules/observation/domain/interfaces/observation-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getObservationService = () => resolve<IObservationService>(SERVICE_KEYS.ObservationService);

export async function createObservationHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const newObservation = await getObservationService().createObservation(body);
        return NextResponse.json(newObservation, { status: 201 });
    } catch (error: any) {
        console.error('API Error: Failed to create observation', error);
        return NextResponse.json({ message: error.message || 'Failed to create observation' }, { status: 400 });
    }
}

export async function getObservationsForStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const studentId = params.id as string;
        const observations = await getObservationService().getObservationsForStudent(studentId);
        return NextResponse.json(observations);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function deleteObservationHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
     try {
        const observationId = params.observationId as string;
        await getObservationService().deleteObservation(observationId);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete observation', error);
        return NextResponse.json({ message: error.message || 'Failed to delete observation' }, { status: 500 });
    }
}

export async function analyzeObservationHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const result = await getObservationService().analyzeObservation(
            body.observationText, 
            body.studentName, 
            body.language,
            body.ageOrGrade,
            body.subject,
            body.country
        );
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate observation analysis', error);
        return NextResponse.json({ message: error.message || 'Failed to analyze observation' }, { status: 500 });
    }
}
